import {endpoints} from "@/config/enpoints";
import {AuthResponse} from "@/types/auth-response";
import {ProblemResponse} from "@/types/problem-response";
import {RegisterResponse} from "@/types/register-response";
import {IStorageService} from "@/services/infrastructure/local-storage-service";
import {ILogger} from "@/services/infrastructure/logger-service";

export interface IAuthService {
    login(userName: string, password: string) : Promise<ProblemResponse | null>;
    register(userName: string, email: string, password: string) : Promise<ProblemResponse | null>;
    logout() : Promise<void>;
    refreshToken() : Promise<boolean>;
    
    get userId() : string | null;
    get authorizationHeader(): string | null;
}

const localStorageNames = {
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
}

export class AuthService implements IAuthService {
    
    constructor(private readonly storage: IStorageService,
                private readonly logger: ILogger) {
    }
    
    async login(userName: string, password: string) : Promise<ProblemResponse | null> {
        const response = await fetch(endpoints.auth.login.url,{
            method: endpoints.auth.login.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password }),
        });

        if (response.ok) {
            const authResponse : AuthResponse = await response.json();

            this.storage.setItem(localStorageNames.userId, authResponse.userId);
            this.storage.setItem(localStorageNames.accessToken, authResponse.accessToken);
            this.storage.setItem(localStorageNames.refreshToken, authResponse.refreshToken);

            return null;
        }
        
        if (response.status === 400){
            const problem : ProblemResponse = await response.json();
            problem.status = response.status;
            return problem;
        }
        
        const problem = new ProblemResponse();
        problem.status = response.status;
        // todo set errors
        return problem;
    }

    async register(userName: string, email: string, password: string) : Promise<ProblemResponse | null> {
        const response = await fetch(endpoints.auth.register.url,{
            method: endpoints.auth.register.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, email, password }),
        });
        
        if (response.ok) {
            const registerResponse : RegisterResponse = await response.json();
            // todo register logic
            await this.login(userName, password);
            return null;
        }
        
        if (response.status === 400){
            const problem : ProblemResponse = await response.json();
            problem.status = response.status;
            return problem;
        }
        
        const problem = new ProblemResponse();
        problem.status = response.status;
        // todo set errors
        return problem;
    }
    
    logout(): Promise<void> {
        this.storage.removeItem(localStorageNames.userId);
        this.storage.removeItem(localStorageNames.accessToken);
        this.storage.removeItem(localStorageNames.refreshToken);
        return Promise.resolve();
    }
    
    get userId() : string | null{
        return this.storage.getItem(localStorageNames.userId);
    }
    
    get authorizationHeader(): string | null{
        const accessToken = this.storage.getItem(localStorageNames.accessToken);
        if (accessToken){
            return 'Bearer ' + accessToken;
        }
        return null;
    }
    
    async refreshToken() : Promise<boolean> {
        const userId = this.storage.getItem(localStorageNames.userId);
        const refreshToken = this.storage.getItem(localStorageNames.refreshToken);
        
        if (!userId || !refreshToken)
            return false;
        
        const response = await fetch(endpoints.auth.refreshToken.url, {
            method: endpoints.auth.refreshToken.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, refreshToken }),
        });
        
        const authResponse : AuthResponse | any = await response.json();
        if (response.ok) {
            console.info("Auth tokens was successfully refreshed");
            this.storage.setItem(localStorageNames.accessToken, authResponse.accessToken);
            this.storage.setItem(localStorageNames.refreshToken, authResponse.refreshToken);
            return true;
        } else {
            await this.logout();
            return false;
        }
    }
}