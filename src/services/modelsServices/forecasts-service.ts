import {IHttpService} from "@/services/infrastructure/http-service";
import {endpoints} from "@/config/enpoints";

export interface IForecastsService{
  forecast(bookId: string, date: Date) : Promise<Record<string, number>>;
}

export class ForecastsService implements IForecastsService{
  constructor(private readonly httpService: IHttpService) {
  }
  
  async forecast(bookId: string, date: Date) : Promise<Record<string, number>> {
    const response = await this.httpService.fetch(endpoints.forecasts.forecast.url(bookId) + `?endDate=${date.toISOString()}`, {
      method: endpoints.forecasts.forecast.method,
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