import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NavigationAction from "~/app/servers/components/NavigationAction";
import { ScrollArea } from "~/modules/common/components/ui/scroll-area";
import { Separator } from "~/modules/common/components/ui/separator";
import { LINKS } from "~/modules/common/constants";
import { currentProfile } from "~/modules/common/db/profile";
import { findDiscordServers } from "~/modules/common/db/server";

export default async function NavigationSideBar() {
  const userProfile = auth();
  if (!userProfile.userId) return null;

  const profile = await currentProfile(userProfile.userId);
  if (!profile) return redirect(LINKS.home);

  const servers = findDiscordServers(profile.id);

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1"></ScrollArea>
    </div>
  );
}
