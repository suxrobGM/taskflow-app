import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';

export default function EditProjectPage() {
  const [project, setProject] = useState({name: '', description: ''});
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    // Fetch project data from server
    console.log('Fetch project data for id:', id);
    // Simulate fetching data
    setProject({name: 'Existing Project Name', description: 'Existing Project Description'});
  }, [id]);

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setProject({...project, [name]: value});
  };

  const handleSubmit = () => {
    console.log('Update Project Data:', project);
    // Update data on server
  };

  return (
    <div className="p-4">
      <h1>Edit Project</h1>
      <div>
        <h5>Name</h5>
        <InputText name="name" value={project.name} onChange={handleInputChange} />

        <h5>Description</h5>
        <InputTextarea name="description" value={project.description} onChange={handleInputChange} />

        <Button label="Update Project" onClick={handleSubmit} className="mt-2" />
      </div>
    </div>
  );
};
