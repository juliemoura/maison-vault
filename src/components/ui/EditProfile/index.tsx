import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { Button } from "../Button";
import { KeyRound, Mail, Pencil } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Toast } from "../Toast";
import { Input } from "../Input";
import { clearUser, fetchUser, updateUser } from "@/store/userSlice";
import {
  registerSchema,
  type RegisterSchema,
} from "@/components/register/rightContent/schema";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const { status } = useSelector((state: RootState) => state.userSlice);

  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isSubmitting = status === "loading";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    console.log("handleOpenChange chamado:", nextOpen);

    setOpen(nextOpen);

    console.log("authUser:", authUser); // <- é null ou undefined?
    console.log("authUser.id:", authUser?.id); // <- vem o id?

    if (!nextOpen) return;

    // Limpa dados anteriores para não exibir valores obsoletos enquanto carrega
    dispatch(clearUser());

    if (!authUser?.id) return;

    // Reset só acontece após a API responder, eliminando a race condition
    dispatch(fetchUser(String(authUser.id)))
      .unwrap()
      .then((fetchedUser) => {
        console.log("fetchedUser:", fetchedUser);
        reset({
          name: fetchedUser.name,
          surname: fetchedUser.surname,
          email: fetchedUser.email,
          password: fetchedUser.password,
        });
      })
      .catch(() => setToast("Erro ao carregar dados do perfil"));
  };

  const onSubmit = async (data: RegisterSchema) => {
    if (!authUser?.id) {
      setToast("Usuário não encontrado");
      return;
    }

    try {
      await dispatch(updateUser({ id: String(authUser.id), ...data })).unwrap();
      setToast("Perfil atualizado com sucesso!");
      setOpen(false);
    } catch {
      setToast("Erro ao atualizar perfil");
    }
  };

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* onOpenChange substituiu os useEffects — toda lógica de abertura fica aqui */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button
            className="bg-transparent text-primary hover:text-amber-100"
            onClick={(e) => e.stopPropagation()} // evita fechar o Popover
          >
            <Pencil />
            Editar Perfil
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Preencha os campos para editar seu perfil.
          </DialogDescription>

          {/* Feedback visual enquanto a API ainda não respondeu */}
          {isSubmitting && (
            <p className="text-sm text-muted-foreground">Carregando dados...</p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <div className="flex gap-4">
              <Input
                label="Nome"
                placeholder="Seu nome"
                {...register("name")}
                error={errors.name?.message}
              />
              <Input
                label="Sobrenome"
                placeholder="Seu sobrenome"
                {...register("surname")}
                error={errors.surname?.message}
              />
            </div>

            <Input
              label="E-mail"
              icon={<Mail size={18} />}
              placeholder="seu@email.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Senha"
              icon={<KeyRound size={18} />}
              placeholder="Sua senha"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white py-3 rounded-md font-semibold mt-4 transition-all shadow-lg hover:scale-[1.02]"
            >
              {isSubmitting ? "Editando conta..." : "Editar conta"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfile;
