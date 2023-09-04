import { ServersDB } from "~/modules/servers/db";

export class ServersService {
  static async getServer(profileId: string) {
    return ServersDB.findDiscordServer(profileId);
  }

  static async getServers(profileId: string) {
    return ServersDB.findDiscordServers(profileId);
  }

  static async createServer(
    profileId: string,
    serverName: string,
    imageUrl: string,
  ) {
    return ServersDB.createDiscordServer(profileId, serverName, imageUrl);
  }
}
