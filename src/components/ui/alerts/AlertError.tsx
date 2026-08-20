import { cn } from "@/utils/cn";

type Props = {
  error: string | null;
  className?: string;
};

export default function AlertError({ 
  error,
  className,
}: Props) {
  if (!error) return null;

  return (
    <div className={cn(`
      w-[500px]
      bg-red-500/70 
      border border-red-500/70
      mx-auto mt-10 p-2 
      rounded`,
      className
    )}>
      <p className="text-sm text-white text-center">
        {error}
      </p>
    </div>
  );
}
