import { redirect } from "next/navigation";
import { LINKS } from "~/modules/common/constants";
import InitialModal from "~/modules/modals/components/InitialModal";
import { initialProfile } from "~/modules/profile/services";
import { findDiscordServer } from "~/modules/servers/db";

export default async function SetupPage() {
  const profile = await initialProfile();
  const discordServer = await findDiscordServer(profile.id);

  if (discordServer) return redirect(LINKS.servers.find(discordServer.id));

  return <InitialModal />;
}
