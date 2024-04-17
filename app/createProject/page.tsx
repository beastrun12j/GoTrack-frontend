import CreateProjectForm from "@/components/createProject/CreateProjectForm";
import { getAuth } from "@/utils/AuthUtils";

import { GetOrganisationsByUser } from "@/utils/OrganisationUtils";

const GetProjectCategories = async () => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/projects/categories`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );

  return response.json();
};

export default async function CreateProject() {
  const projectCategories = await GetProjectCategories();

  const organisation = await GetOrganisationsByUser();

  const organisationID = await organisation[0].organisationId;

  return (
    <>
      <CreateProjectForm
        projectCategories={projectCategories}
        organisationID={organisationID}
      />
    </>
  );
}
