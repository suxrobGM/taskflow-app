'use client';

import React, {useState} from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';

export default function NewProjectPage() {
  const [project, setProject] = useState({ name: '', description: '' });

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Project Data:', project);
    // Post data to server
  };

  return (
    <div className="p-4">
      <h1>Create New Project</h1>
      <div>
        <h5>Name</h5>
        <InputText name="name" value={project.name} onChange={handleInputChange} />

        <h5>Description</h5>
        <InputTextarea name="description" value={project.description} onChange={handleInputChange} />

        <Button label="Create Project" onClick={handleSubmit} className="mt-2" />
      </div>
    </div>
  );
};
