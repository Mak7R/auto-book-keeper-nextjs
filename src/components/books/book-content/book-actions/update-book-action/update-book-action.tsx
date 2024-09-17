import {Book} from "@/types/book";
import ModalWindow from "@/components/ui/defaults/modal-window";
import FormField from "@/components/ui/form/FormField";
import FormArea from "@/components/ui/form/FormArea";
import React, {useEffect, useState} from "react";
import {getBooksService} from "@/services/providers/service-providers";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {config} from "@/config/config";
import {useRouter} from "next/navigation";
import {UpdateBookModel} from "@/services/modelsServices/books-service";

interface UpdateBookActionProps {
  book: Book;
}

function getDefaultUpdateBookModel(book: Book): UpdateBookModel {
  return {id: book.id, title: book.title, description: book.description, }
}

export default function UpdateBookAction(props: UpdateBookActionProps) {
  const [updateBook, setUpdateBook] = useState<UpdateBookModel>(getDefaultUpdateBookModel(props.book));
  
  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationKey: config.reactQueryKeys.books.update(),
    mutationFn: async (updateBook: UpdateBookModel) => getBooksService().update(updateBook),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.books.all()})
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.books.byId(props.book.id)})
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateBook(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
                         onClick={() => setUpdateBook(getDefaultUpdateBookModel(props.book))}
                       >
                         Cancel
                       </button>
                       <button 
                         className="btn btn-success" 
                         data-bs-dismiss="modal" 
                         onClick={() => mutate(updateBook)}
                         disabled={isPending}
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