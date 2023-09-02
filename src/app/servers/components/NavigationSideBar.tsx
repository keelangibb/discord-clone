import NavigationAction from "~/app/servers/components/NavigationAction";
import ServersList from "~/app/servers/components/ServersList";
import { ScrollArea } from "~/modules/common/components/ui/scroll-area";
import { Separator } from "~/modules/common/components/ui/separator";

export default function NavigationSideBar() {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        <ServersList />
      </ScrollArea>
    </div>
  );
}
