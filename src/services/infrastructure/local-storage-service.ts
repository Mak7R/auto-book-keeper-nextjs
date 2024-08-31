export interface IStorageService {
    setItem<T>(key: string, value: T): void;
    getItem<T>(key: string): T | null;
    removeItem(key: string): void;
    clear(): void;
    key(index: number): string | null;
    length(): number;
}

export class LocalStorageService implements IStorageService {
    setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting item in localStorage: ${error}`);
        }
    }

    getItem<T>(key: string): T | null {
        try {
            const serializedValue = localStorage.getItem(key);
            return serializedValue ? JSON.parse(serializedValue) : null;
        } catch (error) {
            console.error(`Error getting item from localStorage: ${error}`);
            return null;
        }
    }

    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from localStorage: ${error}`);
        }
    }

    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error(`Error clearing localStorage: ${error}`);
        }
    }

    key(index: number): string | null {
        try {
            return localStorage.key(index);
        } catch (error) {
            console.error(`Error getting key from localStorage: ${error}`);
            return null;
        }
    }

    length(): number {
        try {
            return localStorage.length;
        } catch (error) {
            console.error(`Error getting length of localStorage: ${error}`);
            return 0;
        }
    }
}