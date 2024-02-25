import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";

import defaultUserIcon from "@/assets/defaultUserIcon.svg";

import { CiStar } from "react-icons/ci";
import { IoIosDoneAll } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";

import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotificationNav() {
  const dummyNotifications = [
    {
      id: 1,
      title: "API Integration for Go using NgRok",
      description: "Admin assigned this task to @Arjyo",
      priority: "High",
      projectName: "GoTrack",
      status: "To do",
      isStared: true,
      isCleared: false,
      type: "direct",
      time: "2 mins ago",
      logo: defaultUserIcon,
    },
    {
      id: 2,
      title: "API Integration for Go using NgRok",
      description: "Admin assigned this task to @Arjyo",
      priority: "Normal",
      projectName: "TrendSpotter",
      status: "In Progress",
      isStared: false,
      isCleared: false,
      type: "direct",
      time: "2 days ago",
      logo: defaultUserIcon,
    },
    {
      id: 3,
      title: "API Integration for Go using NgRok",
      description: "@Arjyo changed task priority from High to Low",
      priority: "Low",
      projectName: "Price Assist",
      status: "Closed",
      isStared: false,
      isCleared: true,
      type: "direct",
      time: "2 days ago",
      logo: defaultUserIcon,
    },
    {
      id: 4,
      title: "Database Management System",
      description: "Task Overdue : Database has been dropped by @Arjyo",
      priority: "Urgent",
      projectName: "Veersa Technologies",
      status: "Closed",
      isStared: false,
      isCleared: false,
      type: "direct",
      time: "2 days ago",
      logo: defaultUserIcon,
    },
    {
      id: 5,
      title: "API Integration for Go using NgRok",
      description: "@Arjyo assigned this task to @Sourab",
      priority: "High",
      projectName: "GoTrack",
      status: "To Do",
      isStared: false,
      isCleared: false,
      type: "Watching",
      time: "2 days ago",
      logo: defaultUserIcon,
    },
  ];

  return (
    <>
      <Tabs defaultValue="Direct" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Direct">
            Direct
            <p
              className={`${
                dummyNotifications.length > 0 ? "bg-red-500" : "hidden"
              }  text-white rounded-full p-1 mx-1 w-4 h-4 flex items-center justify-center text-sm/[px]`}
              style={{ fontSize: "9px" }}
            >
              {dummyNotifications.length > 9 ? "9+" : dummyNotifications.length}
            </p>
          </TabsTrigger>
          <TabsTrigger value="Watching">Watching</TabsTrigger>
          <TabsTrigger value="Starred">Starred</TabsTrigger>
          <TabsTrigger value="Cleared">Cleared</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[450px] w-full p-2">
          <TabsContent value="Direct">
            <div className="m-2">
              <div className="box">
                <div className="flex justify-between items-center p-2">
                  <p className="text-lg font-bold pl-2">Latest</p>
                  <p className="text-sm text-sky-500 flex items-center">
                    {" "}
                    <IoIosDoneAll size={25} /> Mark all as read
                  </p>
                </div>
                <div className="p-2">
                  {dummyNotifications.map((notification, index) => {
                    return (
                      notification.type === "direct" && (
                        <div
                          key={index}
                          className="sm:m-2 p-4 shadow-lg flex flex-col sm:flex-row  justify-between w-full"
                        >
                          <div className="flex w-full justify-start items-center">
                            <div className="hidden sm:block">
                              <Image
                                src={notification.logo}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                            <div className="mx-2">
                              <div className="flex items-center">
                                <p className="text-lg font-bold mr-2">
                                  {notification.title}
                                </p>
                                <div>
                                  <p className="text-xs">{notification.time}</p>
                                </div>
                              </div>
                              <p
                                className={`text-xs font-bold my-1 ${
                                  notification.priority === "High"
                                    ? "text-amber-600"
                                    : notification.priority === "Urgent"
                                    ? "text-red-600"
                                    : notification.priority === "Normal"
                                    ? "text-blue-600"
                                    : notification.priority === "Low"
                                    ? "text-green-500"
                                    : "text-slate-500"
                                }`}
                              >
                                {notification.priority}
                              </p>

                              <div className="flex items-center text-xs">
                                <p className="font-bold">
                                  {notification.projectName} &nbsp;
                                </p>
                                <p>&middot;</p>
                                <p>&nbsp; {notification.status}</p>
                              </div>

                              <p className="text-sm my-1">
                                {notification.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <CiStar size={20} className="mx-2" color="blue" />
                            <MdOutlineDone size={20} color="lightgreen" />
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Watching">
            <div className="m-2">
              <div className="box">
                <div className="flex justify-between items-center p-2">
                  <p className="text-lg font-bold">Latest</p>
                  <p className="text-sm text-sky-500 flex items-center">
                    {" "}
                    <IoIosDoneAll size={25} /> Mark all as read
                  </p>
                </div>
                <div className="p-2">
                  {dummyNotifications.map((notification, index) => {
                    return (
                      notification.type === "Watching" && (
                        <div
                          key={index}
                          className="m-2 p-4 shadow-lg flex justify-between w-full"
                        >
                          <div className="flex w-full justify-start items-center">
                            <div>
                              <Image
                                src={notification.logo}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                            <div className="mx-2">
                              <div className="flex items-center">
                                <p className="text-lg font-bold mr-2">
                                  {notification.title}
                                </p>
                                <div>
                                  <p className="text-xs">{notification.time}</p>
                                </div>
                              </div>
                              <p
                                className={`text-xs font-bold my-1 ${
                                  notification.priority === "High"
                                    ? "text-amber-600"
                                    : notification.priority === "Urgent"
                                    ? "text-red-600"
                                    : notification.priority === "Normal"
                                    ? "text-blue-600"
                                    : notification.priority === "Low"
                                    ? "text-green-500"
                                    : "text-slate-500"
                                }`}
                              >
                                {notification.priority}
                              </p>

                              <div className="flex items-center text-xs">
                                <p className="font-bold">
                                  {notification.projectName} &nbsp;
                                </p>
                                <p>&middot;</p>
                                <p>&nbsp; {notification.status}</p>
                              </div>

                              <p className="text-sm my-1">
                                {notification.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <CiStar size={20} className="mx-2" color="blue" />
                            <MdOutlineDone size={20} color="lightgreen" />
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Starred">
            <div className="m-2">
              <div className="box">
                <div className="flex justify-between items-center p-2">
                  <p className="text-lg font-bold">Latest</p>
                  <p className="text-sm text-sky-500 flex items-center">
                    {" "}
                    <IoIosDoneAll size={25} /> Mark all as read
                  </p>
                </div>
                <div className="p-2">
                  {dummyNotifications.map((notification, index) => {
                    return (
                      notification.isStared && (
                        <div
                          key={index}
                          className="m-2 p-4 shadow-lg flex justify-between w-full"
                        >
                          <div className="flex w-full justify-start items-center">
                            <div>
                              <Image
                                src={notification.logo}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                            <div className="mx-2">
                              <div className="flex items-center">
                                <p className="text-lg font-bold mr-2">
                                  {notification.title}
                                </p>
                                <div>
                                  <p className="text-xs">{notification.time}</p>
                                </div>
                              </div>
                              <p
                                className={`text-xs font-bold my-1 ${
                                  notification.priority === "High"
                                    ? "text-amber-600"
                                    : notification.priority === "Urgent"
                                    ? "text-red-600"
                                    : notification.priority === "Normal"
                                    ? "text-blue-600"
                                    : notification.priority === "Low"
                                    ? "text-green-500"
                                    : "text-slate-500"
                                }`}
                              >
                                {notification.priority}
                              </p>

                              <div className="flex items-center text-xs">
                                <p className="font-bold">
                                  {notification.projectName} &nbsp;
                                </p>
                                <p>&middot;</p>
                                <p>&nbsp; {notification.status}</p>
                              </div>

                              <p className="text-sm my-1">
                                {notification.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <CiStar size={20} className="mx-2" color="blue" />
                            <MdOutlineDone size={20} color="lightgreen" />
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Cleared">
            <div className="m-2">
              <div className="box">
                <div className="flex justify-between items-center p-2">
                  <p className="text-lg font-bold">Latest</p>
                  <p className="text-sm text-sky-500 flex items-center">
                    {" "}
                    <IoIosDoneAll size={25} />
                  </p>
                </div>
                <div className="p-2">
                  {dummyNotifications.map((notification, index) => {
                    return (
                      notification.isCleared && (
                        <div
                          key={index}
                          className="m-2 p-4 shadow-lg flex justify-between w-full"
                        >
                          <div className="flex w-full justify-start items-center">
                            <div>
                              <Image
                                src={notification.logo}
                                alt="user"
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                            <div className="mx-2">
                              <div className="flex items-center">
                                <p className="text-lg font-bold mr-2">
                                  {notification.title}
                                </p>
                                <div>
                                  <p className="text-xs">{notification.time}</p>
                                </div>
                              </div>
                              <p
                                className={`text-xs font-bold my-1 ${
                                  notification.priority === "High"
                                    ? "text-amber-600"
                                    : notification.priority === "Urgent"
                                    ? "text-red-600"
                                    : notification.priority === "Normal"
                                    ? "text-blue-600"
                                    : notification.priority === "Low"
                                    ? "text-green-500"
                                    : "text-slate-500"
                                }`}
                              >
                                {notification.priority}
                              </p>

                              <div className="flex items-center text-xs">
                                <p className="font-bold">
                                  {notification.projectName} &nbsp;
                                </p>
                                <p>&middot;</p>
                                <p>&nbsp; {notification.status}</p>
                              </div>

                              <p className="text-sm my-1">
                                {notification.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <CiStar size={20} className="mx-2" color="blue" />
                            <MdOutlineDone size={20} color="lightgreen" />
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </>
  );
}
