import DashboardLoading from "@/features/Dashboard/DashboardLoading";
import useTitle from "@/hooks/useTitle";
import React, { Suspense } from "react";

const Dashboard = React.lazy(() => import("@/features/Dashboard/MainDashboard"));

/**
 * Página do Dashboard do Aluno
 * @returns Componente de página do Dashboard
 */

export default function DashboardPage() {
  useTitle("Dashboard | Foco TCC");

  return (
    <Suspense fallback={<DashboardLoading />}>
      <Dashboard />
    </Suspense>
  );
}
