import {HttpService, IHttpService} from "@/services/infrastructure/http-service";
import {AuthService, IAuthService} from "@/services/infrastructure/auth-service";
import {IStorageService, LocalStorageService} from "@/services/infrastructure/local-storage-service";
import {ConsoleLoggerService, ILogger} from "@/services/infrastructure/logger-service";
import {BookService, IBooksService} from "@/services/modelsServices/books-service";
import {ITransactionsService, TransactionsService} from "@/services/modelsServices/transactions-service";
import {IUsersService, UsersService} from "@/services/modelsServices/users-service";



const storageServiceSingleton: IStorageService = new LocalStorageService();
export function getStorageService(){
    return storageServiceSingleton;
}

const loggerServiceSingleton: ILogger = new ConsoleLoggerService();
export function getLoggerService(){
    return loggerServiceSingleton;
}


const authServiceSingleton : IAuthService = new AuthService(getStorageService(), getLoggerService());
export function getAuthService(){
    return authServiceSingleton;
}


const httpServiceSingleton : IHttpService = new HttpService(getAuthService());
export function getHttpService(){
    return httpServiceSingleton;
}

const usersService : IUsersService = new UsersService(getHttpService());
export function getUsersService() : IUsersService{
    return usersService;
}

const booksService : IBooksService = new BookService(getAuthService(), getHttpService());
export function getBooksService() : IBooksService {
    return booksService;
}

const transactionsService : ITransactionsService = new TransactionsService(getHttpService());
export function getTransactionsService() : ITransactionsService {
    return transactionsService;
}