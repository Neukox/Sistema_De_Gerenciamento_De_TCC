import { useTCCContext } from "@/hooks/useTCCContext";
import { Navigate, Outlet } from "react-router-dom";
import ProtectedTccLoading from "./ProtectedTccLoading";

export default function ProtectedTccRoute() {
  const { tccData, loading } = useTCCContext();

  if (loading) return <ProtectedTccLoading />;

  if (!tccData) return <Navigate to="/boas-vindas" replace />;

  return <Outlet />;
}
