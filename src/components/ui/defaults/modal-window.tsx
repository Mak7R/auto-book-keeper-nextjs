

interface ModalWindowProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
}

export default function ModalWindow(props: ModalWindowProps) {
  return (
    <>
      <div id={props.id} className="modal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {props.children}
            </div>
            <div className="modal-footer">
              {props.buttons}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}