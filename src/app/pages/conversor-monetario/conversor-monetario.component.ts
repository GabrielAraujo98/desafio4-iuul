import { ChangeDetectorRef, Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ConversorMoedasService } from "../../services/conversor-moedas/conversor-moedas.service";
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ListaDeMoedasComponent } from "../lista-de-moedas/lista-de-moedas.component";
import { MoedasService } from '../../services/moedas/moedas.service';
import { ListaMoedas } from '../../interface/lista-moedas/lista-moedas';
import {MediaMatcher} from '@angular/cdk/layout';


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

   ngOnInit() {
    
    this.moedasService.definirTabela();
    
   }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public conversorMoedasService: ConversorMoedasService, public moedasService : MoedasService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  converterValores(e: any){
    e.stopPropagation();
    e.preventDefault();
    this.conversorMoedasService.resultadoDaConversao(this.base, this.alvo, this.valor);
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
