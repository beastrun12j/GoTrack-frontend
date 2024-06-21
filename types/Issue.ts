export interface Issue {
    issueId: number;
    issueName: string;
    issuePriority: string;
    issueStatus: string;
    issueDesc: string;
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    creatorId: number;
    projectId: number;
    issueTypeId: number;
    filesAttached: string[];
  }