import { Injectable } from '@angular/core';
import { MoedasConversao } from '../../interface/moedas-conversao/moedas-conversao';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() { 
    this.storage = window.localStorage;
  }

  set(chave: string, valor: MoedasConversao): boolean {
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
