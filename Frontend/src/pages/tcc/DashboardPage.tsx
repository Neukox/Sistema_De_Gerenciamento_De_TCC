import useTitle from "@/hooks/useTitle";
import Dashboard from "@/features/Dashboard/MainDashboard";

/**
 * Página do Dashboard do Aluno
 * @returns Componente de página do Dashboard
 */

export default function DashboardPage() {
  useTitle("Dashboard | Foco TCC");

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-8xl">
      <Dashboard />
    </div>
  );
}
