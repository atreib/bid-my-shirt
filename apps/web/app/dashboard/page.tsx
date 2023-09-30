import { UserButton } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      Protected -
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
