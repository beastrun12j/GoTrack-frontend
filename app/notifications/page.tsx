import NotificationNav from "@/components/notifications/Notification-nav";

const Notifications = () => {
  return (

    <>

      <div className="container flex justify-center items-center">

        <div className="flex justify-center items-center w-full">

          <div className="w-1/6 image border-2 border-blue-300 p-4 m-4">

            <h1>Image</h1>

          </div>

          <div className="p-4 m-4 w-3/6">

            <h1 className="text-4xl font-bold mb-5">Notifications</h1>

            <NotificationNav />
            
          </div>

        </div>

      </div>
    </>

  );
};

export default Notifications;
