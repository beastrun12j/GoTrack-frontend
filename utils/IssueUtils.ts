import { getAuth } from "@/utils/AuthUtils";

export const GetIssuesByProjectId = async (id: string) => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/issues/status/${id}`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  
  return response.json();
};
