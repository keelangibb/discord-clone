import { type PropsWithChildren } from "react";
import NavigationSideBar from "~/modules/navigation/components/NavigationSideBar";

export default function ServerLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavigationSideBar />
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
}
