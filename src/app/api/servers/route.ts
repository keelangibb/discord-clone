import { auth } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";
import { requestInputSchema } from "~/app/api/servers/schema";
import { currentProfile } from "~/modules/profile/db";
import { createDiscordServer } from "~/modules/servers/db";

export async function POST(req: NextRequest) {
  try {
    const reqInput = requestInputSchema.parse(await req.json());
    const { name, imageUrl } = reqInput;

    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const profile = await currentProfile(userId);
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const discordServer = await createDiscordServer(profile.id, name, imageUrl);

    return NextResponse.json(discordServer);
  } catch (error) {
    console.error("[SERVER_POST]", error);
    return new NextResponse("Oops I messed up", { status: 500 });
  }
}
