'use client'

import Loading from "@/components/ui/loading/loading";
import BooksListItem from "@/components/books/books-list/books-list-item/books-list-item";
import {useEffect, useState} from "react";
import {useAppContext} from "@/contexts/AppContext";
import {useRouter} from "next/navigation";
import {getBooksService} from "@/services/providers/service-providers";
import CreateNewBook from "@/components/books/books-list/create-new-book/create-new-book";
import {Book} from "@/types/book";


interface BooksListProps{
  
}

export default function BooksList(props: BooksListProps){
  const booksService = getBooksService();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useAppContext();
  const {push} = useRouter();
  
  if (!user) {push("/login?returnUrl=/books");}

  useEffect(() => {
    booksService
      .getAll()
      .then(books => {
        setIsLoading(false);
        setBooks(books);
      })
      .catch(error => {
        // TODO handle errors
        // todo handle unauthorized with redirect
        console.log(error);
      });
  }, []);
  
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
            {books.map(book => (<BooksListItem book={book} key={book.id}/>))}
          </ul>
      }
      
      <CreateNewBook isLoading={isLoading} onSuccess={book => setBooks(prevState => [...prevState, book])}/>
    </>
  );
}