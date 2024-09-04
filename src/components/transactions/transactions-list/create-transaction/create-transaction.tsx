import FormArea from "@/components/ui/form/FormArea"
import FormField from "@/components/ui/form/FormField";
import ModalWindow from "@/components/ui/defaults/modal-window";
import {getTransactionsService} from "@/services/providers/service-providers";
import React, {useState} from "react";
import {Transaction} from "@/types/transaction";

interface CreateTransactionProps{
  isLoading: boolean;
  bookId: string
  onCreated?: (transaction: Transaction) => void;
}

interface CreateTransactionModel {
  nameIdentifier: string;
  description: string;
  value: number;
  transactionTime: string
}

function defaultTransactionModel() : CreateTransactionModel {
  return {
    nameIdentifier: "",
    description: "",
    value: 0,
    transactionTime: "",
  };
}

export default function CreateTransaction(props: CreateTransactionProps) {
  const transactionsService = getTransactionsService();

  const [createTransactionModel, setCreateTransactionModel] = useState<CreateTransactionModel>(defaultTransactionModel());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreateTransactionModel(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleCreateTransaction = () => {
   { // @ts-ignore
      transactionsService.create({...createTransactionModel, bookId: props.bookId} as Transaction)
            .then(t => {
              setCreateTransactionModel(defaultTransactionModel());
              if (props.onCreated) {
                props.onCreated(t);
              }
            })
            .catch(_ => console.error(_));
    }
  }
  
  return (
    <>
      <button className={"btn btn-success d-block w-100 rounded-5" + (props.isLoading ? " disabled" : "")} data-bs-toggle="modal" data-bs-target="#createTransactionModal">
        Create new transaction
      </button>

      <ModalWindow id="createTransactionModal" title="Create new book"
                   buttons={
                     <>
                       <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {setCreateTransactionModel(defaultTransactionModel())}}>Cancel</button>
                       <button className="btn btn-success" data-bs-dismiss="modal" onClick={handleCreateTransaction}>Create</button>
                     </>
                   }>
        <div>
          <div className="mb-3">
            <FormField label="Name Identifier: " name="nameIdentifier" value={createTransactionModel.nameIdentifier} onChange={handleInputChange}/>
          </div>

          <div className="mb-3">
            <FormArea label="Description: " name="description" value={createTransactionModel.description} cols={2} onChange={handleInputChange}/>
          </div>

          <div className="mb-3">
            <FormField label="Value: " type="number" name="value" value={createTransactionModel.value.toString()} onChange={handleInputChange}/>
          </div>
          
          <div className="mb-3">
            <FormField label="Transaction Time: " type="datetime-local" name="transactionTime" value={createTransactionModel.transactionTime} onChange={handleInputChange}/>
          </div>
        </div>
      </ModalWindow>
    </>
  );
}