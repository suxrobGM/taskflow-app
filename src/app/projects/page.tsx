'use server';

import React from 'react';
import Link from 'next/link';
import {Button} from 'primereact/button';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Project} from '@/persistence/entities';
import {ProjectRepository} from '@/persistence/repositories';

export default async function ProjectsPage() {
  const projectRepository = new ProjectRepository();
  const projects = await projectRepository.getAllProjects();

  const actionsColumnTemplate = (rowData: Project) => {
    'use server';
    return (
      <React.Fragment>
        <Link href={`/projects/edit/${rowData.id}`}>
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
        </Link>
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" />
      </React.Fragment>
    );
  };

  return (
    <div className="p-4">
      <div className="text-right mb-4">
        <Link href="/projects/add">
          <Button label="Add Project" icon="pi pi-plus" className="p-button-rounded p-button-success" />
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
};
