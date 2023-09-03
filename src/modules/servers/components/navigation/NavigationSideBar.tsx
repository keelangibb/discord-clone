import { UserButton } from "@clerk/nextjs";
import { ScrollArea } from "~/modules/common/components/ui/scroll-area";
import { Separator } from "~/modules/common/components/ui/separator";
import { DarkModeToggle } from "~/modules/servers/components/DarkModeToggle";
import NavigationAction from "~/modules/servers/components/navigation/NavigationAction";
import ServersList from "~/modules/servers/components/ServersList";

export default function NavigationSideBar() {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        <ServersList />
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <DarkModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-12 w-12",
            },
          }}
        />
      </div>
    </div>
  );
}
