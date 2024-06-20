export type Project = {
  projectid: number;
  projectName: string;
  projectDesc: string;
  projectCategoryID: number;
  projectURL: string;
  // projectLogo: string;
  organisationID: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProjectRequest = {
  projectName: string;
  projectDesc: string;
  projectCategoryID: number;
  projectURL: string;
  organisationID: string;
};

export type CreateProjectErrorResponse = {
  message: string;
};

export type projectCategories = {
  projectCategories: string[];
  organisationID: number;
};