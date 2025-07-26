import MeetingsLayout from "@/features/meetings/MeetingsLayout";
import useTitle from "@/hooks/useTitle";

export default function MeetingsPage() {
  useTitle("Reuniões | FocoTCC");

  return (
    <div className="flex flex-col gap-6 w-full max-w-8xl">
      <MeetingsLayout />
    </div>
  );
}
