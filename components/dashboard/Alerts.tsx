import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { FaCheckSquare, FaWindowClose  } from "react-icons/fa";

export default function Alerts() {
    return (
        <>

            <div className="shadow-lg rounded p-5">
                <h1 className="text-2xl flex font-bold mb-2 items-center"> 
                
                    <HiMiniBars3CenterLeft color="gray"/> 
                    &nbsp;
                    Recents
                    
                </h1>

                <div className="alerts">
                    <div className="p-2 my-1 m-1 text-sm flex items-center">
                        <FaCheckSquare color="#32CD32" size={35}/>
                        <p className="ml-2"> Arjyo sent a pic to his sir 4 days before deadline.</p>
                    </div>

                    <div className="p-2 my-1 m-1 text-sm flex items-center ">
                        <FaWindowClose color="#EE4B2B" size={50}/>
                        <p className="ml-2">Arjyo completed actual work and sent a pic to his sir 10 days after deadline.</p>
                    </div>

                    <div className="p-2 my-1 m-1 text-sm flex items-center">
                        <FaCheckSquare color="#32CD32" size={35}/>
                        <p className="ml-2">Arjyo sent a pic to his sir 4 days before deadline.</p>
                    </div>

                    <div className="p-2 my-1 m-1 text-sm flex items-center">
                        <FaWindowClose color="#EE4B2B" size={50}/>
                        <p className="ml-2">Arjyo completed actual work and sent a pic to his sir 10 days after deadline.</p>
                    </div>
                    
                </div>

            </div>
        </>
    )
}