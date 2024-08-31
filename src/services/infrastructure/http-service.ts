import {endpoints} from "@/config/enpoints";
import {IAuthService} from "@/services/infrastructure/auth-service";


export interface IHttpService {
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

export class HttpService implements IHttpService {
    constructor(private readonly authService: IAuthService) {
    }
    
    async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
        const response = await fetch(input, this.insertAuthorization(init));
        
        if (response.status === 401){
            await this.authService.refreshToken();
            
            return await fetch(input, this.insertAuthorization(init));
        }
        
        return response;
    }
    
    private insertAuthorization(init?: RequestInit) : RequestInit | undefined {
        const authHeader = this.authService.authorizeHeader;
        if (authHeader){
            if (init){
                if (init.headers){
                    init.headers = {
                        ...init.headers,
                        "Authorization": authHeader,
                    };
                }
                else{
                    init.headers = {
                        "Authorization": this.authService.authorizeHeader,
                    };
                }

            }
            else{
                init = {headers: {
                        "Authorization": this.authService.authorizeHeader,
                    }};
            }
        }
        return init;
    }
}