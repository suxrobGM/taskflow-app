import Link from "next/link";
import {Button} from "primereact/button";
import {ProjectRepository} from "@/persistence/repositories";
import {ProjectsGrid} from "./components";

export default async function ProjectsPage() {
  const projectRepository = new ProjectRepository();
  const projects = await projectRepository.getAllProjects();

  return (
    <div className="p-4">
      <div className="text-right mb-4">
        <Link href="/projects/add">
          <Button label="Add Project" icon="pi pi-plus" severity="success" rounded />
        </Link>
      </div>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
