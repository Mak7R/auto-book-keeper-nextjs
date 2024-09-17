import FormArea from "@/components/ui/form/FormArea"
import FormField from "@/components/ui/form/FormField";
import ModalWindow from "@/components/ui/defaults/modal-window";
import {getTransactionsService} from "@/services/providers/service-providers";
import React, {useState} from "react";
import {Transaction} from "@/types/transaction";
import {CreateTransactionModel} from "@/services/modelsServices/transactions-service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {config} from "@/config/config";

interface CreateTransactionProps{
  isLoading: boolean;
  bookId: string
}

function defaultTransactionModel(bookId: string) : CreateTransactionModel {
  return {
    bookId: bookId,
    nameIdentifier: "",
    description: "",
    value: 0,
    transactionTime: "",
  };
}

export default function CreateTransaction(props: CreateTransactionProps) {

  const [createTransactionModel, setCreateTransactionModel] = useState<CreateTransactionModel>(defaultTransactionModel(props.bookId));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreateTransactionModel(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const queryClient = useQueryClient();
  const {mutate, isPending} = useMutation({
    mutationKey: config.reactQueryKeys.transactions.create(),
    mutationFn: async (newTransaction: CreateTransactionModel) => getTransactionsService().create(newTransaction),
    onSuccess: async () => {
      setCreateTransactionModel(defaultTransactionModel(props.bookId))
      await queryClient.invalidateQueries({queryKey: config.reactQueryKeys.transactions.all(props.bookId)})
    }
  })
  
  return (
    <>
      <button className={"btn btn-success d-block w-100 rounded-5" + (props.isLoading ? " disabled" : "")} data-bs-toggle="modal" data-bs-target="#createTransactionModal">
        Create new transaction
      </button>

      <ModalWindow id="createTransactionModal" title="Create new book"
                   buttons={
                     <>
                       <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {setCreateTransactionModel(defaultTransactionModel(props.bookId))}}>Cancel</button>
                       <button className="btn btn-success" data-bs-dismiss="modal" onClick={() => mutate(createTransactionModel)} disabled={isPending}>Create</button>
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