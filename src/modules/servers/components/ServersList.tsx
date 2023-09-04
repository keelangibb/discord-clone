import NavigationItem from "~/modules/navigation/components/NavigationItem";
import { ProfileService } from "~/modules/profile/services";
import { ServersService } from "~/modules/servers/services";

export default async function ServersList() {
  const profile = await ProfileService.getProfile();
  const servers = await ServersService.getServers(profile.id);

  return (
    <>
      {servers.map((server) => (
        <div key={server.id} className="mb-4">
          <NavigationItem
            id={server.id}
            name={server.name}
            imageUrl={server.imageUrl}
          />
        </div>
      ))}
    </>
  );
}
