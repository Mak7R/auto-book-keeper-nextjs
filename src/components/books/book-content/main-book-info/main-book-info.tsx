'use client'

import styles from "./main-book-info.module.css"
import {getBooksService} from "@/services/providers/service-providers";
import {useEffect, useState} from "react";
import BookActions from "@/components/books/book-content/book-actions/book-actions";
import Loading from "@/components/ui/loading/loading";
import {Book} from "@/types/book";
import UsernameRef from "@/components/users/username-ref/username-ref";

interface MainBookInfoProps {
  bookId: string
}

export default function MainBookInfo(props: MainBookInfoProps) {
  const booksService = getBooksService();

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    booksService
      .getById(props.bookId)
      .then(b => {
        setBook(b);
      })
      .catch(error => {
        // TODO handle errors
        // todo handle permission denied
        console.log(error);
      });
  }, []);
  
  return (
    <>
      <div className={styles.mainInfoContainer}>
        <div>
          {book ?
            <>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.bookId}>{book.id}</p>
              <p>Description: <br/>{book.description}</p>
              <p>{book.creationTime}</p>
              <p><UsernameRef userId={book.ownerId} /></p>
            </>
            :
            <Loading />
          }
        </div>
      </div>
      <BookActions book={book} setBookState={book => setBook(book)} />
    </>
  )
}