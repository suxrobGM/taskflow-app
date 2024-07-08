"use client";
import Link from "next/link";
import {Button} from "primereact/button";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {ProjectDto} from '@/persistence/models';

interface ProjectsGridProps {
  projects: ProjectDto[];
}

function actionsColumnTemplate(rowData: ProjectDto) {
  return (
    <>
      <Link href={`/projects/edit/${rowData.id}`}>
        <Button icon="pi pi-pencil" className="mr-2" severity="info" rounded />
      </Link>
      <Button icon="pi pi-trash" severity="danger" rounded />
    </>
  );
}

export function ProjectsGrid({projects}: ProjectsGridProps) {
  return (
    <DataTable value={projects}>
      <Column field="name" header="Name" />
      <Column field="description" header="Description" />
      <Column field="createdDate" header="Created Date" />
      <Column body={actionsColumnTemplate} header="Actions" />
    </DataTable>
  );
}
