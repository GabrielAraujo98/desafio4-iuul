import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ListaDeMoedasComponent } from "../lista-de-moedas/lista-de-moedas.component";
import { MoedasService } from '../../services/moedas/moedas.service';
import { ListaMoedas } from '../../interface/lista-moedas/lista-moedas';
import {MediaMatcher} from '@angular/cdk/layout';
import { TabelasMoedas } from '../../interface/tabelas-moedas/tabelas-moedas';


@Component({
  selector: 'app-conversor-monetario',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule, ListaDeMoedasComponent ],
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
      this.moedasService.definirTabela().subscribe(dados =>{
        this.listaMoedas = dados;
        this.moedas = Object.keys(this.listaMoedas.conversion_rates);
        console.log('deu certo');
      });
    }   
   }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public moedasService : MoedasService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  converterValores(e: any){
    e.stopPropagation();
    e.preventDefault();
    this.moedasService.resultadoDaConversao(this.base, this.alvo, this.valor);
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
