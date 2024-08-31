import {IAuthService} from "@/services/infrastructure/auth-service";
import {IHttpService} from "@/services/infrastructure/http-service";
import {endpoints} from "@/config/enpoints";



export interface IBooksService{
    getAll() : Promise<Book[]>;
    getById(bookId: string) : Promise<Book>;
    
    create(book : Book) : Promise<Book>;
    update(book : Book) : Promise<Book>;
    delete(bookId: string) : Promise<Book>;
}

export class BookService implements IBooksService{
    constructor(private readonly authService: IAuthService, 
                private readonly httpService: IHttpService) {
    }
    
    create(book: Book): Promise<Book> {
        throw new Error()
    }

    delete(bookId: string): Promise<Book> {
        throw new Error()
    }

    async getAll(): Promise<Book[]> {
        const userId = this.authService.userId;
        
        if (!userId){
            throw new Error('User unauthorized');  
        }
        
        const response = await this.httpService.fetch(endpoints.books.getBooks.url(userId), {
            method: endpoints.books.getBooks.method,
        })
        
        if (response.ok){
            return response.json();
        }
        
        throw new Error(response.statusText);
    }

    getById(bookId: string): Promise<Book> {
        throw new Error()
    }

    update(book: Book): Promise<Book> {
        throw new Error()
    }
    
}