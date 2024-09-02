'use client'

import styles from "./transactions-list.module.css"
import {useEffect, useState} from "react";
import {getTransactionsService} from "@/services/providers/service-providers";
import Loading from "@/components/ui/loading/loading";

interface TransactionsListProps {
  bookId: string
}

export default function TransactionList(props: TransactionsListProps): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const transactionsService = getTransactionsService();
  
  useEffect(() => {
    transactionsService.getAll(props.bookId)
      .then(ts => {
        setIsLoading(false);
        setTransactions(ts)
      })
      .catch(_ => console.error(_));
  }, []);
  
  return (
    <div className={styles.transactionsListContainer}>
      <h4 className={styles.transactionsListTitle}>Transactions</h4>

      <div className={styles.transactionsListBlock}>
        <button className={"btn btn-success d-block w-100 rounded-5 border border-1 border-black" + (isLoading ? " disabled" : "")} style={{minHeight: 60}}>Create new transaction</button>

        {
          isLoading ? 
            <div className='mt-2'><Loading /></div> :
            <ul className={styles.transactionsList}>
              {
                transactions.map(
                  t => <li className={styles.transaction} key={t.id}>{t.id}: {t.nameIdentifier}: {t.value}</li>
                )
              }
            </ul>
        }
      </div>
    </div>
  );
}