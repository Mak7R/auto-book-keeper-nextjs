import React, {useState} from 'react';
import ModalWindow from "@/components/ui/defaults/modal-window";
import {Transaction} from "@/types/transaction";
import {getTransactionsService} from "@/services/providers/service-providers";
import FormField from "@/components/ui/form/FormField";
import FormArea from "@/components/ui/form/FormArea";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {config} from "@/config/config";
import {UpdateTransactionModel} from "@/services/modelsServices/transactions-service";

interface UpdateTransactionActionProps {
  transaction: Transaction;
  className?: string;
}

const getDefaultTransactionModel = (transaction: Transaction) : UpdateTransactionModel => {
  return {
    id: transaction.id,
    nameIdentifier: transaction.nameIdentifier,
    value: transaction.value,
    description: transaction.description,
    transactionTime: transaction.transactionTime,
  };
}

export default function UpdateTransactionAction(props: UpdateTransactionActionProps) {
  const [updateTransaction, setUpdateTransaction] = useState<UpdateTransactionModel>(getDefaultTransactionModel(props.transaction));
  
  const modalWindowId = "updateTransaction"+props.transaction.id;

  const queryClient = useQueryClient()
  const {mutate, isPending} = useMutation({
    mutationKey: config.reactQueryKeys.transactions.update(),
    mutationFn: async (updateTransactionModel: UpdateTransactionModel) => getTransactionsService().update(updateTransactionModel),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.transactions.all(props.transaction.bookId)})
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.transactions.byId(props.transaction.id)})
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateTransaction(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
  
  return (
    <>
      <button className={props.className} data-bs-toggle="modal" data-bs-target={"#" + modalWindowId}>
        Edit
      </button>
      
      <ModalWindow 
        id={modalWindowId} 
        title={"Update transaction: " + props.transaction.nameIdentifier}
        buttons={
          <>
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setUpdateTransaction(getDefaultTransactionModel(props.transaction))}
            >
              Cancel
            </button>
            <button
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={() => mutate(updateTransaction)}
              disabled={isPending}
            >
              Update
            </button>
          </>
        }
      >
        <div>
          <div className="mb-3">
            <FormField
              label="Name Identifier: "
              name="nameIdentifier"
              value={updateTransaction?.nameIdentifier}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <FormField
              label="Value: "
              name="value"
              type="number"
              value={updateTransaction?.value}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <FormField
              label="Transaction Time: "
              name="transactionTime"
              type="datetime-local"
              value={updateTransaction?.transactionTime}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <FormArea
              label="Description: "
              name="description"
              value={updateTransaction?.description}
              onChange={handleInputChange}
              cols={2}
            />
          </div>
        </div>
      </ModalWindow>
    </>
  );
}