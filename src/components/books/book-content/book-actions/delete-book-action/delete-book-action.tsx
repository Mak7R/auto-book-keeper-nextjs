import ModalWindow from "@/components/ui/defaults/modal-window";
import {Book} from "@/types/book";
import {useRouter} from "next/navigation";
import {getBooksService} from "@/services/providers/service-providers";

interface DeleteBookActionProps {
  book: Book | null
}

export default function DeleteBookAction(props: DeleteBookActionProps){
  const {replace} = useRouter();
  const booksService = getBooksService();
  
  const handleDeleteBook = () => {
    if (props.book){
      booksService
        .delete(props.book.id)
        .then(b => {
          replace("/books");
        })
        .catch(_ => console.error(_));
    }
  }
  
  return (
    <>
      <button
        className={'w-100 btn rounded-5 btn-danger' + (props.book === null ? ' disabled' : '')} data-bs-toggle="modal" data-bs-target="#deleteBookModal">
        Delete
      </button>

      <ModalWindow
        id="deleteBookModal"
        title={"Delete book: " + props.book?.title}
        buttons=
          {
            <>
              <button className="btn btn-secondary" data-bs-dismiss="modal" >
                Cancel
              </button>
              <button className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteBook}>
                Delete
              </button>
            </>
          }
      >
        <h6>
          Are you sure that you want to delete this book?
          <span className="text-danger">After deletion it cannot be canceled!!!</span>
        </h6>
      </ModalWindow>
    </>
  );
}