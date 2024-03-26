import coverImage from "@/assets/default-profile-cover-image.png";
import profileImage from "@/assets/default-user-profile-image.png";
import { Button } from "@/components/ui/button";
import { MdBusinessCenter, MdOutlineAlternateEmail } from "react-icons/md";
import { IoIosBusiness } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import Image from "next/image";
import { getAuth } from "@/utils/AuthUtils";
import User from "@/types/User";

const getOrganisationsByUser = async (id: string) => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/${id}/organisations`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  return response.json();
};

const getUserDesignation = async (id: number) => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/designation/${id}`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  return response.json();
};

const getUserData = async (id: string) => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/${id}`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  if (response.status === 400) {
    throw new Error("could not get user");
  }

  return response.json();
};

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  try {
    const userData: User = await getUserData(params.id);
    const userDesignation = await getUserDesignation(userData.designationId);
    const userOrganisations = await getOrganisationsByUser(params.id);

    let currentOrganisation;
    if (userOrganisations !== null) {
      currentOrganisation = userOrganisations[0];
    }

    return (
      <>
        <div
          className="bg-contain h-60"
          style={{
            backgroundImage: `url(${coverImage.src})`,
          }}
        ></div>
        <div className="px-36">
          <div className="flex justify-center md:justify-start">
            <Image
              className="h-36 w-36 rounded-full border-4 border-white -mt-24 mr-4 bg-gray-200"
              style={{ objectFit: "cover" }}
              src={profileImage}
              quality={100}
              alt=""
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col container mt-6">
          <div className="flex flex-col md:w-4/12 lg:w-3/12 w-full">
            <h1 className="text-xl text-center">
              {userData.firstName + " " + userData.lastName}
            </h1>
            <Button
              className="my-5 px-10 bg-gray-200 hover:bg-gray-300 rounded-sm text-black text-xs"
              style={{}}
            >
              Manage your account
            </Button>
            <div className="flex flex-col mx-8 my-2">
              <h2 className="text-xs uppercase text-gray-500" style={{}}>
                About
              </h2>
              <div className="flex mt-5 mb-4">
                <MdBusinessCenter color="gray" />
                <p className="md:text-xs text-sm text-gray-500 mx-2">
                  {userDesignation.designation || "Behn ke lode"}
                </p>
              </div>
              <div className="flex mb-4">
                <IoIosBusiness color="gray" />
                <p className="md:text-xs text-sm text-gray-500 mx-2">
                  {currentOrganisation
                    ? currentOrganisation.organisationName
                    : "Organisation not found"}
                </p>
              </div>
              <div className="flex mb-4">
                <FaLocationDot color="gray" />
                <p className="md:text-xs text-sm text-gray-500 mx-2">
                  {userData.location || "New Delhi, India"}
                </p>
              </div>
            </div>
            <div className="flex flex-col mx-8 my-2">
              <h2 className="text-xs uppercase text-gray-500" style={{}}>
                Contact
              </h2>
              <div className="flex mt-5 mb-4">
                <MdOutlineAlternateEmail color="gray-700" />
                <p className="md:text-xs text-sm text-gray-500 mx-2">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center lg:w-8/12 w-full mt-6 md:mt-0">
            <div className="flex flex-col shadow-xl border-gray border-2 mx-5 px-8 py-4 md:w-3/4 w-full mb-3">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl">Worked on</h2>
                <p className="text-xs font-semibold text-blue-500">View all</p>
              </div>
              <div className="flex items-center mb-2">
                <FaCheckSquare size={25} color="#00ff00" className="" />
                <div className="flex flex-col mx-3">
                  <h3 className="text-xs font-semibold">
                    List Competitor Apps
                  </h3>
                  <div className="flex my-1">
                    <p className="text-xs text-gray-500 mr-1">
                      Chori ka Backend
                    </p>
                    <p className="text-xs text-gray-500 mr-1">&middot;</p>
                    <p className="text-xs text-gray-500">
                      You commented here today
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaCheckSquare size={25} color="#00ff00" className="" />
                <div className="flex flex-col mx-3">
                  <h3 className="text-xs font-semibold">
                    List Competitor Apps
                  </h3>
                  <div className="flex my-1">
                    <p className="text-xs text-gray-500 mr-1">
                      Chori ka Backend
                    </p>
                    <p className="text-xs text-gray-500 mr-1">&middot;</p>
                    <p className="text-xs text-gray-500">
                      You commented here today
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaCheckSquare size={25} color="#00ff00" className="" />
                <div className="flex flex-col mx-3">
                  <h3 className="text-xs font-semibold">
                    List Competitor Apps
                  </h3>
                  <div className="flex my-1">
                    <p className="text-xs text-gray-500 mr-1">
                      Chori ka Backend
                    </p>
                    <p className="text-xs text-gray-500 mr-1">&middot;</p>
                    <p className="text-xs text-gray-500">
                      You commented here today
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaCheckSquare size={25} color="#00ff00" className="" />
                <div className="flex flex-col mx-3">
                  <h3 className="text-xs font-semibold">
                    List Competitor Apps
                  </h3>
                  <div className="flex my-1">
                    <p className="text-xs text-gray-500 mr-1">
                      Chori ka Backend
                    </p>
                    <p className="text-xs text-gray-500 mr-1">&middot;</p>
                    <p className="text-xs text-gray-500">
                      You commented here today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>User not found :/ </div>;
  }
}
