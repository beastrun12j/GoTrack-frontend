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

interface Task {
  id: string;
  content: string;
  priority: string;
  completed: boolean;
  assignee: string;
}

interface Board {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Board[] = [
  {
    id: "board-1",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        content: "Task 1",
        priority: "High",
        completed: false,
        assignee: "John",
      },
      {
        id: "task-2",
        content: "Task 2",
        priority: "Medium",
        completed: false,
        assignee: "John",
      },
      {
        id: "task-3",
        content: "Task 3",
        priority: "Low",
        completed: false,
        assignee: "John",
      },
    ],
  },
  {
    id: "board-2",
    title: "In Progress",
    tasks: [
      {
        id: "task-4",
        content: "Task 4",
        priority: "High",
        completed: false,
        assignee: "John",
      },
      {
        id: "task-5",
        content: "Task 5",
        priority: "Medium",
        completed: false,
        assignee: "John",
      },
      {
        id: "task-6",
        content: "Task 6",
        priority: "Low",
        completed: false,
        assignee: "John",
      },
    ],
  },
  {
    id: "board-3",
    title: "Review",
    tasks: [
      {
        id: "task-7",
        content: "Task 7",
        priority: "High",
        completed: false,
        assignee: "John",
      },
      {
        id: "task-8",
        content: "Task 8",
        priority: "Medium",
        completed: false,
        assignee: "John",
      },
      {
        id: "task-9",
        content: "Task 9",
        priority: "Low",
        completed: false,
        assignee: "John",
      },
    ],
  },
  {
    id: "board-4",
    title: "Done",
    tasks: [
      {
        id: "task-10",
        content: "Task 10",
        priority: "High",
        completed: true,
        assignee: "John",
      },
      {
        id: "task-11",
        content: "Task 11",
        priority: "Medium",
        completed: true,
        assignee: "John",
      },
      {
        id: "task-12",
        content: "Task 12",
        priority: "Low",
        completed: true,
        assignee: "John",
      },
    ],
  },
];

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

const KanbanBoard: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceBoardIndex = boards.findIndex(
      (board) => board.id === source.droppableId
    );
    const destinationBoardIndex = boards.findIndex(
      (board) => board.id === destination.droppableId
    );

    if (sourceBoardIndex === -1 || destinationBoardIndex === -1) return;

    const sourceBoard = boards[sourceBoardIndex];
    const destinationBoard = boards[destinationBoardIndex];

    let sourceTasks = [...sourceBoard.tasks];
    let destinationTasks = [...destinationBoard.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceBoard.id === destinationBoard.id) {
      sourceTasks.splice(destination.index, 0, movedTask);
    } else {
      destinationTasks.splice(destination.index, 0, movedTask);
    }

    const newBoards = boards.map((board, index) => {
      if (index === sourceBoardIndex) {
        return { ...board, tasks: sourceTasks };
      }
      if (index === destinationBoardIndex) {
        return { ...board, tasks: destinationTasks };
      }
      return board;
    });

    setBoards(newBoards);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto p-4">
        {boards.map((board) => (
          <div key={board.id} className="flex-shrink-0 w-64">
            <h2 className="text-xl font-bold mb-4">{board.title}</h2>
            <Droppable droppableId={`${board.id}`} key={board.id}>
              {(provided) => (
                <StrictModeDroppable droppableId={`${board.id}`}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-gray-100 rounded-md p-4 min-h-[200px]"
                    >
                      {board.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-4 mb-4 rounded-md shadow-md"
                            >
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div>
                                    <p className="text-lg">{task.content}</p>
                                    <div className="flex justify-between mt-2 text-xs">
                                      <span>{task.priority}</span>
                                      <span>
                                        {task.completed ? "Done" : "Pending"}
                                      </span>
                                      <span>{task.assignee}</span>
                                    </div>
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                      Make changes to your profile here. Click
                                      save when you're done.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="name"
                                        className="text-right"
                                      >
                                        Name
                                      </Label>
                                      <Input
                                        id="name"
                                        defaultValue="Pedro Duarte"
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label
                                        htmlFor="username"
                                        className="text-right"
                                      >
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
                      ))}
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
