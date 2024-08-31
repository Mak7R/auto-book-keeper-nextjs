

export interface ILogger{
    log(message?: any, ...optionalParams: any[]): void;
}

export class ConsoleLoggerService implements ILogger{
    log(message?: any, ...optionalParams: any[]): void {
        console.log(message, optionalParams);
    }
}