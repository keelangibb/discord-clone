import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { ProfileDB } from "~/modules/profile/db";

export class ProfileService {
  private static getAuth() {
    const session = auth();
    return session;
  }

  private static async getCurrentUser() {
    const user = await currentUser();
    if (!user) return redirectToSignIn() as never;

    return user;
  }

  static async getProfile() {
    const session = this.getAuth();
    if (!session.userId) return redirectToSignIn() as never;

    const profile = await ProfileDB.getProfile(session.userId);
    if (!profile) return redirectToSignIn() as never;

    return profile;
  }

  static async getInitialProfile() {
    const user = await this.getCurrentUser();

    const userProfile = await ProfileDB.getProfile(user.id);
    if (userProfile) return userProfile;

    const newProfile = await ProfileDB.createProfile(user);

    return newProfile;
  }
}
