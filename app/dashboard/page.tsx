import Alerts from "@/components/dashboard/Alerts";
import GreetUser from "@/components/dashboard/GreetUser";
import UserProjects from "@/components/dashboard/UserProjects";
import { Suspense } from "react";
import { getAuth } from "@/utils/AuthUtils";

const GetOrganisationsByUser = async () => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/${auth.userId}/organisations`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  return response.json();
};

const GetProjectsForUserOrganisation = async (organisationId: number) => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/${auth.userId}/projects?` +
      new URLSearchParams({
        organisationId: organisationId.toString(),
      }),
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  return response.json();
};

export default async function Dashboard() {
  const userOrganisations = await GetOrganisationsByUser();
  const currentOrganisation = userOrganisations[0];

  if (!currentOrganisation) return null;

  const projects = await GetProjectsForUserOrganisation(
    currentOrganisation.organisationId
  );

  return (
    <>
      <div className="main flex justify-center mt-20 px-10">
        <div className="hidden md:block w-[450px]">
          <Alerts />
        </div>

        <div className="ml-5 ">
          <div className="header">
            <GreetUser />
            <p>Organisation: {currentOrganisation.organisationName}</p>
          </div>

          <div className="user mt-8 ml-2">
            <h2 className="text-xl font-bold mb-5">Your Projects</h2>

            <div className="Projects grid grid-cols-2 md:grid-cols-4 gap-4">
              {projects && (
                <Suspense fallback={<div>Loading...</div>}>
                  <UserProjects projects={projects} />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
