import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/services/api";

export type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
};

type UserState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// Buscar usuário
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data as User;
  }
);

// Criar usuário
export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: Omit<User, "id">, { rejectWithValue }) => {
    try {
      const existingUser = await api.get(`/users?email=${user.email}`);

      if (existingUser.data.length > 0) {
        return rejectWithValue("Usuário já existente na plataforma");
      }

      // Busca todos os usuários para calcular o próximo id numérico
      const allUsers = await api.get("/users");
      const lastId = allUsers.data.length > 0
        ? Math.max(...allUsers.data.map((u: User) => Number(u.id)))
        : 0;

      const response = await api.post("/users", {
        ...user,
        id: lastId + 1, // envia id como number, json-server respeita
      });

      return {
        ...response.data,
        id: Number(response.data.id),
      } as User;
    } catch {
      return rejectWithValue("Erro ao criar usuário");
    }
  }
);

// Atualizar usuário
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/users/${user.id}`,
        user
      );

      return response.data as User;
    } catch {
      return rejectWithValue(
        "Erro ao atualizar usuário"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH USER
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Erro ao buscar usuário";
      })

      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = "failed";
        state.error = "Erro ao atualizar usuário";
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;