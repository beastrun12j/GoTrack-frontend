"use server";

import { CreateProjectErrorResponse, Project } from "@/types/Project";
import { redirect } from "next/navigation";
import { getAuth } from "@/utils/AuthUtils";
import { revalidatePath } from "next/cache";

export async function sendProjectData(data: FormData) {
  const projectName = data.get("projectName");
  const description = data.get("description");
  const category = data.get("category");
  const url = data.get("url");
  const organisationID = data.get("organisationID");

  const auth = getAuth();
  if (!auth) return undefined;

  const dummyData = {
    projectName: projectName,
    projectDesc: description,
    projectURL: url,
    projectCategory: category,
    organisationID: organisationID,
    userUUID: auth.userId,
  };

  const response = await fetch(`${process.env.BACKEND_BASE_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth.token}`,
    },
    body: JSON.stringify(dummyData),
  });

  const responseBody = await response.json();

  const registerData = {
    projectId: responseBody.projectid,
    userUUID: auth.userId,
  };

  const registerResponse = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/${auth.userId}/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(registerData),
    }
  );

  const registerResponseBody = await registerResponse.json();

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProjectData(data: FormData) {
  const projectName = data.get("projectName");
  const projectId = data.get("projectId");
  const description = data.get("description");
  const category = data.get("category");
  const url = data.get("url");
  const organisationID = data.get("organisationID");

  const auth = getAuth();
  if (!auth) return undefined;

  const dummyData = {
    projectId: projectId,
    projectName: projectName,
    projectDesc: description,
    projectURL: url,
    projectCategory: category,
    organisationID: organisationID,
    userUUID: auth.userId,
  };

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/projects/${projectId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(dummyData),
    }
  );

  const responseBody = await response.json();
}
