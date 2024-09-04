import {endpoints} from "@/config/enpoints";
import {IHttpService} from "@/services/infrastructure/http-service";
import {Transaction} from "@/types/transaction";


export interface ITransactionsService{
  getAll(bookId: string) : Promise<Transaction[]>;
  getById(transactionId: string) : Promise<Transaction>;

  create(transaction : Transaction) : Promise<Transaction>;
  update(transaction : Transaction) : Promise<Transaction>;
  delete(transactionId: string) : Promise<Transaction>;
}

export class TransactionsService implements ITransactionsService{
  constructor(private readonly httpService: IHttpService) {
  }
  
  async create(transaction: Transaction): Promise<Transaction> {
    const createTransactionModel = transaction.transactionTime === "" ?
      {...transaction, transactionTime: null} : 
      {...transaction, transactionTime: new Date(transaction.transactionTime)};
    
    const response = await this.httpService.fetch(endpoints.transactions.create.url(transaction.bookId), {
      method: endpoints.transactions.create.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createTransactionModel),
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }

  async delete(transactionId: string): Promise<Transaction> {
    const response = await this.httpService.fetch(endpoints.transactions.delete.url(transactionId), {
      method: endpoints.transactions.delete.method,
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }

  async getAll(bookId: string): Promise<Transaction[]> {
    const response = await this.httpService.fetch(endpoints.transactions.getAll.url(bookId), {
      method: endpoints.transactions.getAll.method,
    });

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }

  async getById(transactionId: string): Promise<Transaction> {
    const response = await this.httpService.fetch(endpoints.transactions.getById.url(transactionId), {
      method: endpoints.transactions.getById.method,
    });

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }

  async update(transaction: Transaction): Promise<Transaction> {
    const updateTransactionModel = transaction.transactionTime === "" ?
      {...transaction, transactionTime: null} :
      {...transaction, transactionTime: new Date(transaction.transactionTime)};

    const response = await this.httpService.fetch(endpoints.transactions.update.url(transaction.id), {
      method: endpoints.transactions.update.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTransactionModel),
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
}