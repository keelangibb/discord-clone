import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LINKS } from "~/modules/common/constants";
import { currentProfile } from "~/modules/profile/db";
import NavigationItem from "~/modules/servers/components/NavigationItem";
import { findDiscordServers } from "~/modules/servers/db";

export default async function ServersList() {
  const userProfile = auth();
  if (!userProfile.userId) return null;

  const profile = await currentProfile(userProfile.userId);
  if (!profile) return redirect(LINKS.home);

  const servers = await findDiscordServers(profile.id);

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
