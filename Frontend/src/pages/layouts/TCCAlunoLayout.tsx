import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import useToogle from "@/hooks/useToogle";

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
      <SideBar isOpen={sidebarOpen} onClose={close} />
      <main className="overflow-y-auto min-h-0 flex-1">
        <Header title={title} onMenuClick={open} />
        {children}
      </main>
    </div>
  );
}
