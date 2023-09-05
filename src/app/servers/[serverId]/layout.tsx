import { ProfileService } from "~/modules/profile/services";
import ServerSidebar from "~/modules/servers/components/ServerSidebar";
import { ServerService } from "~/modules/servers/services";

type ServerIdLayoutProps = {
  children: React.ReactNode;
  params: { serverId: string };
};
export default async function ServerIdLayout(props: ServerIdLayoutProps) {
  const { children, params } = props;

  const profile = await ProfileService.getProfile();
  if (!profile) return <div>No profile</div>;

  const server = await ServerService.getServerByServerId(params.serverId);
  if (!server) return <div>No servers</div>;

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        <ServerSidebar serverId={server.id} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
