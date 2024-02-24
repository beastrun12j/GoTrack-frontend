export default function NotificationNav(){
    return (
        <>

            <div className="shadow-lg w-full">

                <div className="flex justify-start items-center">
                    <div className="p-4 mx-2 border-b-4 border-b-blue-500 flex justify-center items-center">
                        Direct 
                        <p className="bg-red-500 text-white rounded-full p-1 mx-1 w-6 h-6 flex items-center justify-center text-xs">9+</p>
                    </div>
                    <div className="p-4 mx-2 border-b-4 border-b-transparent">
                        Watching 
                    </div>
                    <div className="p-4 mx-2 border-b-4 border-b-transparent">
                        Starred 
                    </div>
                    <div className="p-4 mx-2 border-b-4 border-b-transparent">
                        Cleared 
                    </div>

                </div>

            </div>

        </>
    );
}