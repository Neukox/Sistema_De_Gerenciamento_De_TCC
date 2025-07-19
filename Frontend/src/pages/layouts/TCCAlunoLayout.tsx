import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import useToogle from "@/hooks/useToogle";
import NavbarLink from "@/components/ui/NavbarLink";
import { GraduationCap, LucideLayoutDashboard, Notebook } from "lucide-react";
import { FaTasks } from "react-icons/fa";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";

type TCCAlunoLayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

export default function TCCAlunoLayout({
  children,
  title,
}: TCCAlunoLayoutProps) {
  const { isOpen: sidebarOpen, close, open } = useToogle(false);

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
      <main className="overflow-y-auto min-h-0 flex-1">
        <Header title={title} onMenuClick={open} />
        {children}
      </main>
    </div>
  );
}
