'use client'

import Loading from "@/components/ui/loading/loading";
import BooksListItem from "@/components/books/books-list/books-list-item/books-list-item";
import {getBooksService} from "@/services/providers/service-providers";
import CreateBook from "@/components/books/books-list/create-book/create-book";
import {useQuery} from "@tanstack/react-query";
import {config} from "@/config/config";

export default function BooksList(){
  const {data, isLoading} = useQuery({
    queryKey: config.reactQueryKeys.books.all(),
    queryFn: () => getBooksService().getAll()
  })
  
  return (
    <>
      <h1 className='text-center'>Books</h1>
      {
        isLoading
          ?
          <div className='d-flex justify-content-center my-3'>
            <Loading></Loading>
          </div>
          :
          <ul className='p-0'>
            {data && data.map(book => (<BooksListItem book={book} key={book.id}/>))}
          </ul>
      }
      
      <CreateBook isLoading={isLoading}/>
    </>
  );
}