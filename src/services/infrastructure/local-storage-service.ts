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
    }
  }
    
  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      return null;
    }
  }
  
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
    }
  }
  
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
    }
  }
  
  key(index: number): string | null {
    try {
      return localStorage.key(index);
    } catch (error) {
      return null;
    }
  }
  
  length(): number {
    try {
      return localStorage.length;
    } catch (error) {
      return 0;
    }
  }
}