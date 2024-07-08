"use client";
import {useFormStatus} from "react-dom";
import {Button} from "primereact/button";

interface SubmitButtonProps {
  label?: string;
}

export function SubmitButton({label}: SubmitButtonProps) {
  const {pending} = useFormStatus();

  return (
    <Button type="submit" label={label} disabled={pending} />
  );
}
