import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { createProfile, currentProfile } from "~/modules/profile/db";

export async function initialProfile() {
  const user = await currentUser();
  if (!user) return redirectToSignIn() as never;

  const emailAddress = user.emailAddresses[0]?.emailAddress;
  if (!emailAddress) throw new Error("No email address found");

  const userProfile = await currentProfile(user.id);
  if (userProfile) return userProfile;

  const newProfile = await createProfile(user, emailAddress);
  return newProfile;
}
