import { useEffect } from "react";
import AuthContainer from "@/features/auth/container/AuthContainer";
import LoginContainer from "@/features/auth/container/LoginContainer";
import Login from "@/features/auth/login/Login";

/**
 * Página de Login.
 */

export default function LoginPage() {
  useEffect(() => {
    document.title = "FocoTCC - Login";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-6">
      <AuthContainer className="max-w-md">
        <LoginContainer>
          <Login />
        </LoginContainer>
      </AuthContainer>
    </div>
  );
}
