import Avatars from "@/components/project/Avatars";
import SearchInput from "@/components/project/SearchInput";
import { Toggle } from "@/components/ui/toggle";
import Board from "@/components/project/KanbanBoard";
import { GetIssuesByProjectId } from "@/utils/IssueUtils";
import { getAuth } from "@/utils/AuthUtils";
import { Project } from "@/types/Project";
import SideNav from "@/components/project/Sidebar";

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

export default async function KanbanBoard({
  params,
}: {
  params: { id: string };
}) {
  const issues = await GetIssuesByProjectId(params.id);
  const project: Project = await getProjectbyProjectId(params.id);

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
          <div className="m-8 overflow-hidden sticky">
            <div className="text-gray-500 text-sm mb-4">
              Projects / {project.projectName} / Kanban board
            </div>
            <div className="text-2xl font-semibold">Kanban board</div>
            <div className="mt-6 flex space-x-4">
              <SearchInput />
              <Avatars />
              <Toggle
                aria-label="Toggle italic"
                className="text-gray-500 font-normal"
              >
                Only My Issues
              </Toggle>
              <Toggle
                aria-label="Toggle italic"
                className="text-gray-500 font-normal"
              >
                Recently Updated
              </Toggle>
            </div>
            <Board data={issues} />
          </div>
        </div>
      </main>
    </div>
  );
}
