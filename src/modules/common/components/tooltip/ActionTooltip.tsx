import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/modules/common/components/ui/tooltip";

type ActionTooltipProps = {
  label: string;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
};
export default function ActionTooltip({
  label,
  children,
  side,
  align,
}: ActionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
