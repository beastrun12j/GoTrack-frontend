"use client";

import { Project } from "@/types/Project";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProjectData } from "@/actions/ProjectActions";
import { useState } from "react";

interface ProjectSettingsProps {
  project: Project;
  categories: string[];
  projectCategory: string;
}

export default function ProjectSettings({
  project,
  categories,
  projectCategory,
}: ProjectSettingsProps) {
  const [projectName, setProjectName] = useState(project.projectName);
  const [projectURL, setProjectURL] = useState(project.projectURL);
  const [projectDesc, setProjectDesc] = useState(project.projectDesc);

  return (
    <div className="m-4">
      <div className="flex">
        <div className="flex w-full justify-center">
          <div className="w-3/4 text-gray-950">
            <div className="text-gray-500 text-sm mt-4 mb-2">
              Projects / {project.projectName} / Project Details
            </div>

            <div className="text-2xl font-semibold mb-8">Project Details</div>

            <form action={updateProjectData}>
              <div>
                <p className="text-gray-600">Name</p>
                <input
                  type="text"
                  className="w-full h-1/6 border border-gray-300 bg-gray-100 rounded-sm p-2"
                  value={projectName}
                  name="projectName"
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <p className="text-gray-600">URL</p>
                <input
                  type="text"
                  className="w-full h-1/6 border border-gray-300 bg-gray-100 rounded-sm p-2"
                  value={projectURL}
                  name="url"
                  onChange={(e) => setProjectURL(e.target.value)}
                />

                <div className="mt-4">
                  <p className="text-gray-600">Project Description</p>
                  <textarea
                    className="w-full h-1/6 border border-gray-300 bg-gray-100 rounded-sm p-2"
                    rows={5}
                    value={projectDesc}
                    name="description"
                    onChange={(e) => setProjectDesc(e.target.value)}
                  ></textarea>
                  <p className="text-gray-600 text-xs">
                    Describe the project in as much detail as you'd like.
                  </p>
                </div>
              </div>

              <div className="hidden">
                <input
                  type="text"
                  name="organisationID"
                  value={project.organisationID}
                />
              </div>
              <div className="hidden">
                <input type="text" name="projectId" value={project.projectid} />
              </div>

              <div className="mt-6">
                <p className="text-gray-600">Project Category</p>
                <Select name="category" required>
                  <SelectTrigger className="w-full h-1/6 border-2 border-gray-300 bg-gray-100 text-gray-950">
                    <SelectValue placeholder={projectCategory} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Project Categories</SelectLabel>
                      {categories?.map((category: string, index: number) => (
                        <SelectItem key={index} value={category}>
                          {category}
                        </SelectItem>
                      ))}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
