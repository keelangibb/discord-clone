import { MemberRole } from "@prisma/client";
import { prisma } from "~/modules/common/db";

export async function findDiscordServer(profileId: string) {
  return await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId,
        },
      },
    },
  });
}

export async function findDiscordServers(profileId: string) {
  return await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: profileId,
        },
      },
    },
  });
}

export async function createDiscordServer(
  profileId: string,
  serverName: string,
  imageUrl: string,
) {
  return await prisma.server.create({
    data: {
      profileId,
      name: serverName,
      imageUrl,
      inviteCode: crypto.randomUUID(),
      channels: {
        create: [{ name: "general", profileId }],
      },
      members: {
        create: [{ profileId, role: MemberRole.ADMIN }],
      },
    },
  });
}
