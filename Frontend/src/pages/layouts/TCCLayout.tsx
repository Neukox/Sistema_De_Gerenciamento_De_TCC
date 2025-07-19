import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import useToogle from "@/hooks/useToogle";
import NavbarLink from "@/components/ui/NavbarLink";
import { GraduationCap, LucideLayoutDashboard, Notebook } from "lucide-react";
import { FaTasks } from "react-icons/fa";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { useLocation, Outlet } from "react-router-dom";
import { pagesTitles } from "@/lib/pages";

type AlunoPage = keyof typeof pagesTitles.aluno;

export default function TCCLayout() {
  const { isOpen: sidebarOpen, close, open } = useToogle(false);

  const location = useLocation();
  const page = (location.pathname.split("/").pop() as AlunoPage) || "dashboard";

  return (
    <div className="flex h-screen">
      <SideBar isOpen={sidebarOpen} onClose={close}>
        <nav className="flex flex-col justify-between gap-4 flex-1">
          <NavbarLink to="/dashboard">
            <LucideLayoutDashboard className="size-6" />
            Dashboard
          </NavbarLink>
          <NavbarLink to="/">
            <FaTasks className="size-6" />
            Tarefas
          </NavbarLink>
          <NavbarLink to="/">
            <Notebook className="size-6" />
            Anotações
          </NavbarLink>
          <NavbarLink to="/">
            <IoCalendarClearOutline className="size-6" />
            Agendamentos
          </NavbarLink>
          <NavbarLink to="/historico">
            <LuHistory className="size-6" />
            Histórico
          </NavbarLink>
          <NavbarLink to="/">
            <GraduationCap className="size-6" />
            Meu TCC
          </NavbarLink>
        </nav>
      </SideBar>
      <main className="overflow-y-auto min-h-screen flex-1">
        <Header title={pagesTitles.aluno[page]} onMenuClick={open} />
        <Outlet />
      </main>
    </div>
  );
}
