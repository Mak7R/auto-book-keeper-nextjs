import styles from "./page.module.css"
import MainBookInfo from "@/components/books/book-content/main-book-info/main-book-info";
import TransactionList from "@/components/books/transactions/transactions-list/transactions-list";

interface BookPageProps{
  params: {
    bookId: string;
  };
}

export default function BookPage(props: BookPageProps) {
  return (
    <div className='container-lg mt-3 d-flex flex-wrap'>
      <div className={styles.leftColumn}>
        <TransactionList bookId={props.params.bookId}/>
      </div>
      <div className={styles.rightColumn}>
        <MainBookInfo bookId={props.params.bookId} />
      </div>
    </div>
  );
}