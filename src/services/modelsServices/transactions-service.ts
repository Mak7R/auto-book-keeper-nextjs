import {IBooksService} from "@/services/modelsServices/books-service";
import {endpoints} from "@/config/enpoints";
import {IAuthService} from "@/services/infrastructure/auth-service";
import {IHttpService} from "@/services/infrastructure/http-service";


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
  
  create(transaction: Transaction): Promise<Transaction> {
    throw new Error()
  }

  delete(transactionId: string): Promise<Transaction> {
    throw new Error()
  }

  async getAll(bookId: string): Promise<Transaction[]> {
    const response = await this.httpService.fetch(endpoints.transactions.getTransactions.url(bookId), {
      method: endpoints.transactions.getTransactions.method,
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }

  getById(transactionId: string): Promise<Transaction> {
    throw new Error()
  }

  update(transaction: Transaction): Promise<Transaction> {
    throw new Error()
  }
  
}