import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetProjectCategories } from "@/utils/projectUtils";
import { Project } from "@/types/Project";
import { getAuth } from "@/utils/AuthUtils";
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

export default async function ProjectSettings({
  params,
}: {
  params: { id: string };
}) {
  const categories = await GetProjectCategories();
  const project: Project = await getProjectbyProjectId(params.id);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <aside className="col-span-2">
        <SideNav projectName={project.projectName} />
      </aside>
      <main className="col-span-10 ml-5">
        <div className="overflow-x-hidden">
          <div className="m-4">
            <div className="flex">
              <div className="flex w-full justify-center">
                <div className="w-3/4 text-gray-950">
                  <div className="text-gray-500 text-sm mt-4 mb-2">
                    Projects / {project.projectName} / Project Details
                  </div>

                  <div className="text-2xl font-semibold mb-8">
                    Project Details
                  </div>

                  <div>
                    <p className="text-gray-600">Name</p>
                    <input
                      type="text"
                      className="w-full h-1/6 border border-gray-300 bg-gray-100 rounded-sm p-2"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-600">URL</p>
                    <input
                      type="text"
                      className="w-full h-1/6 border border-gray-300 bg-gray-100 rounded-sm p-2"
                    />

                    <div className="mt-4">
                      <p className="text-gray-600">Project Description</p>
                      <textarea
                        className="w-full h-1/6 border border-gray-300 bg-gray-100 rounded-sm p-2"
                        rows={5}
                      ></textarea>
                      <p className="text-gray-600 text-xs">
                        Describe the project in as much detail as you'd like.
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-gray-600">Project Category</p>
                      <Select name="category" required>
                        <SelectTrigger className="w-full h-1/6 border-2 border-gray-300 bg-gray-100 text-gray-950">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Project Categories</SelectLabel>
                            {categories?.map(
                              (category: string, index: number) => (
                                <SelectItem key={index} value={category}>
                                  {category}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="text-white bg-blue-500 border border-sky-500 rounded-md mt-4 p-2 px-4"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
