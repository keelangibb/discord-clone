import { type User } from "@clerk/nextjs/dist/types/server";
import { prisma } from "~/modules/common/db";

export class ProfileDB {
  static async getProfile(userId: string) {
    return prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

  static async createProfile(user: User) {
    return prisma.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]!.emailAddress, // null assertion
      },
    });
  }
}
