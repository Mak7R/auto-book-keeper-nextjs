

interface ErrorsListProps{
  errors: string[];
}

export default function ErrorsList(props: ErrorsListProps){
  return (
    <ul className='text-danger'>
      {props.errors.map((error) =>
        <li>{error}</li>
      )}
    </ul>
  );
}