import { LuLoaderCircle } from "react-icons/lu";

export default function ProtectedTccLoading() {
  return (
    <div className="bg-secondary flex items-center justify-center h-screen w-screen gap-2">
      <LuLoaderCircle className="size-8 text-primary" />
      <span className="ml-4 text-lg text-gray-600 font-medium">
        Carregando dados do TCC...
      </span>
    </div>
  );
}
