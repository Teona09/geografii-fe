import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../../enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem<T>(localStorageKey: LocalStorageKey): T {
    const item = localStorage.getItem(localStorageKey);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (err) {
        this.setItem({} as T, localStorageKey);
        return {} as T;
      }
    }
    return {} as T;
  }

  setItem<T>(item: T, localStorageKey: LocalStorageKey): void {
    localStorage.setItem(localStorageKey, JSON.stringify(item));
  }
}
