import {ChangeEvent} from "react";
import ErrorsList from "@/components/ui/form/ErrorsList";

interface FormAreaProps {
  label: string;
  name: string;
  cols: number
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  errors?: string[] | null
}

export default function FromArea(props: FormAreaProps) {
  return(
    <>
      <label className='form-label'>{props.label}</label>
      <textarea
        className='form-control'
        name={props.name}
        cols={props.cols}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder ?? ''}
      />
      { props.errors && <ErrorsList errors={props.errors} /> }
    </>
  );
}