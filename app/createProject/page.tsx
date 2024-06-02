import CreateProjectForm from "@/components/createProject/CreateProjectForm";

import { GetOrganisationsByUser } from "@/utils/OrganisationUtils";
import { GetProjectCategories } from "@/utils/projectUtils";

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
