import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";

async function handleSubmit(data: FormData) {
  "use server";
}

export default function AddProjectPage() {
  const header = <div className="font-bold text-xl text-center py-3">Create New Project</div>;
  const footer = <Button type="submit" label="Create Project" className="mt-2" />;

  return (
    <div className="flex justify-center">
      <Card className="w-full md:w-1/2" header={header} footer={footer}>
        <form className="flex flex-col gap-2" action={handleSubmit}>
          <label>Name</label>
          <InputText name="name" />
          
          <label>Description</label>
          <InputTextarea name="description" />
        </form>
      </Card>
    </div>
  );
}
