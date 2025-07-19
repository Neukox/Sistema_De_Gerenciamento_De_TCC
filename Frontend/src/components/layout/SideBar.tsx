import { cn } from "@/utils/cn";
import Button from "../ui/Button";
import { CgClose } from "react-icons/cg";
import Logo from "../common/Logo";

type SideBarProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
};

export default function SideBar({ children, isOpen, onClose }: SideBarProps) {
  return (
    <>
      <div
        role="navigation"
        className={cn({
          block: isOpen,
          "hidden lg:block": !isOpen,
          "fixed inset-0 z-40 bg-black/50 lg:static lg:bg-transparent lg:w-fit":
            isOpen,
        })}
        onClick={onClose}
      />
      <aside
        className={cn(
          "bg-neutral text-black min-w-60 h-dvh border-r border-secondary fixed z-50 lg:static transition-transform duration-300",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
            "lg:translate-x-0 lg:block": true,
          }
        )}
      >
        <div className="flex justify-between gap-4 border-b border-secondary px-4 py-1 relative pt-3 lg:py-0">
          <Logo withName />
          <Button
            onClick={onClose}
            variant="transparent"
            className="absolute right-0 top-0 lg:hidden rounded-full p-2"
          >
            <CgClose className="size-8" />
          </Button>
        </div>
        <nav className="mt-6">{children}</nav>
      </aside>
    </>
  );
}
