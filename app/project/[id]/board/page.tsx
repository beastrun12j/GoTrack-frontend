import Avatars from "@/components/project/Avatars";
import SearchInput from "@/components/project/SearchInput";
import { Toggle } from "@/components/ui/toggle";
import Board from "@/components/project/KanbanBoard";

export default function KanbanBoard() {
  return (
    <>
    <div className="m-8">
      <div className="text-gray-500 text-sm my-4">
        Projects / Google meet / Kanban board
      </div>
      <div className="text-2xl font-semibold">Kanban board</div>
      <div className="mt-6 flex space-x-4">
        <SearchInput />
        <Avatars />
        <Toggle
          aria-label="Toggle italic"
          className="text-gray-500 font-normal"
        >
          Only My Issues
        </Toggle>
        <Toggle
          aria-label="Toggle italic"
          className="text-gray-500 font-normal"
        >
          Recently Updated
        </Toggle>
      </div>
      <Board />
    </div>
    </>
  );
}
