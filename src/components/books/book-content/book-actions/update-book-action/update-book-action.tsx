import {Book} from "@/types/book";
import ModalWindow from "@/components/ui/defaults/modal-window";
import FormField from "@/components/ui/form/FormField";
import FormArea from "@/components/ui/form/FormArea";
import {useEffect, useState} from "react";
import {getBooksService} from "@/services/providers/service-providers";

interface UpdateBookActionProps {
  book: Book | null;
  onSuccess?: (book: Book) => void;
}

interface UpdateBookModel{
  title: string;
  description: string;
}

export default function UpdateBookAction(props: UpdateBookActionProps) {
  const booksService = getBooksService();
  const [updateBook, setUpdateBook] = 
    useState<UpdateBookModel>( 
      {title: props.book?.title ?? "", description: props.book?.description ?? "", });

  useEffect(() => {
    if (props.book) {
      setUpdateBook({
        title: props.book.title,
        description: props.book.description,
      });
    }
  }, [props.book]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateBook(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  
  const handleUpdateBook = () => {
    booksService.update({...updateBook, id: props.book?.id} as Book)
      .then(b => {
        setUpdateBook({title: b.title, description: b.description, });
        if (props.onSuccess) {
          props.onSuccess(b);
        }
      })
      .catch(_ => console.error(_));
  }
  
  return (
    <>
      <button
        className={'w-100 btn rounded-5 btn-primary' + (props.book === null ? ' disabled' : '')} data-bs-toggle="modal" data-bs-target="#updateBookModal">
        Update
      </button>

      <ModalWindow id="updateBookModal" title="Update book"
                   buttons={
                     <>
                       <button 
                         className="btn btn-secondary" 
                         data-bs-dismiss="modal" 
                         onClick={
                           () => {
                             setUpdateBook(
                               {
                                 title: props.book?.title ?? "", 
                                 description: props.book?.description ?? "", 
                               }
                             )
                           }
                         }
                       >
                         Cancel
                       </button>
                       <button 
                         className="btn btn-success" 
                         data-bs-dismiss="modal" 
                         onClick={handleUpdateBook}
                       >
                         Update
                       </button>
                     </>
                   }
      >
        <div>
          <div className="mb-3">
            <FormField
              label="Title: "
              name="title"
              value={updateBook?.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <FormArea
              label="Description: "
              name="description"
              value={updateBook?.description}
              onChange={handleInputChange}
              cols={2}
            />
          </div>
        </div>
      </ModalWindow>
    </>
  );
}