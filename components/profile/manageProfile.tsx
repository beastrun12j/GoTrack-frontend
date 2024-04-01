'use client'

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export default function manageProfile() {
  const { openUserProfile } = useClerk();
  return (
    <Button
      onClick={() => openUserProfile()}
      className="my-5 px-10 bg-gray-200 hover:bg-gray-300 rounded-sm text-black text-xs"
    >
      Manage Profile
    </Button>
  );
}
