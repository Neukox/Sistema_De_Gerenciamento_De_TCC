import MainDashboard from "@/features/Dashboard/MainDashboard";
import useTitle from "@/hooks/useTitle";

export default function DashboardPage() {
  useTitle("Dashboard | Foco TCC");

  return (
    <div className="flex justify-center">
      <MainDashboard />
    </div>
  );
}
