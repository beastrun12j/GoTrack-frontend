"use server";

import { redirect } from "next/navigation";
import Organisation from "@/interfaces/OrganisationInterface";
import Project from "@/interfaces/ProjectInterface";

import { getAuth } from "@/utils/AuthUtils";

export async function GetOrganisationByUser(): Promise<
  Organisation | undefined
> {
  const auth = getAuth();

  if (!auth) {
    return undefined;
  }

  // const response = await fetch(`http://localhost:8080/organisations/${auth.userId}`, {
  const response = await fetch(`http://localhost:8080/api/organisations/2`, {
    headers: {
      authorization: `Bearer ${auth.token}`,
    },
  });

  const organisation: Organisation = await response.json();

  return organisation;
}

export async function GetProjectsForUserOrganisation(
  organisationId: number
): Promise<[Project] | undefined> {
  const auth = getAuth();

  if (!auth) {
    return undefined;
  }

  const response = await fetch(
    `http://localhost:8080/api/users/${auth.userId}/projects?` +
      new URLSearchParams({
        organisationId: organisationId.toString(),
      }),
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  
  if (response.status === 400) {
    return undefined;
  }

  const projects = await response.json();

  return projects;
}

export async function navigate(path: string) {
  redirect(`/${path}`);
}
