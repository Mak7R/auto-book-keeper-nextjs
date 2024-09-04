
export class Transaction{
    id: string = ""
    bookId: string = ""
    nameIdentifier: string = ""
    description: string = ""
    transactionTime: string = new Date().toString();
    value: number = 0
}