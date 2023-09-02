import { MemberRole } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { requestInputSchema } from "~/app/api/servers/schema";
import { currentProfile } from "~/app/setup/helpers/currentProfile";
import { prisma } from "~/modules/common/db/db";

export async function POST(req: NextRequest) {
  try {
    const reqInput = requestInputSchema.parse(await req.json());
    const { name, imageUrl } = reqInput;

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await prisma.server.create({
      data: {
        profileId: profile.id,
        name: name,
        imageUrl: imageUrl,
        inviteCode: crypto.randomUUID(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_POST]", error);
    return new NextResponse("Oops I messed up", { status: 500 });
  }
}
