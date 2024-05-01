import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MoedasService {
  
  private _apiKey : string = 'be5308aec962e3f128a1e1b0';
  private _apiURL : string = 'https://v6.exchangerate-api.com/v6';
  // private _http : any;
  
  constructor(private http: HttpClient){
    this.http;
  }
  
  get apiURL(){
    return this._apiURL;
  }

  get apiKey(){
    return this._apiKey;
  } 
  
  get _http(){
    return this.http;
  }

  getListaMoedas(){
    return this.http.get(`${this._apiURL}/${this._apiKey}/latest/USD`)
  }
}
