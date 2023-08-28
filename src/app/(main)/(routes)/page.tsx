import { UserButton } from "@clerk/nextjs";

const state = true;

export default function Home() {
  return <UserButton afterSignOutUrl="/"></UserButton>;
}
