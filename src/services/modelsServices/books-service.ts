import {IAuthService} from "@/services/infrastructure/auth-service";
import {IHttpService} from "@/services/infrastructure/http-service";
import {endpoints} from "@/config/enpoints";
import {Book} from "@/types/book";

export type CreateBookModel = Omit<Book, "id" | "ownerId" | "creationTime">
export type UpdateBookModel = Omit<Book, "ownerId" | "creationTime">

export interface IBooksService{
    getAll() : Promise<Book[]>;
    getById(bookId: string) : Promise<Book>;
    
    create(book : CreateBookModel) : Promise<Book>;
    update(book : UpdateBookModel) : Promise<Book>;
    delete(bookId: string) : Promise<Book>;
}

export class BookService implements IBooksService{
    constructor(private readonly authService: IAuthService, 
                private readonly httpService: IHttpService) {
    }
    
    private getUserId(){
        const userId = this.authService.userId;

        if (!userId){
            throw new Error('User unauthorized');
        }
        return userId;
    }
    
    async create(book: CreateBookModel): Promise<Book> {
        const userId = this.getUserId();
        
        const response = await this.httpService.fetch(endpoints.books.create.url(userId), {
            method: endpoints.books.create.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book),
        })
        
        if (response.ok){
            return response.json();
        }

        throw new Error(response.statusText);
    }

    async delete(bookId: string): Promise<Book> {
        const response = await this.httpService.fetch(endpoints.books.delete.url(bookId), {
            method: endpoints.books.delete.method,
        })

        if (response.ok){
            return response.json();
        }

        throw new Error(response.statusText);
    }

    async getAll(): Promise<Book[]> {
        const userId = this.getUserId();
        
        const response = await this.httpService.fetch(endpoints.books.getAll.url(userId), {
            method: endpoints.books.getAll.method,
        })
        
        if (response.ok){
            return response.json();
        }
        
        throw new Error(response.statusText);
    }

    async getById(bookId: string): Promise<Book> {
        const response = await this.httpService.fetch(endpoints.books.getById.url(bookId), {
            method: endpoints.books.getById.method,
        })
        
        if (response.ok){
            return response.json();
        }

        throw new Error(response.statusText);
    }

    async update(book: UpdateBookModel): Promise<Book> {
        const response = await this.httpService.fetch(endpoints.books.update.url(book.id), {
            method: endpoints.books.update.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        })

        if (response.ok){
            return response.json();
        }

        throw new Error(response.statusText);
    }
}