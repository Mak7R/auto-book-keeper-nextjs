import ModalWindow from "@/components/ui/defaults/modal-window";
import {Book} from "@/types/book";
import {useRouter} from "next/navigation";
import {getBooksService} from "@/services/providers/service-providers";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {config} from "@/config/config";

interface DeleteBookActionProps {
  book: Book
}

export default function DeleteBookAction(props: DeleteBookActionProps){
  const router = useRouter()
  const booksService = getBooksService()

  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationKey: config.reactQueryKeys.books.delete(),
    mutationFn: async () => booksService.delete(props.book.id),
    onSuccess: async () => {
      router.replace(config.localUrls.books.all())
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.books.all()})
    }
  })
  
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
              <button className="btn btn-danger" data-bs-dismiss="modal" onClick={() => mutate()} disabled={isPending}>
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