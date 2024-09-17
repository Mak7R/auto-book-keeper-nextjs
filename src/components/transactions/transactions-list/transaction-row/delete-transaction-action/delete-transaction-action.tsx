import React from 'react';
import {getTransactionsService} from "@/services/providers/service-providers";
import {Transaction} from "@/types/transaction";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {config} from "@/config/config";

interface DeleteTransactionActionProps {
  className?: string;
  transaction: Transaction;
}

export default function DeleteTransactionAction(props: DeleteTransactionActionProps) {

  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationKey: config.reactQueryKeys.transactions.delete(),
    mutationFn: async () => getTransactionsService().delete(props.transaction.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.transactions.all(props.transaction.bookId)})
    }
  })
  
  return (
    <>
      <button className={props.className} onClick={() => mutate()} disabled={isPending}>Delete</button>
    </>
  );
}