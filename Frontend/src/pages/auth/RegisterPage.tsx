import { useEffect } from "react";
import AuthContainer from "@/features/auth/container/AuthContainer";
import RegisterContainer from "@/features/auth/container/RegisterContainer";
import Register from "@/features/auth/register/Register";

export default function RegisterPage() {
  useEffect(() => {
    document.title = "FocoTCC - Registro";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-6">
      <AuthContainer className="max-w-lg">
        <RegisterContainer>
          <Register />
        </RegisterContainer>
      </AuthContainer>
    </div>
  );
}
