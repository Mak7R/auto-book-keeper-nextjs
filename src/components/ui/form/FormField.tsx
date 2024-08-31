import {ChangeEvent} from "react";
import ErrorsList from "@/components/ui/form/ErrorsList";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[] | null
}

export default function FormField(props: FormFieldProps) {
  return(
    <>
      <label className='form-label'>{props.label}</label>
      <input
        className='form-control'
        name={props.name}
        type={props.type ?? 'text'}
        onChange={props.onChange}
        placeholder={props.placeholder ?? ''}
      />
      { props.errors && <ErrorsList errors={props.errors} /> }
    </>
  );
}