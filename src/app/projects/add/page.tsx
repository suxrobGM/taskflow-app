import {redirect} from "next/navigation";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {ProjectRepository} from "@/persistence/repositories";
import {SubmitButton} from '@/components';

async function handleSubmit(data: FormData) {
  "use server";
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const projectRepository = new ProjectRepository();
  await projectRepository.createProject({name, description});
  redirect("/projects");
}

export default function AddProjectPage() {
  const header = <div className="font-bold text-xl text-center py-3">Create New Project</div>;

  return (
    <div className="flex justify-center">
      <Card className="w-full md:w-1/2" header={header}>
        <form className="flex flex-col gap-2" action={handleSubmit}>
          <label htmlFor="name">Name</label>
          <InputText name="name" />

          <label htmlFor="description">Description</label>
          <InputTextarea name="description" />

          <div>
            <SubmitButton label="Create Project" />
          </div>
        </form>
      </Card>
    </div>
  );
}
