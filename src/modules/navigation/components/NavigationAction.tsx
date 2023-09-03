"use client";

import { Plus } from "lucide-react";
import { useModal } from "~/modules/modals/hooks";
import { ActionTooltip } from "~/modules/navigation/components";

export default function NavigationAction() {
  const { onOpen } = useModal();

  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <button
        className="group flex items-center"
        onClick={() => onOpen("createServer")}
      >
        <div className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
          <Plus
            className="text-emerald-500 transition group-hover:text-white"
            size={500}
          />
        </div>
      </button>
    </ActionTooltip>
  );
}
