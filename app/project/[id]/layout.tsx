import SideNav from "@/components/project/Sidebar";

export default function ProjectPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex-grow">
        <div className="overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}
