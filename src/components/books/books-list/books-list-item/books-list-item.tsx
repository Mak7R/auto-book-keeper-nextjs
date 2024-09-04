import styles from './books-list-item.module.css'
import {Book} from "@/types/book";
import {formatLocalDate} from "@/libs/datatime/datatime";
import UsernameRef from "@/components/users/username-ref/username-ref";



export default function BooksListItem({ book }: {book: Book}) {
  return (
    <>
      <li className={styles.booksListItem}>
        <div className={styles.bookContent}>
          {/*{formatLocalDate(book.creationTime)}: {book.ownerId}*/}
          <div className={styles.bookMainInfo}>
            <h5 className={styles.bookTitle}>{book.title}</h5>
            <p className={styles.bookDescription}>{book.description}</p>
          </div>
          <div className={styles.bookAdditionalInfo}>
            <h6 className={styles.bookAuthor}><UsernameRef userId={book.ownerId}/></h6>
            <p className={styles.bookDescription}>{formatLocalDate(book.creationTime)}</p>
          </div>
          <div className={styles.bookActions}>
            <a className='btn btn-success rounded-4' href={'/books/' + book.id}>Open</a>
          </div>
        </div>
      </li>
    </>
  );
}