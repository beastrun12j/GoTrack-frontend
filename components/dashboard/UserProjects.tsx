import Image from "next/image";
import DefaultImage from "@/assets/defaultProject.png";
import Project from "@/types/Project";

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
        <button className="cursor-pointer">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX////R5/8uWP8mU//X7f8WTP/J0P9vjP8TSP/V6/8qVf8eT//Q2P/L0//a8P/G3f+ivP+zwf/w8/+91P/h6P+6xv8yW/+Spv91j/8iUf9Tdv/M4v9oh/+Bnv+Nqf/e9P/2+P9Mcf88ZP9piP/X/Xz/AAADW0lEQVR4nO3d63KiMBiAYQSjJfGAJxSlrXTv/x53JUJnu7sOCaHJ4vv+7mS+R8DTVBJFRERERERERERERERERDRI+8Vy5rflYj8c71DmhRK+U0VeHq4D8LZHJZI4iGQi1HHrGriJlW/Yb6l44xZ4EtK36UtSzB36rlVYB1CnqqszYVW0y8rEd58nU1G5Ap6aIyiFPJdzv5Vn2V4x6uQGuBH3BUWVXSZT300uWdVO5OTpZhvrh0zG2SqdhFC6ytqZXLxoHPU5Kj92U9+0tunuQxPV0YGwuQh3YRxAXbprLsX+wIM+50UWzhG8Nc3ucx16C8v6rZqsVr5NX1pV9XmalL2F+f0QhnSO3kqz+vKReV/gXr/Yy4tv0R9d9OeAou+HqYV+pM6+PX/pXJ+matFTuKwv6ORHWM8zt6b6GUIsewpnWjgPUDjXwhlChAi9hRAhQv8hRIjQfwgRIrTO2fc9gQrT9W7tyBimMH3NRf7qhhikMH27rSbenBCDFE5zWX/F6WaxIIUv9VecLwi7LYYQIUKroRAaLYYQIUKroRAaLYYQIUKroRAaLYYQIUKroRAaLYYQIUKroRAaLYYQIUKroRAaLYYQIUKroRAaLYbQpTDt+CPl97vwvePfP/y/m+8Upm/5S7diXce/zh/+a9E3CtPXgW4pIcWjfxD7RuE6H8R3K1+HIEx34vGYPRIPfkDOMXQoHP91OP7n0id4Pezc//uepvNQCI0WQ4gQodVQCI0WQ4gQodVQCI0WQ4gQodVQCI0WQ4gQodVQCI0WQ4gQodVQCI0WQ4gQodVQCI0WQ4gQodVQCI0WC1I4+nt9jf9+beO/594T3DdxMv57XzoMIUKE/kOIEKH/ECJE6D+ECJ9HeN//sAxQ6Gj/w/HvYXnfhzQZ7z6kUa4fqfHuJfsE+wGPf0/n8e/L/QR7q2/bveizVRiHMV1l7UxbB8Jo09xRQFTZZdLxR8rDNblkVTvRxgUwik7NpShVci7nfivPiWp+/q9OboBRVBVxk0x893l3g6JyBYyulYrDS1VXZ8JfJ+pAN4awTwpnp6huE4d1GFXs6Enms+1RiSSMAykToY5OXia+dijzQgnfqSIvHbxV+1f7xXLmt+Wi98clIiIiIiIiIiIiIiIiIvp7PwFBOr94iDXONQAAAABJRU5ErkJggg=="
            alt="plus"
            width={100}
            height={100}
          />
          <p>Create New</p>
        </button>
      </div>
    </>
  );
}