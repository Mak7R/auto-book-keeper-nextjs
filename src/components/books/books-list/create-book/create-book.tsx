'use client'

import ModalWindow from "@/components/ui/defaults/modal-window";
import FormField from "@/components/ui/form/FormField";
import FormArea from "@/components/ui/form/FormArea";
import {useState} from "react";
import {getBooksService} from "@/services/providers/service-providers";
import {Book} from "@/types/book";


interface CreateBookProps{
  isLoading: boolean;
  onSuccess?: (book: Book) => void;
}

interface CreateBookModel{
  title: string;
  description: string;
}

export default function CreateBook(props: CreateBookProps) {
  const booksService = getBooksService();  
  
  const [newBook, setNewBook] = useState<CreateBookModel>({title: "", description: "", });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  
  const handleCreateBook = () => {
    booksService.create(newBook as Book)
      .then(b => {
        setNewBook({title: "", description: "", });
        if (props.onSuccess) {
          props.onSuccess(b);
        }
      })
      .catch(_ => console.error(_));
  }
  
  return (
    <>
      <button className={'d-block w-100 btn btn-success rounded-5' + (props.isLoading ? " disabled" : "")} data-bs-toggle="modal" data-bs-target="#createBookModal">
        Create new book
      </button>

      <ModalWindow id="createBookModal" title="Create new book"
                   buttons={
                     <>
                       <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {setNewBook({title:"", description: ""})}}>Cancel</button>
                       <button className="btn btn-success" data-bs-dismiss="modal" onClick={handleCreateBook}>Create</button>
                     </>
                   }>
        <div>
          <div className="mb-3">
            <FormField label="Title: " name="title" value={newBook.title} onChange={handleInputChange}/>
          </div>

          <div className="mb-3">
            <FormArea label="Description: " name="description" value={newBook.description} onChange={handleInputChange} cols={2}/>
          </div>

        </div>
      </ModalWindow>
    </>
  )
}