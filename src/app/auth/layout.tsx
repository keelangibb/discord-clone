import { type PropsWithChildren } from "react";

export default function AuthLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
}
