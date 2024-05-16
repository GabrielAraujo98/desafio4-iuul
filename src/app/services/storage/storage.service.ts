import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() { 
    const win: any = typeof window === 'undefined' ? {} : window;
    this.storage = win.localStorage;
  }

  getNextId(): number{
    const currentId = this.get('currentId');
    if(currentId === null){
      this.set('currentId', 0);
      return 0;
    }
    this.set('currentId', currentId+1);
    return currentId+1
  }

  set(chave: string, valor: any): boolean {
    if(this.storage){
      this.storage.setItem(chave, JSON.stringify(valor));
      return true;
    }
    return false;
  }

  get(chave: string): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(chave)!);
    }
    return null;
  }

  remove(chave: string): boolean {
    if (this.storage) {
      this.storage.removeItem(chave);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

}
