import React from 'react';
import {Transaction} from "@/types/transaction";
import styles from "@/components/transactions/transactions-list/transaction-row/transaction-row.module.css";
import {formatLocalDate} from "@/libs/datatime/datatime";
import UpdateTransactionAction
  from "@/components/transactions/transactions-list/transaction-row/update-transaction-action/update-transaction-action";
import DeleteTransactionAction
  from "@/components/transactions/transactions-list/transaction-row/delete-transaction-action/delete-transaction-action";

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow(props: TransactionRowProps) {
  return (
    <>
      <tr className={styles.transaction}>
        <td className="text-center align-middle">{formatLocalDate(props.transaction.transactionTime)}</td>
        <td className="text-center align-middle"><strong>${props.transaction.value}</strong></td>
        <td className="text-center align-middle">{props.transaction.nameIdentifier}</td>
        <td className="text-center align-middle">
          <div className={styles.descriptionCell}>
            {props.transaction.description}
          </div>
        </td>
        <td className="position-relative">
          <div className={styles.fillContainer}>
            <UpdateTransactionAction className={styles.actionsButton + " btn btn-success"} transaction={props.transaction}/>
            <DeleteTransactionAction className={styles.actionsButton + " btn btn-danger"} transaction={props.transaction}/>
          </div>
        </td>
      </tr>
    </>
  );
}