import { redirect } from "next/navigation";
import InitialModal from "~/app/setup/components/InitialModal";
import { initialProfile } from "~/app/setup/helpers/initialProfile";
import { prisma } from "~/modules/common/db";

export default async function SetupPage() {
  const profile = await initialProfile();

  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return <InitialModal />;
}
