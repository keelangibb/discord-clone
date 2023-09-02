import { type User } from "@clerk/nextjs/dist/types/server";
import { prisma } from "~/modules/common/db";

export async function currentProfile(userId: string) {
  return await prisma.profile.findUnique({
    where: {
      userId,
    },
  });
}

export async function createProfile(user: User, emailAddress: string) {
  return await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: emailAddress,
    },
  });
}
