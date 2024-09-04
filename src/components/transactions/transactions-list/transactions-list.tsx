'use client'

import styles from "./transactions-list.module.css"
import React, {useEffect, useState} from "react";
import {getTransactionsService} from "@/services/providers/service-providers";
import Loading from "@/components/ui/loading/loading";
import CreateTransaction from "@/components/transactions/transactions-list/create-transaction/create-transaction";
import {Transaction} from "@/types/transaction";
import TransactionRow from "@/components/transactions/transactions-list/transaction-row/transaction-row";

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
      .catch(e => console.error(e));
  }, []);
  
  
  
  return (
    <div className={styles.transactionsContainer}>
      <h4 className="text-center">Transactions</h4>
      <CreateTransaction isLoading={isLoading} bookId={props.bookId} onCreated={(t) => setTransactions(ps => [...ps, t])}/>
      <div className={styles.transactionsBlock + " mt-2 table-responsive"}>
        {
          isLoading ? <Loading /> :
            <div className={styles.transactionsTableContainer}>
              <table className="table table-striped table-hover">
                <thead className={styles.transactionsTableHeader}>
                <tr>
                  <th scope="col" className="col-2">DataTime</th>
                  <th scope="col" className="col-2">Value</th>
                  <th scope="col" className="col-3">NameIdentifier</th>
                  <th scope="col" className="col-3">Description</th>
                  <th scope="col" className="col-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                  transactions.map(t => 
                    <TransactionRow
                      key={t.id}
                      transaction={t}
                      onUpdated={updated => {
                        setTransactions(prevState => prevState.map(item => item.id === updated.id ? updated : item))
                      }}
                      onDeleted={deleted => 
                        setTransactions(prevState => prevState.filter(item => deleted.id !== item.id))
                      }
                    />
                  )
                }
                </tbody>
              </table>
            </div>
        }
      </div>
    </div>
  );
}