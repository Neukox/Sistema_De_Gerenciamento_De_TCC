import MainDashboard from "@/features/Dashboard/MainDashboard";
import useTitle from "@/hooks/useTitle";

export default function DashboardPage() {
  useTitle("Dashboard | Foco TCC");

  return (
    <div className="bg-secondary min-h-screen p-4 md:p-6 lg:p-8 flex justify-center">
      <MainDashboard />
    </div>
  );
}
