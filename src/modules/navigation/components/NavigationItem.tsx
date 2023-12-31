"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LINKS } from "~/modules/common/constants";
import { cn } from "~/modules/common/utils/utils";
import ActionTooltip from "~/modules/navigation/components/ActionTooltip";

type NavigationItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};
export default function NavigationItem(props: NavigationItemProps) {
  const { id, imageUrl, name } = props;

  const params = useParams();

  const isSameServerId = params?.serverId === id;

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <Link
        href={LINKS.servers.find(id)}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 w-1 rounded-r-full bg-primary transition-all",
            !isSameServerId && "h-2 group-hover:h-5",
            isSameServerId && "h-9",
          )}
        />
        <div
          className={cn(
            "group relative mx-3 flex h-12 w-12 overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]",
            isSameServerId && "rounded-[16px] bg-primary/10 text-primary",
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </Link>
    </ActionTooltip>
  );
}
