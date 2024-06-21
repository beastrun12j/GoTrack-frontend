import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Issue } from "@/types/Issue";
import { Badge } from "@/components/ui/badge";
import { FaRegComments } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface KanbanCardProps {
  issue: Issue;
}

export default function KanbanCard({ issue }: KanbanCardProps) {
  const getBadgeStyle = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "High":
        return "bg-gradient-to-r from-orange-400 to-orange-600";
      case "Normal":
        return "bg-gradient-to-r from-blue-400 to-blue-600";
      case "Low":
        return "bg-gradient-to-r from-green-400 to-green-600";
      default:
        return "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col justify-evenly">
          <span>
            <Badge className={`p-1 px-2 rounded-md my-2 ${getBadgeStyle(issue.issuePriority)}`}>
              {issue.issuePriority} Priority
            </Badge>
          </span>
          <h3 className="my-1 text-sm mx-1">{issue.issueName}</h3>
          <div className="flex justify-between">
            <div className="flex">
              <div className="flex my-2 mx-1">
                <FaRegComments className="mx-1" />
                <span className="text-xs">2</span>
              </div>
              <div className="flex my-2">
                <RiAttachment2 className="mx-1" />
                <span className="text-xs">2</span>
              </div>
            </div>
            <div className="flex items-center mr-2">
              <Avatar className="h-6 w-6 bg-[#4299e1] dark:bg-[#2563eb]">
                <AvatarImage
                  alt="Avatar 1"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback>A1</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{issue.issueName}</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex">
          <div className="flex flex-col">
            <div className="">
              Description
            </div>
          </div>
          <div className="flex flex-col"></div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
