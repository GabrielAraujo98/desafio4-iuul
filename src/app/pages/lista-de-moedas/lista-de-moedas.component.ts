import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MoedasService } from "../../services/moedas/moedas.service";
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-lista-de-moedas',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule],
  templateUrl: './lista-de-moedas.component.html',
  styleUrl: './lista-de-moedas.component.css'
})
export class ListaDeMoedasComponent{

    moedas : Observable<Object>;

    constructor(private moedasService: MoedasService){
      //var servico = new MoedasService();
      this.moedas = this.moedasService.getListaMoedas();
    }

    listarMoedas(){
      this.moedas.subscribe(resultado => console.log(resultado));
      
    }
}
