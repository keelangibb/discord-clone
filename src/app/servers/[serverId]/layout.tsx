import { type PropsWithChildren } from "react";
import { ProfileService as Profile } from "~/modules/profile/services";
import { ServersService } from "~/modules/servers/services";

export default async function ServerIdLayout(props: PropsWithChildren) {
  const { children } = props;
  const profile = await Profile.getProfile();
  const server = await ServersService.getServer(profile.id);

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        Server Sidebar
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
