import Button from "@/components/ui/Button";
import React, { Suspense } from "react";
import { FaPlus } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import MeetingsLoading from "./MeetingsLoading";

const MeetingsContainer = React.lazy(() =>
  import("./MeetingsContainer").then((module) => ({
    default: module.default,
  }))
);

type MeetingsLayoutProps = {
  tcc: number;
};

export default function MeetingsLayout({ tcc }: MeetingsLayoutProps) {
  return (
    <div className="bg-neutral w-full rounded-xl p-6 shadow-md flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IoPeopleSharp className="size-10" />
          <div>
            <h1 className="text-3xl font-bold">Reuniões</h1>
            <p className="text-sm text-gray-500">
              Gerencie suas reuniões agendadas para o seu TCC.
            </p>
          </div>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <FaPlus className="size-4" />
          Agendar reunião
        </Button>
      </div>

      <Suspense fallback={<MeetingsLoading />}>
        <MeetingsContainer tcc={tcc} />
      </Suspense>
    </div>
  );
}
