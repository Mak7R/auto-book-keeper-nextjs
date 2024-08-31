

interface SubmitButtonProps {
  isLoading: boolean;
  children?: React.ReactNode;
  handleClick?: () => void;
}

export default function SubmitButton(props: SubmitButtonProps) {
  return (
    <>
      <button className={props.isLoading ? 'btn btn-secondary' : 'btn btn-success'} type='submit' onClick={props.handleClick} disabled={props.isLoading}>
        {props.children}
      </button>
    </>
  );
}