import { Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ConversorMoedasService } from "../../services/conversor-moedas/conversor-moedas.service";
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { ListaDeMoedasComponent } from "../lista-de-moedas/lista-de-moedas.component";
import { MoedasService } from '../../services/moedas/moedas.service';
import { ListaMoedas } from '../../interface/lista-moedas/lista-moedas';


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

  constructor(public conversorMoedasService: ConversorMoedasService, public moedasService : MoedasService){}

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
