import {IHttpService} from "@/services/infrastructure/http-service";
import {endpoints} from "@/config/enpoints";


export interface ICalculationsService{
  sum(bookId: string) : Promise<number>;
  balance(bookId: string) : Promise<number>;
  balanceByDate(bookId: string) : Promise<Record<string, number>>;
  average(bookId: string) : Promise<number>;
  maxTransaction(bookId: string) : Promise<number>;
  minTransaction(bookId: string) : Promise<number>;
  volatility(bookId: string) : Promise<number>;
}

export class CalculationsService implements ICalculationsService{
  constructor(private readonly httpService: IHttpService) {
  }

  async sum(bookId: string): Promise<number> {
    const response = await this.httpService.fetch(endpoints.calculations.sum.url(bookId), {
      method: endpoints.calculations.sum.method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
  async balance(bookId: string): Promise<number> {
    const response = await this.httpService.fetch(endpoints.calculations.balance.url(bookId), {
      method: endpoints.calculations.balance.method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
  
  async balanceByDate(bookId: string) : Promise<Record<string, number>>{
    const response = await this.httpService.fetch(endpoints.calculations.balanceByDate.url(bookId), {
      method: endpoints.calculations.balanceByDate.method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
  
  async average(bookId: string): Promise<number> {
    const response = await this.httpService.fetch(endpoints.calculations.average.url(bookId), {
      method: endpoints.calculations.average.method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
  async maxTransaction(bookId: string): Promise<number> {
    const response = await this.httpService.fetch(endpoints.calculations.max.url(bookId), {
      method: endpoints.calculations.max.method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
  async minTransaction(bookId: string): Promise<number> {
    const response = await this.httpService.fetch(endpoints.calculations.min.url(bookId), {
      method: endpoints.calculations.min.method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
  async volatility(bookId: string): Promise<number> {
    const response = await this.httpService.fetch(endpoints.calculations.volatility.url(bookId), {
      method: endpoints.calculations.volatility.method,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    if (response.ok){
      return response.json();
    }

    throw new Error(response.statusText);
  }
}