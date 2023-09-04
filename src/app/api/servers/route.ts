import { NextResponse, type NextRequest } from "next/server";
import { requestInputSchema } from "~/app/api/servers/schema";
import { ProfileService } from "~/modules/profile/services";
import { ServersService } from "~/modules/servers/services";

export default async function POST(req: NextRequest) {
  const { name, imageUrl } = requestInputSchema.parse(await req.json());

  const profile = await ProfileService.getProfile();

  const discordServer = await ServersService.createServer(
    profile.id,
    name,
    imageUrl,
  );

  return NextResponse.json(discordServer);
}
