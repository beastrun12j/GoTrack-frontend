import { getAuth } from "@/utils/AuthUtils";

export const GetOrganisationsByUser = async () => {
  const auth = getAuth();
  if (!auth) return undefined;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/${auth.userId}/organisations`,
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    }
  );
  
  return response.json();
};
