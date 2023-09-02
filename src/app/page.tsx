import { redirect } from "next/navigation";
import { LINKS } from "~/modules/common/constants";
import { initialProfile } from "~/modules/profile/services";
import { findDiscordServer } from "~/modules/servers/db";
import InitialModal from "~/modules/setup/components/InitialModal";

export default async function SetupPage() {
  const profile = await initialProfile();
  const discordServer = await findDiscordServer(profile.id);

  if (discordServer) return redirect(LINKS.servers.find(discordServer.id));

  return <InitialModal />;
}
