import { MemberRole } from "@prisma/client";
import { prisma } from "~/modules/common/db";

export class ServersDB {
  static async findDiscordServer(profileId: string) {
    return prisma.server.findFirst({
      where: {
        members: {
          some: {
            profileId,
          },
        },
      },
    });
  }

  static async findDiscordServers(profileId: string) {
    return prisma.server.findMany({
      where: {
        members: {
          some: {
            profileId,
          },
        },
      },
    });
  }

  static async createDiscordServer(
    profileId: string,
    serverName: string,
    imageUrl: string,
  ) {
    return prisma.server.create({
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
}
