import { redirect } from "next/navigation";
import InitialModal from "~/app/setup/components/InitialModal";
import { initialProfile } from "~/app/setup/helpers/initialProfile";
import { LINKS } from "~/modules/common/constants";
import { findDiscordServer } from "~/modules/common/db/server";

export default async function SetupPage() {
  const profile = await initialProfile();
  const discordServer = await findDiscordServer(profile.id);

  if (discordServer) return redirect(LINKS.servers.find(discordServer.id));

  return <InitialModal />;
}
