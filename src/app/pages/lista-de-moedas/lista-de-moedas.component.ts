import { ListaMoedas } from './../../interface/lista-moedas/lista-moedas';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MoedasService } from "../../services/moedas/moedas.service";
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table'


@Component({
  selector: 'app-lista-de-moedas',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatTableModule],
  templateUrl: './lista-de-moedas.component.html',
  styleUrl: './lista-de-moedas.component.css'
})
export class ListaDeMoedasComponent implements OnInit{

    moedas: any[] = [];
    
    ngOnInit() {
      this.moedasService.getListaMoedas().subscribe(dados =>{
        console.log(dados);
        this._listaMoedas.conversion_rates = dados.conversion_rates;
        // this.moedas.push(dados.conversion_rates)
        // console.log(this.moedas);
        this.listarMoedas();
      });
      
    }
    
    private _listaMoedas : ListaMoedas = {
      "result": "success",
      "documentation": "https://www.exchangerate-api.com/docs",
      "terms_of_use": "https://www.exchangerate-api.com/terms",
      "time_last_update_unix": 1714608001,
      "time_last_update_utc": "Thu, 02 May 2024 00:00:01 +0000",
      "base_code": "USD",
      "conversion_rates": {}
    };

    
    constructor(private moedasService: MoedasService){}
    

    get listaMoedas(){
      return this._listaMoedas;
    }

    listarMoedas(){
      var stringDaLista = JSON.stringify(this._listaMoedas.conversion_rates);
      var listaLimpa = this.filtrarLetras(stringDaLista, [`"`, `{`, `}`]);
      var listaBruta = listaLimpa.split(",");
      var arrayDeMoedas = [];
      for(var i = 0; i < listaBruta.length; i++){
        arrayDeMoedas.push(listaBruta[i].split(':'))
      }
      this.moedas = arrayDeMoedas
      console.log(this.moedas);
    }

    filtrarLetras(str: string, letrasRemover: any){
      letrasRemover.forEach((letra : any) => {
        str = str.replaceAll(letra, '')
      });
      return str;
    }
    
}
