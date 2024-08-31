
interface MainProps{
  children?: React.ReactNode;
}

export default function Main(props: MainProps) {
  return (
    <main className='container-fluid d-flex justify-content-center' style={{flexGrow: 1}}>
      {props.children}
    </main>
  );
}