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

import { useState, useEffect } from "react";
import KanbanCard from "@/components/project/KanbanCard";
import { Issue } from "@/types/Issue";
import { Button } from "../ui/button";
import { IoAddCircleOutline } from "react-icons/io5";

interface IssuesMap {
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
      console.log("Hello:" + issue);
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
        console.log(await response.json());
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
            className="bg-white p-2 mb-2 rounded-md shadow-md"
          >
            <KanbanCard issue={issue} />
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {Object.entries(boards).map(([status, issues]) => (
          <div key={status} className="flex-shrink-0 w-64 mt-4">
            <h2 className="text-xl font-bold mb-4 mx-2">{status}</h2>
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
                      <Button variant="ghost" className="w-full mt-2 hover:gray-600">
                        <div className="mx-1">Add Issue</div>
                        <IoAddCircleOutline size={20}/>
                      </Button>
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
