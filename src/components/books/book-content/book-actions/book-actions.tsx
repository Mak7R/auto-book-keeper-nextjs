import styles from "./book-actions.module.css"
import {Book} from "@/types/book";
import UpdateBookAction from "@/components/books/book-content/book-actions/update-book-action/update-book-action";
import DeleteBookAction from "@/components/books/book-content/book-actions/delete-book-action/delete-book-action";
import Loading from "@/components/ui/loading/loading";
import ForecastBookAction from "@/components/books/book-content/book-actions/forecast-book-action/forecast-book-action";

interface BookActionsProps {
  book?: Book;
}

export default function BookActions(props: BookActionsProps) {
  return (
    <div className={styles.actionsContainer}>
      <h5 className={styles.actionsTitle}>Actions</h5>
      {
        props.book ?
          <ul className={styles.actionsList}>
            <li className={styles.action}>
              <ForecastBookAction book={props.book}/>
            </li>
            <li className={styles.action}>
              <UpdateBookAction book={props.book}/>
            </li>
            <li className={styles.action}>
              <DeleteBookAction book={props.book}/>
            </li>
          </ul>
          :
          <Loading />
      }
    </div>
  );
}