import Link from "next/link";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Project} from "@/persistence/entities";
import {ProjectRepository} from "@/persistence/repositories";

export default async function ProjectsPage() {
  const projectRepository = new ProjectRepository();
  const projects = await projectRepository.getAllProjects();

  const actionsColumnTemplate = async (rowData: Project) => {
    "use server";
    return (
      <>
        <Link href={`/projects/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" className="mr-2" severity="info" rounded />
        </Link>
        <Button icon="pi pi-trash" severity="danger" rounded />
      </>
    );
  };

  return (
    <div className="p-4">
      <div className="text-right mb-4">
        <Link href="/projects/add">
          <Button label="Add Project" icon="pi pi-plus" severity="success" rounded />
        </Link>
      </div>
      <DataTable value={projects}>
        <Column field="name" header="Name"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="createdDate" header="Created Date"></Column>
        <Column body={actionsColumnTemplate} header="Actions"></Column>
      </DataTable>
    </div>
  );
}
