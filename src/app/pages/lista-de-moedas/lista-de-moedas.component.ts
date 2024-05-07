import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MoedasService } from "../../services/moedas/moedas.service";
import { TabelasMoedas } from './../../interface/tabelas-moedas/tabelas-moedas';
import { ListaMoedas } from './../../interface/lista-moedas/lista-moedas';


@Component({
  selector: 'app-lista-de-moedas',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatTableModule, MatPaginator, MatPaginatorModule],
  templateUrl: './lista-de-moedas.component.html',
  styleUrl: './lista-de-moedas.component.css'
})
export class ListaDeMoedasComponent implements OnInit, AfterViewInit{

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
    dataSource: MatTableDataSource<TabelasMoedas, MatPaginator>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    ngAfterViewInit() {
      setTimeout(() => {this.dataSource.paginator = this.paginator}, 1000);
      console.log("oi");
    }
    
    get listaMoedas(){
      return this._listaMoedas;
    }

    get tabelaMoedas(){
      return this._tabelaMoedas;
    }
    
    ngOnInit() {
      
      this.moedasService.getListaMoedas().subscribe(dados =>{
        this._listaMoedas.conversion_rates = dados.conversion_rates;
        
        this.dataSource = new MatTableDataSource<TabelasMoedas>(this._tabelaMoedas);
        

        this._moedas = Object.keys(this._listaMoedas.conversion_rates);
        this._valor = Object.values(this._listaMoedas.conversion_rates);
  
        this.criarObjetoDaTabela(this._moedas, this._valor);
        console.log("oi, Tudo bem?");
      });

      
    }
    
    constructor(private moedasService: MoedasService){}
    
    criarObjetoDaTabela(chave: string[], valor: number[]){
      for(var m = 0; m < this._moedas.length; m++){
        this._tabelaMoedas.push({"moeda": chave[m], "valor": valor[m]});
      }
    }
}
