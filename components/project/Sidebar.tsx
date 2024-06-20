import Image from "next/image";
import Link from "next/link";
import ProjectImage from "@/assets/icons8-music-equaliser.svg";
import { MdOutlineViewKanban } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import SidebarLink from "@/components/project/SidebarLink";

interface SideNavProps {
  projectName: string;
  projectId: number;
}

const SideNav = ({ projectName, projectId }: SideNavProps) => {
  return (
    <nav className="bg-[#f4f5f7] h-screen w-64 py-4 fixed">
      <div className="flex pl-4 mb-1">
        <Image src={ProjectImage} alt="Logo" width={80} height={80} />
        <div className="flex flex-col ">
          <span className="mt-2 text-[#172b4d] font-semibold text-md ">
            {projectName}
          </span>
          <span className="mt-1 text-[#172b4d]  text-xs">Software project</span>
        </div>
      </div>
      <ul className="px-6">
        <li className="mb-2">
          <SidebarLink
            href={`/project/${projectId}/board`}
            className="flex text-sm hover:bg-[#ebecf0] px-4 py-2 items-center"
          >
            <MdOutlineViewKanban size={25} />
            <div className="pl-3">Kanban Board</div>
          </SidebarLink>
        </li>
        <li className="mb-2">
          <SidebarLink
            href={`/project/${projectId}/settings`}
            className="flex text-sm hover:bg-[#ebecf0] px-4 py-2 items-center"
          >
            <MdOutlineSettings size={25} />
            <div className="pl-3">Project Settings</div>
          </SidebarLink>
        </li>
        {/* <li>
          <Link href="/contact" legacyBehavior>
            <a className="text-[#172b4d] hover:bg-gray-700 px-4 py-2 block">Contact</a>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default SideNav;
