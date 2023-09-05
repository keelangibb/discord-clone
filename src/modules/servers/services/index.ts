import { MemberRole } from "@prisma/client";
import { prisma } from "~/modules/common/db";

export class ServerService {
  static async getServerByProfileId(profileId: string) {
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

  static async getServerByServerId(serverId: string) {
    return await prisma.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            serverId,
          },
        },
      },
    });
  }

  static async getAllServersByProfileId(profileId: string) {
    return await prisma.server.findMany({
      where: {
        members: {
          some: {
            profileId,
          },
        },
      },
    });
  }

  static async getServerChannelsByServerId(serverId: string) {
    return await prisma.server.findUnique({
      where: {
        id: serverId,
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
  }

  static async createServer(
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
}
