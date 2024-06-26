import { ListaMoedas } from './../../interface/lista-moedas/lista-moedas';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TabelasMoedas } from '../../interface/tabelas-moedas/tabelas-moedas';
import { Observable } from 'rxjs';
import { MoedasConversao } from "../../interface/moedas-conversao/moedas-conversao";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class MoedasService{
  [x: string]: any;
  
  constructor(private _http: HttpClient){}

  get http(){
    return this._http;
  }

  getListaMoedas() : Observable<ListaMoedas>{
    return this.http.get<ListaMoedas>(`${environment.url}/${environment.apiKey}/codes`)
  }

    private _moedas: string[] = [];
    private _valor: number[] = [];
    private _tabelaMoedas: TabelasMoedas[] = [];
    
    private _listaMoedas : ListaMoedas = {
      "result": "success",
      "documentation": "https://www.exchangerate-api.com/docs",
      "terms_of_use": "https://www.exchangerate-api.com/terms",
      "supported_codes": []
    };

    displayedColumns: string[] = ['codigo', 'moeda'];
    
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

    set listaMoedas(value : ListaMoedas){
      this._listaMoedas = value;
    }

  //Serviço de Conversão
  private _moedaBase: string = "";
  private _moedaAlvo: string = "";
  private _valorParaConverter: number = 0;
  private _resultado: number = 0;
  private _requisicao: MoedasConversao;
  private _taxaConversao: number;

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

  get requisicao(){
    return this._requisicao;
  }

  get taxaConversao(){
    return this._taxaConversao;
  }

  getConversaoMoedas(base: string, alvo: string, quantidade: number): Observable<MoedasConversao>{
    this._moedaBase = base;
    this._moedaAlvo = alvo;
    this._valorParaConverter = quantidade;
    
    return this.http.get<MoedasConversao>(`${environment.url}/${environment.apiKey}/pair/${base}/${alvo}/${quantidade}`)
  }

  resultadoDaConversao(base: string, alvo: string, quantidade: number){
    this.getConversaoMoedas(base, alvo, quantidade).subscribe(dados => {
      this._resultado = dados.conversion_result;
      this._requisicao = dados;
      this._taxaConversao = this.requisicao.conversion_rate;
      console.log(this._resultado)
    })
  }
}
