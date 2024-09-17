'use client'

import ModalWindow from "@/components/ui/defaults/modal-window";
import FormField from "@/components/ui/form/FormField";
import FormArea from "@/components/ui/form/FormArea";
import React, {useState} from "react";
import {getBooksService} from "@/services/providers/service-providers";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateBookModel} from "@/services/modelsServices/books-service";
import {config} from "@/config/config";


interface CreateBookProps{
  isLoading: boolean;
}

function getDefaultNewBook(): CreateBookModel
{
  return {title:"", description: ""};
}

export default function CreateBook(props: CreateBookProps) {
  const booksService = getBooksService();  
  
  const [newBook, setNewBook] = useState<CreateBookModel>(getDefaultNewBook());
  
  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationKey: config.reactQueryKeys.books.create(),
    mutationFn: async (newBook: CreateBookModel) => booksService.create(newBook),
    onSuccess: async () => {
      setNewBook(getDefaultNewBook())
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.books.all()})
    }
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  
  return (
    <>
      <button className={'d-block w-100 btn btn-success rounded-5' + (props.isLoading ? " disabled" : "")} data-bs-toggle="modal" data-bs-target="#createBookModal">
        Create new book
      </button>

      <ModalWindow id="createBookModal" title="Create new book"
                   buttons={
                     <>
                       <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {setNewBook(getDefaultNewBook())}}>Cancel</button>
                       <button className="btn btn-success" data-bs-dismiss="modal" onClick={() => {mutate(newBook);}} disabled={isPending}>Create</button>
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