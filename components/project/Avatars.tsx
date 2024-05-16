import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export default function Avatars() {
  return (
    <div className="flex items-center -space-x-2">
      <Avatar className="h-8 w-8 bg-[#4299e1] dark:bg-[#2563eb]">
        <AvatarImage alt="Avatar 1" src="https://github.com/shadcn.png" />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8 bg-[#38a169] dark:bg-[#16a34a]">
        <AvatarImage alt="Avatar 2" src="https://github.com/shadcn.png" />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>
      <Avatar className="h-8 w-8 bg-[#805ad5] dark:bg-[#6b46c1]">
        <AvatarImage alt="Avatar 3" src="https://github.com/shadcn.png" />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
    </div>
  );
}
