import React, {useEffect, useState} from 'react';
import ModalWindow from "@/components/ui/defaults/modal-window";
import {Transaction} from "@/types/transaction";
import {getBooksService, getTransactionsService} from "@/services/providers/service-providers";
import FormField from "@/components/ui/form/FormField";
import FormArea from "@/components/ui/form/FormArea";

interface UpdateTransactionActionProps {
  transaction: Transaction;
  className?: string;
  onUpdated?: (transaction: Transaction) => void;
}

interface UpdateTransactionModel{
  id: string
  nameIdentifier: string
  description: string
  value: number
  transactionTime: string
}

const getDefaultTransactionModel = (transaction?: Transaction) : UpdateTransactionModel => {
  return {
    id: transaction?.id ?? "",
    nameIdentifier: transaction?.nameIdentifier ?? "",
    value: transaction?.value ?? 0,
    description: transaction?.description ?? "",
    transactionTime: transaction?.transactionTime ?? "",
  };
}

export default function UpdateTransactionAction(props: UpdateTransactionActionProps) {
  const transactionsService = getTransactionsService();
  
  const [updateTransaction, setUpdateTransaction] = useState<UpdateTransactionModel>(getDefaultTransactionModel(props.transaction));

  useEffect(() => {
    if (props.transaction) {
      setUpdateTransaction(getDefaultTransactionModel(props.transaction));
    }
  }, [props.transaction]);
  
  const modalWindowId = "updateTransaction"+props.transaction.id;
  
  const updateTransactionHandler = () => {
    transactionsService
      .update(updateTransaction as Transaction)
      .then(t => {
        if (props.onUpdated) props.onUpdated(t); 
      })
      .catch(e => console.log(e));
  }

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
              onClick={updateTransactionHandler}
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