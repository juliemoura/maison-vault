import LeftContent from "@/components/register/leftContent";
import RightContent from "@/components/register/rightContent";

function Register() {
  return (
    <div className="min-h-screen xl:grid p-5 flex grid-cols-2 justify-items-center items-center">
      <LeftContent />
      <RightContent />
    </div>
  );
}

export default Register;
