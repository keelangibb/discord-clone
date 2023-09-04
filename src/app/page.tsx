import { redirect } from "next/navigation";
import { LINKS } from "~/modules/common/constants";
import InitialModal from "~/modules/modals/components/InitialModal";
import { ProfileService } from "~/modules/profile/services";
import { ServersService } from "~/modules/servers/services";

export default async function SetupPage() {
  const initialProfile = await ProfileService.getInitialProfile();
  const discordServer = await ServersService.getServer(initialProfile.id);

  if (discordServer) return redirect(LINKS.servers.find(discordServer.id));

  return <InitialModal />;
}
