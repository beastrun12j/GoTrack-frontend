"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useEffect } from "react";

interface Issue {
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

interface IssuesMap {
  "To Do": Issue[] | null;
  Open: Issue[] | null;
  "In Progress": Issue[] | null;
  Review: Issue[] | null;
  Closed: Issue[] | null;
}

interface Board {
  issuesMap: IssuesMap;
  project_id: number;
}

interface KanbanBoardProps {
  data: Board;
}

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return (
    <Droppable {...props}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) =>
        children(provided, snapshot)
      }
    </Droppable>
  );
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ data }) => {
  const [boards, setBoards] = useState<IssuesMap>(data.issuesMap);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    if (!sourceStatus || !destinationStatus) return;

    const sourceIssues = boards[sourceStatus as keyof IssuesMap];
    const destinationIssues =
      boards[destinationStatus as keyof IssuesMap] || [];

    if (!sourceIssues) return;

    const [movedIssue] = sourceIssues.splice(source.index, 1);
    movedIssue.issueStatus = destinationStatus;
    

    const updateIssueStatus = async (issue: Issue) => {
      console.log("Hello:" + issue)
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/api/issues/${issue.issueId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(issue),
          }
        );
        console.log(await response.json())
        if (!response.ok) {
          throw new Error("Failed to update issue status");
        }
      } catch (error) {
        console.error("Error updating issue status:", error);
      }
    };

    updateIssueStatus(movedIssue);

    if (sourceStatus === destinationStatus) {
      sourceIssues.splice(destination.index, 0, movedIssue);
      setBoards({
        ...boards,
        [sourceStatus]: sourceIssues,
      });
    } else {
      destinationIssues.splice(destination.index, 0, movedIssue);
      setBoards({
        ...boards,
        [sourceStatus]: sourceIssues,
        [destinationStatus]: destinationIssues,
      });
    }
  };

  const renderIssues = (issues: Issue[] | null) => {
    if (!issues) return <div>No issues</div>;
    return issues.map((issue, index) => (
      <Draggable
        key={issue.issueId}
        draggableId={`${issue.issueId}`}
        index={index}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white p-4 mb-4 rounded-md shadow-md"
          >
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <h3>{issue.issueName}</h3>
                  <p>{issue.issueDesc}</p>
                  <p>
                    <strong>Priority:</strong> {issue.issuePriority}
                  </p>
                  <p>
                    <strong>Status:</strong> {issue.issueStatus}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      defaultValue="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {Object.entries(boards).map(([status, issues]) => (
          <div key={status} className="flex-shrink-0 w-64">
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            <Droppable droppableId={status}>
              {(provided) => (
                <StrictModeDroppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-gray-100 rounded-md p-4 min-h-[200px]"
                    >
                      {renderIssues(issues)}
                      {provided.placeholder}
                    </div>
                  )}
                </StrictModeDroppable>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
