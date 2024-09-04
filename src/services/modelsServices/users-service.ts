import {User} from "@/types/user";
import {IHttpService} from "@/services/infrastructure/http-service";
import {endpoints} from "@/config/enpoints";

export interface IUsersService{
  getAll() : Promise<User[]>;
  getById(userId: string) : Promise<User>;

  create(user : User) : Promise<User>;
  update(user : User) : Promise<User>;
  delete(userId: string) : Promise<User>;
}

export class UsersService implements IUsersService{
  constructor(private readonly httpService: IHttpService) {
  }
  
  create(user: User): Promise<User> {
    throw new Error();
  }

  delete(userId: string): Promise<User> {
    throw new Error();
  }

  getAll(): Promise<User[]> {
    return Promise.resolve([]);
  }

  async getById(userId: string): Promise<User> {
    const response = await this.httpService.fetch(endpoints.users.getById.url(userId), {
      method: endpoints.users.getById.method,
    });
    
    if (response.ok){
      return response.json();
    }
    
    throw new Error(response.statusText);
  }

  update(user: User): Promise<User> {
    throw new Error();
  }
}