import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { prisma } from "./db";

export async function initialProfile() {
  const user = await currentUser();

  if (!user) return redirectToSignIn() as never;

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  const emailAddress = user.emailAddresses[0]?.emailAddress;
  if (!emailAddress) throw new Error("No email address found");

  const newProfile = await prisma.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: emailAddress,
    },
  });

  return newProfile;
}
