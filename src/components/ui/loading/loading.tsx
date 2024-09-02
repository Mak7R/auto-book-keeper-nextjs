

export default function Loading(){
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className="spinner-border text-secondary me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="fs-5">Loading...</span>
    </div>
  );
}