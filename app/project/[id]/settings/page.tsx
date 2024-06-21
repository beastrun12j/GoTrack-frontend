import {
  GetProjectCategories,
  GetProjectCategoryById,
} from "@/utils/projectUtils";
import { Project } from "@/types/Project";
import { getAuth } from "@/utils/AuthUtils";
import SideNav from "@/components/project/Sidebar";
import ProjectSettingsHelper from "@/components/project/ProjectSettings";

const getProjectbyProjectId = async (id: string) => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/projects/${id}`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  return response.json();
};

export default async function ProjectSettings({
  params,
}: {
  params: { id: string };
}) {
  const categories = await GetProjectCategories();
  const project: Project = await getProjectbyProjectId(params.id);

  const projectCategory: string = await GetProjectCategoryById(
    project.projectCategoryID
  );

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <aside className="col-span-2">
        <SideNav
          projectName={project.projectName}
          projectId={project.projectid}
        />
      </aside>
      <main className="col-span-10 ml-5">
        <div className="overflow-x-hidden">
          <ProjectSettingsHelper
            project={project}
            categories={categories}
            projectCategory={projectCategory}
          />
        </div>
      </main>
    </div>
  );
}
