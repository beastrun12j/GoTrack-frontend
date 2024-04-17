"use client";

import Link from "next/link";

import { sendProjectData } from "@/actions/ProjectActions";

import { projectCategories } from "@/types/Project";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

import SelectProjectType from "@/components/createProject/SelectProjectType";

export default function CreateProjectForm({
  projectCategories,
  organisationID,
}: projectCategories) {
  const [categories, setCategories] = useState(projectCategories);
  const [category, setCategory] = useState("");

  return (
    <>
      <div className="md:container flex w-full justify-center">
        <form
          className="my-6 mx-3 sm:m-8 sm:p-8 sm:mt-6 pt-6 w-full sm:w-5/6"
          action={sendProjectData}
        >
          <div className="flex mt-3 justify-center sm:justify-start">
            <div className="m-4 text-3xl sm:text-4xl font-bold">
              <h1>Add Project Details</h1>
            </div>
          </div>
          <div className="hidden sm:flex  m-4 mb-8 mt-2">
            <div className="w-full lg:w-3/4">
              Explore what’s possible when you collaborate with your team. Edit
              project details anytime in project settings
            </div>
            <div className="lg:w-1/6"></div>
            <div className="lg:w-3/4"></div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:m-4 w-full">
            <div className="mx-5 sm:w-3/4 sm:mx-0 my-2">
              <p className="flex mb-2">
                Name<p className="text-red-500">*</p>
              </p>
              <input
                type="text"
                className="border-solid border-2 border-sky-500 rounded-md w-full h-10 sm:p-2"
                name="projectName"
                required
              />
            </div>

            <div className="w-1/6"></div>

            <div className="hidden">
              <input type="text" name="organisationID" value={organisationID} />
            </div>

            <div className="mx-5 flex sm:w-3/4 my-2 ">
              <div className="sm: w-3/4">
                <p className="flex mb-2">
                  Category <p className="text-red-500">*</p>
                </p>
                <Select
                  name="category"
                  value={category}
                  onValueChange={setCategory}
                  required
                >
                  <SelectTrigger className="w-full border-2 border-sky-500 ">
                    <SelectValue placeholder="Select Category" />
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
              <div className="w-1/8 mt-2">
                <p>&nbsp;</p>
                <SelectProjectType
                  setCategories={setCategories}
                  setCategory={setCategory}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:m-4 w-full">
            <div className="mx-5 sm:mx-0 sm:w-3/4 my-2">
              <p className="mb-2">Description</p>
              <textarea
                className="border-solid border-2 border-sky-500 rounded-md w-full h-36 p-2"
                name="description"
              ></textarea>
            </div>

            <div className="w-1/6"></div>

            <div className="mx-5 sm:w-3/4 my-2">
              <p className="mb-2">URL</p>
              <input
                type="text"
                className="border-solid border-2 border-sky-500 rounded-md w-full h-10 p-2"
                name="url"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end">
            <button className="text-gray-600 bg-gray-300 border border-gray-300 rounded-md my-1 mx-4 sm:mx-0 sm:my-0 sm:mr-1">
              <Link href="/dashboard" className="p-4">
                Cancel
              </Link>
            </button>

            <button
              type="submit"
              className="text-white bg-blue-500 border border-sky-500 rounded-md my-1 mt-5 sm:mt-0 mx-4 sm:mx-0 sm:my-0 sm:ml-1 p-2 px-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
