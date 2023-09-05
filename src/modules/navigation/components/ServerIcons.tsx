import NavigationItem from "~/modules/navigation/components/NavigationItem";
import { ProfileService } from "~/modules/profile/services";
import { ServerService } from "~/modules/servers/services";

export default async function ServerIcons() {
  const profile = await ProfileService.getProfile();
  if (!profile) return <div>No profile</div>;

  const servers = await ServerService.getAllServersByProfileId(profile.id);

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
