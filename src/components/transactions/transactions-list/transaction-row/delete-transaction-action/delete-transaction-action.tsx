import React from 'react';
import {getTransactionsService} from "@/services/providers/service-providers";
import {Transaction} from "@/types/transaction";

interface DeleteTransactionActionProps {
  className?: string;
  transaction: Transaction;
  onDeleted?: (transaction: Transaction) => void;
}

export default function DeleteTransactionAction(props: DeleteTransactionActionProps) {

  const transactionsService = getTransactionsService();

  const deleteTransactionHandler = () => {
    transactionsService.delete(props.transaction.id)
      .then(t => props.onDeleted ? props.onDeleted(t) : undefined)
      .catch(e => console.error(e));
  }
  
  return (
    <>
      <button className={props.className} onClick={deleteTransactionHandler}>Delete</button>
    </>
  );
}