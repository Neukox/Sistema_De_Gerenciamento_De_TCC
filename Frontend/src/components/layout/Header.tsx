import { Menu } from "lucide-react";
import Button from "../ui/Button";
import Logo from "../common/Logo";

type HeaderProps = {
  title?: string;
  onMenuClick?: () => void;
};

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-neutral text-black px-4 py-2 lg:py-4 sticky top-0">
      <div className="flex items-center gap-4">
        <Button
          variant="transparent"
          className="p-0 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-8 text-black" />
        </Button>
        <Logo className="lg:hidden" />
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
    </header>
  );
}
