'use client'

import profileImage from "@/assets/default-user-profile-image.png";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function ProfileImage() {
  const {isLoaded, user} = useUser();
  if(!isLoaded) return null;

  return (
    <div className="flex justify-center">
      <Image
        className="h-36 w-36 rounded-full border-4 border-white -mt-24 mr-4 bg-gray-200"
        style={{ objectFit: "cover" }}
        src={user?.imageUrl || profileImage}
        alt=""
        width={144}
        height={144}
      />
    </div>
  );
}
