import NotificationNav from "@/components/notifications/Notification-nav";
import Image from "next/image";
import NotificationIcon from "@/assets/notificationLogo.svg";

const Notifications = () => {
  return (
    <>
      <div className="md:container flex justify-center items-center mt-20">
        <div className="flex justify-center w-full">
          <div className="hidden md:block w-3/6  p-4 m-4 self-center">
            <Image src={NotificationIcon} alt="logo" />
          </div>

          <div className="p-2 m-2 md:w-4/6 w-full">
            <h1 className="text-4xl font-bold mb-5">Notifications</h1>
            <NotificationNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
