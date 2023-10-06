import { cn } from "@/lib/utils";

export function Logo(props: { className?: string }) {
  return (
    <div>
      <h1 className={cn("text-xl text-white", props.className)}>BMS</h1>
    </div>
  );
}
