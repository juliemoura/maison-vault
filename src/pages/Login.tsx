import LeftContent from "@/components/login/leftContent";
import RightContent from "@/components/login/rightContent";

function Login() {
  return (
    <div className="min-h-screen xl:grid p-5 flex grid-cols-2 justify-items-center items-center">
      <LeftContent />
      <RightContent />
    </div>
  );
}

export default Login;
