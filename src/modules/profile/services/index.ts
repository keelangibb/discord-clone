import { auth, currentUser } from "@clerk/nextjs";
import { prisma } from "~/modules/common/db";

export class ProfileService {
  static async getProfile() {
    const { userId } = auth();
    if (!userId) return null;

    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  }

  static async getInitialProfile() {
    const user = await currentUser();
    if (!user) return null;

    const userProfile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (userProfile) return userProfile;

    const newProfile = await prisma.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]!.emailAddress, // null assertion
      },
    });

    return newProfile;
  }
}
