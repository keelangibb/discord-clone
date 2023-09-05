import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LINKS } from "~/modules/common/constants";
import InitialModal from "~/modules/modals/components/InitialModal";
import { ProfileService } from "~/modules/profile/services";
import { ServerService } from "~/modules/servers/services";

export default async function SetupPage() {
  const initialProfile = await ProfileService.getInitialProfile();
  if (!initialProfile) return redirectToSignIn() as never;

  const discordServer = await ServerService.getServerByProfileId(
    initialProfile.id,
  );
  if (discordServer) return redirect(LINKS.servers.find(discordServer.id));

  return <InitialModal />;
}
