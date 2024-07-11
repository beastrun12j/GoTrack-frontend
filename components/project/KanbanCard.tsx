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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Issue } from "@/types/Issue";
import { Badge } from "@/components/ui/badge";
import { FaRegComments } from "react-icons/fa6";
import { RiAttachment2 } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EditorBox from "./EditorBox";

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
            <Badge
              className={`p-1 px-2 rounded-md my-2 ${getBadgeStyle(
                issue.issuePriority
              )}`}
            >
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
      <DialogContent className="sm:min-w-[1050px] overflow-y-scroll max-h-[775px]">
        <DialogHeader>
          <DialogTitle className="text-[32px]">{issue.issueName}</DialogTitle>
        </DialogHeader>
        <div className="flex">
          <div className="flex flex-col mr-6 w-2/3">
            <div className="mt-4">
              <div className="mb-3 font-semibold">Description</div>
              <div className="mx-2 text-justify">
                {/* Before you start work on an issue, you can set a time or other
                type of estimate to calculate how much work you believe it'll
                take to resolve it. Once you've started to work on a specific
                issue, log time to keep a record of it. <br></br> <br></br>
                1. Open the issue and select <br></br>
                2. Time tracking <br></br>
                3. Fill in the Time Spent field <br></br>
                4. Fill in the Time <br></br>
                5. Remaining field and click Save <br></br> */}
                <EditorBox defaultValue={issue.issueDesc}/>
              </div>
            </div>
            <div className="mt-10">
              <div className="font-semibold">Comments</div>
              <div className="flex my-3 space-x-4 items-center justify-center align-middle mx-2">
                <Avatar className="h-8 w-8 bg-[#4299e1] dark:bg-[#2563eb]">
                  <AvatarImage
                    alt="Avatar 1"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <Input
                  type="text"
                  placeholder="Add a comment..."
                  className="rounded-sm py-3"
                />
              </div>
              <div className="flex mx-2 mt-4 space-x-4">
                <Avatar className="h-8 w-8 bg-[#4299e1] dark:bg-[#2563eb]">
                  <AvatarImage
                    alt="Avatar 1"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <div>
                  <div>
                    <span className="text-[14px] font-semibold ">
                      Sourab Gay
                    </span>
                    <span className="text-xs text-gray-500 mx-2">
                      {" "}
                      2 days ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-justify">
                    Before you start work on an issue, you can set a time or
                    other type of estimate to calculate how much work you
                    believe it'll take to resolve it. Once you've started to
                    work on a specific issue, log time to keep a record of it.
                  </p>
                </div>
              </div>
              <div className="flex mx-2 mt-4 space-x-4">
                <Avatar className="h-8 w-8 bg-[#4299e1] dark:bg-[#2563eb]">
                  <AvatarImage
                    alt="Avatar 1"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <div>
                  <div>
                    <span className="text-[14px] font-semibold ">
                      Arjyo Booty
                    </span>
                    <span className="text-xs text-gray-500 mx-2">
                      {" "}
                      2 days ago
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-justify">
                    Sourab and Arjyo loves each other. They are the best couple
                    I have ever seen.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-6 w-1/3">
            <div className="mt-6 w-100">
              <p className="mb-3 font-semibold">Status</p>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder={issue.issueStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6 w-100">
              <p className="mb-3 font-semibold">Assignees</p>
              <div className="flex bg-gray-200 w-fit px-2 py-1 space-x-2 items-center rounded-sm mr-3">
                <Avatar className="h-6 w-6 bg-[#4299e1] dark:bg-[#2563eb]">
                  <AvatarImage
                    alt="Avatar 1"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <p className="text-xs">Sourab Gay</p>
              </div>
            </div>
            <div className="mt-6 w-100">
              <p className="mb-3 font-semibold">Reporter</p>
              <div className="flex bg-gray-200 w-fit px-2 py-1 space-x-2 items-center rounded-sm mr-3">
                <Avatar className="h-6 w-6 bg-[#4299e1] dark:bg-[#2563eb]">
                  <AvatarImage
                    alt="Avatar 1"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>A1</AvatarFallback>
                </Avatar>
                <p className="text-xs">Arjyo Booty</p>
              </div>
            </div>
            <div className="mt-6 w-100">
              <p className="mb-3 font-semibold">Priority</p>
              <Badge
              className={`p-2 rounded-md my-2 ${getBadgeStyle(
                issue.issuePriority
              )}`}
            >
              {issue.issuePriority} Priority
            </Badge>
            </div>
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
