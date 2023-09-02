import { type PropsWithChildren } from "react";
import NavigationSideBar from "~/app/servers/components/NavigationSideBar";

export default function ServerLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSideBar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
}
