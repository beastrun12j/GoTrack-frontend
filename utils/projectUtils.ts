import { getAuth } from "./AuthUtils";

export const GetProjectCategories = async () => {
    const auth = getAuth();
    if (!auth) return undefined;
  
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/projects/categories`,
      {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      }
    );
  
    return response.json();
  };

  export const GetProjectCategoryById = async (id: number) => {
    const auth = getAuth();
    if (!auth) return undefined;
  
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/api/projects/categories/${id}`,
      {
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      }
    );
  
    return response.json();
  }
