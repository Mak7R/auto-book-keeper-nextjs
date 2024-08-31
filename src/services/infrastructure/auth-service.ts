import {endpoints} from "@/config/enpoints";
import {AuthResponse} from "@/types/auth-response";
import {ProblemResponse} from "@/types/problem-response";
import {RegisterResponse} from "@/types/register-response";
import {IStorageService} from "@/services/infrastructure/local-storage-service";
import {ILogger} from "@/services/infrastructure/logger-service";

export interface IAuthService {
    login(userName: string, password: string) : Promise<ProblemResponse | null>;
    register(userName: string, email: string, password: string) : Promise<ProblemResponse | null>;

    refreshToken() : Promise<boolean>;
    
    logout() : Promise<any>;
    
    get currentUser() : User | null
    get userId() : string | null;
    get authorizeHeader(): string | null;
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

            this.storage.setItem('userId', authResponse.userId);
            this.storage.setItem('accessToken', authResponse.accessToken);
            this.storage.setItem('refreshToken', authResponse.refreshToken);

            await this.fetchUser();

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
            // todo map register response to user
            this.storage.setItem('user', registerResponse);
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
        this.storage.removeItem('user');
        this.storage.removeItem('userId');
        this.storage.removeItem('accessToken');
        this.storage.removeItem('refreshToken');
        return Promise.resolve();
    }
    
    get currentUser() : User | null{
        return this.storage.getItem('user')
    }
    
    get userId() : string | null{
        return this.storage.getItem('userId');
    }
    
    get authorizeHeader(): string | null {
        const accessToken = this.storage.getItem('accessToken');
        if (accessToken){
            return 'Bearer ' + accessToken;
        }
        return null;
    }

    async refreshToken() : Promise<boolean> {
        const userId = this.storage.getItem('userId');
        const refreshToken = this.storage.getItem('refreshToken');
        
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
            this.storage.setItem('accessToken', authResponse.accessToken);
            this.storage.setItem('refreshToken', authResponse.refreshToken);
            return true;
        } else {
            return false;
        }
    }
    
    private async fetchUser() : Promise<void> {        
        const __fetchUser = async (userId: string, authHeader: string) : Promise<boolean> => {
            const response = await fetch(endpoints.users.getUser.url(userId), {
                method: endpoints.users.getUser.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader,
                },
            });

            if (response.ok){
                const user = await response.json();
                this.storage.setItem('user', user);
                return true;
            }
            
            return false;
        }
        
        const userId = this.storage.getItem<string>('userId');
        if (!userId) return;

        const authHeader = this.authorizeHeader;
        if (!authHeader) return;
        
        await __fetchUser(userId, authHeader);
        
        await this.refreshToken();
        
        await __fetchUser(userId, authHeader);
    }
}