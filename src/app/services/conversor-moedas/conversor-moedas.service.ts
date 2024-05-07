import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoedasConversao } from "../../interface/moedas-conversao/moedas-conversao";

@Injectable({
  providedIn: 'root'
})
export class ConversorMoedasService {

  private _apiKey : string = 'be5308aec962e3f128a1e1b0';
  private _apiURL : string = 'https://v6.exchangerate-api.com/v6';
  private _moedaBase: string = "";
  private _moedaAlvo: string = "";
  private _valorParaConverter: number = 0;
  private _resultado: number = 0;
  
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

  get moedaBase(){
    return this._moedaBase;
  }

  get moedaAlvo(){
    return this._moedaAlvo
  }

  get valorParaConverter(){
    return this._valorParaConverter;
  }

  get resultado(){
    return this._resultado;
  }


  getConversaoMoedas(base: string, alvo: string, quantidade: number){
    this._moedaBase = base;
    this._moedaAlvo = alvo;
    this._valorParaConverter = quantidade;
    return this.http.get<MoedasConversao>(`${this.apiURL}/${this.apiKey}/pair/${base}/${alvo}/${quantidade}`)
  }

  resultadoDaConversao(base: string, alvo: string, quantidade: number){
    this.getConversaoMoedas(base, alvo, quantidade).subscribe(dados => {
      this._resultado = dados.conversion_result;
      console.log(this._resultado)
    })
  }

}
