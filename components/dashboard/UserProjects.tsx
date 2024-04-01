import Image from "next/image";
import DefaultImage from "@/assets/defaultProject.png";
import Project from "@/types/Project";
import Link from "next/link";
import addIcon from "@/assets/addNew.png";

export default function UserProjects({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects?.map((project: Project, projectid: number) => (
        <div
          key={projectid}
          className="project m-5 p-2 text-center flex flex-col items-center hover:bg-sky-100"
        >
          <button className="cursor-pointer">
            <Image src={DefaultImage} alt="logo" width={100} height={100} />
            <p>{project.projectName}</p>
          </button>
        </div>
      ))}

      <div className="project m-5 p-2  text-center flex flex-col items-center hover:bg-sky-100">
        <Link href="/createProject">
          <button className="cursor-pointer">
            <Image src={addIcon} alt="plus" width={100} height={100} />
            <p>Create New</p>
          </button>
        </Link>
      </div>
    </>
  );
}
