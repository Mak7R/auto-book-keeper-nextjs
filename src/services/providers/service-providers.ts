import {HttpService, IHttpService} from "@/services/infrastructure/http-service";
import {AuthService, IAuthService} from "@/services/infrastructure/auth-service";
import {IStorageService, LocalStorageService} from "@/services/infrastructure/local-storage-service";
import {ConsoleLoggerService, ILogger} from "@/services/infrastructure/logger-service";
import {BookService} from "@/services/modelsServices/books-service";



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


export function getBooksService(){
    return new BookService(getAuthService(), getHttpService());
}