import { useTCCContext } from "@/hooks/useTCCContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedTccRoute() {
  const { tccData, loading } = useTCCContext();

  if (loading) return null;

  if (!tccData) return <Navigate to="/boas-vindas" replace />;

  return <Outlet />;
}
