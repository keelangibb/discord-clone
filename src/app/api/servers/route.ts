import { redirectToSignIn } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { requestInputSchema } from "~/app/api/servers/schema";
import { ProfileService } from "~/modules/profile/services";
import { ServerService } from "~/modules/servers/services";

export default async function POST(req: NextRequest) {
  const { name, imageUrl } = requestInputSchema.parse(await req.json());

  const profile = await ProfileService.getProfile();
  if (!profile) return redirectToSignIn() as never;

  const discordServer = await ServerService.createServer(
    profile.id,
    name,
    imageUrl,
  );

  return NextResponse.json(discordServer);
}
