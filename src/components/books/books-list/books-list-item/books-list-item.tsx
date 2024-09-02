import styles from './books-list-item.module.css'

function formatLocalDate(dateString: string): string {
  const utcDate = new Date(dateString);
  const day = utcDate.getDate();
  const month = utcDate.getMonth() + 1;
  const year = utcDate.getFullYear();
  const hours = utcDate.getHours();
  const minutes = utcDate.getMinutes();
  const seconds = utcDate.getSeconds();

  return `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

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
            <h6 className={styles.bookAuthor}>{book.ownerId}</h6>
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