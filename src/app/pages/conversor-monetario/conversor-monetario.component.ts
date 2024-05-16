import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ListaDeMoedasComponent } from "../lista-de-moedas/lista-de-moedas.component";
import { MoedasService } from '../../services/moedas/moedas.service';
import { ListaMoedas } from '../../interface/lista-moedas/lista-moedas';
import { MediaMatcher } from '@angular/cdk/layout';
import { StorageService } from "../../services/storage/storage.service";
import { CommonModule } from '@angular/common';
import { HistoricoConversao } from "../../interface/historico-conversao/historico-conversao";

@Component({
  selector: 'app-conversor-monetario',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule, ListaDeMoedasComponent, CommonModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './conversor-monetario.component.html',
  styleUrl: './conversor-monetario.component.css'
})
export class ConversorMonetarioComponent implements OnInit{

  public base: string;
  public alvo: string;
  public valor: number;
  public listaMoedas : ListaMoedas;
  moedas: string[] = [];

   ngOnInit() {

    if(this.moedas[0] === "USD"){
      console.log(this.moedas);
    }else{
      this.moedasService.getListaMoedas().subscribe(dados =>{
        this.listaMoedas = dados;
        this.moedas = Object.keys(this.listaMoedas.conversion_rates);
        console.log('deu certo');
      });
    }   
   }

  mobileQuery: MediaQueryList;
  
  private _mobileQueryListener: () => void;

  constructor(public moedasService : MoedasService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public storage: StorageService) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  _historicoConversao : HistoricoConversao[] = [];
    
  converterValores(e: any){
    e.stopPropagation();
    e.preventDefault();
    this.moedasService.resultadoDaConversao(this.base, this.alvo, this.valor);
    var data: Date = new Date();
      setTimeout(() => {
        var historico = this.storage.get('Conversoes');
        if(historico){
          this._historicoConversao = historico;
          this.criarObjHistorico(this.base, this.alvo, this.moedasService.taxaConversao, this.moedasService.resultado, this.valor, data, data, 'Deletar');
        }else{
          this.criarObjHistorico(this.base, this.alvo, this.moedasService.taxaConversao, this.moedasService.resultado, this.valor, data, data, 'Deletar');
        }
        this.storage.set(`Conversoes`, this._historicoConversao);
    }, 1000)
    
    console.log(data);
  }
  
  ultimoId: number;

  ids : number[] = [0];

  criarObjHistorico(base: string, alvo: string, taxa: number, resultado: number, valor_informado: number, data: Date, hora: Date, acoes: string){

      this._historicoConversao.push({'base': base, 'alvo': alvo, 'taxa': taxa, 'resultado': resultado, 'valor_informado': valor_informado, 'data': data, 'hora': hora, 'acoes': acoes, 'id': this.storage.getNextId()})
      
  }
  
  atualizarBase(value : string){
    this.base = value;
  }

  atualizarAlvo(value: string){
    this.alvo = value;
  }

  atualizarValor(value: string){
    var valorComparar = parseInt(value);
    this.valor = valorComparar;
  }

}
