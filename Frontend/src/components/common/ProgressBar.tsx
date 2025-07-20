import { cn } from "@/utils/cn";

type ProgressBarProps = {
  title: string;
  progress: number;
  className?: string | string[] | undefined;
  children?: React.ReactNode;
};

export default function ProgressBar({
  title,
  progress,
  className,
  children,
}: ProgressBarProps) {
  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      <div className="flex justify-between mb-1">
        <span className="text-md font-bold">{title}</span>
        <span className="text-sm font-medium text-gray-700">
          {progressPercentage}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={cn(
            "h-4 rounded-full transition-all duration-300 ease-in-out",
            {
              "bg-green-500": progressPercentage >= 75,
              "bg-yellow-500":
                progressPercentage >= 50 && progressPercentage < 75,
              "bg-red-500": progressPercentage < 50,
            }
          )}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {children}
    </div>
  );
}
