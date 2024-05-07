import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversorMoedasService {

  private _apiKey : string = 'be5308aec962e3f128a1e1b0';
  private _apiURL : string = 'https://v6.exchangerate-api.com/v6';
  
  constructor(private _http: HttpClient){}
  
  get apiURL(){
    return this._apiURL;
  }

  get apiKey(){
    return this._apiKey;
  } 
  
  get http(){
    return this._http;
  }


  getConversaoMoedas(base: string, alvo: string, quantidade: number){
    console.log(base, alvo);
    return this.http.get(`${this.apiURL}/${this.apiKey}/pair/${base}/${alvo}/${quantidade}`)
  }

}
