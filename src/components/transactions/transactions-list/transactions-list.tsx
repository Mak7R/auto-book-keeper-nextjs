'use client'

import styles from "./transactions-list.module.css"
import {getTransactionsService} from "@/services/providers/service-providers";
import Loading from "@/components/ui/loading/loading";
import CreateTransaction from "@/components/transactions/transactions-list/create-transaction/create-transaction";
import TransactionRow from "@/components/transactions/transactions-list/transaction-row/transaction-row";
import {useQuery} from "@tanstack/react-query";
import {config} from "@/config/config";

interface TransactionsListProps {
  bookId: string
}

export default function TransactionList(props: TransactionsListProps) {
  const {data, isLoading} = useQuery({
    queryKey: config.reactQueryKeys.transactions.all(props.bookId),
    queryFn: () => getTransactionsService().getAll(props.bookId)
  })
  
  return (
    <div className={styles.transactionsContainer}>
      <h4 className="text-center">Transactions</h4>
      <CreateTransaction isLoading={isLoading} bookId={props.bookId}/>
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
                  data && data.map(t => 
                    <TransactionRow
                      key={t.id}
                      transaction={t}
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