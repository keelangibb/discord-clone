import { ChannelType } from "@prisma/client";
import { ProfileService } from "~/modules/profile/services";
import ServerHeader from "~/modules/servers/components/ServerHeader";
import { ServerService } from "~/modules/servers/services";

type ServerSideBarProps = {
  serverId: string;
};
export default async function ServerSidebar(props: ServerSideBarProps) {
  const { serverId } = props;

  const profile = await ProfileService.getProfile();
  if (!profile) return <div>No profile</div>;

  const server = await ServerService.getServerChannelsByServerId(serverId);
  if (!server) return <div>No servers</div>;

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT,
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.Video,
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.Audio,
  );

  const members = server.members.filter(
    (member) => member.profileId !== profile.id,
  );

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role;

  return (
    <div className="flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#2B2D31]">
      <ServerHeader server={server} role={role} />
    </div>
  );
}
