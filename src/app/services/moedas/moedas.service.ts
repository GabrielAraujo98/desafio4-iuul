import { ListaMoedas } from './../../interface/lista-moedas/lista-moedas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TabelasMoedas } from '../../interface/tabelas-moedas/tabelas-moedas';

@Injectable({
  providedIn: 'root'
})

export class MoedasService{
  
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

  getListaMoedas(){
    return this.http.get<ListaMoedas>(`${this._apiURL}/${this._apiKey}/latest/USD`)
  }

    private _moedas: string[] = [];
    private _valor: number[] = [];
    private _tabelaMoedas: TabelasMoedas[] = [];
    
    private _listaMoedas : ListaMoedas = {
      "result": "success",
      "documentation": "https://www.exchangerate-api.com/docs",
      "terms_of_use": "https://www.exchangerate-api.com/terms",
      "time_last_update_unix": 1714608001,
      "time_last_update_utc": "Thu, 02 May 2024 00:00:01 +0000",
      "base_code": "USD",
      "conversion_rates": {}
    };

    displayedColumns: string[] = ['moeda', 'valor'];
    
    get listaMoedas(){
      return this._listaMoedas;
    }

    get tabelaMoedas(){
      return this._tabelaMoedas;
    }

    get moedas(){
      return this._moedas;
    }

    get valor(){
      return this._valor;
    }
    
    definirTabela() {
      
      this.getListaMoedas().subscribe(dados =>{
        this._listaMoedas.conversion_rates = dados.conversion_rates;

        this._moedas = Object.keys(this._listaMoedas.conversion_rates);
        this._valor = Object.values(this._listaMoedas.conversion_rates);
  
        this.criarObjetoDaTabela(this._moedas, this._valor);
        console.log("oi, Tudo bem?");
      });

      
    }

    criarObjetoDaTabela(chave: string[], valor: number[]){
      for(var m = 0; m < this._moedas.length; m++){
        this._tabelaMoedas.push({"moeda": chave[m], "valor": valor[m]});
      }
    }
}
