import styles from "./page.module.css"
import MainBookInfo from "@/components/books/book-content/main-book-info/main-book-info";
import TransactionList from "@/components/transactions/transactions-list/transactions-list";
import AuthRequired from "@/components/helpers/auth-required/auth-required";
import {config} from "@/config/config";

interface BookPageProps{
  params: {
    bookId: string;
  }
}

export default function BookPage(props: BookPageProps) {
  return (
    <>
      <AuthRequired returnUrl={config.localUrls.books.byId(props.params.bookId)}/>
      <div className='container-xl mt-3 d-flex flex-wrap'>
        <div className={styles.leftColumn}>
          <TransactionList bookId={props.params.bookId}/>
        </div>
        <div className={styles.rightColumn}>
          <MainBookInfo bookId={props.params.bookId} />
        </div>
      </div>
    </>
  );
}