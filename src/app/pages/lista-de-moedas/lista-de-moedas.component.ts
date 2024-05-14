import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MoedasService } from "../../services/moedas/moedas.service";
import { TabelasMoedas } from './../../interface/tabelas-moedas/tabelas-moedas';
import { ListaMoedas } from './../../interface/lista-moedas/lista-moedas';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-lista-de-moedas',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatTableModule, MatPaginator, MatPaginatorModule],
  templateUrl: './lista-de-moedas.component.html',
  styleUrl: './lista-de-moedas.component.css'
})
export class ListaDeMoedasComponent implements OnInit, AfterViewInit{
  
  private _listaMoedas: ListaMoedas;
  private _moedas: string[];
  private _rate: number[];
  private _tabelaMoedas: TabelasMoedas[] = [];

  get tabelaMoedas(){
    return this._tabelaMoedas;
  }
  get moedas(){
    return this._moedas
  }

  displayedColumns: string[] = ['moeda', 'valor'];
  dataSource: MatTableDataSource<TabelasMoedas, MatPaginator>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  ngOnInit() {
    
    this.moedasService.getListaMoedas().subscribe(dados =>{
      this._listaMoedas = dados;

      this._moedas = Object.keys(this._listaMoedas.conversion_rates);
      this._rate = Object.values(this._listaMoedas.conversion_rates);

      this.criarObjetoDaTabela(this._moedas, this._rate);
      this.dataSource = new MatTableDataSource<TabelasMoedas>(this._tabelaMoedas);
      this.dataSource.paginator = this.paginator;
      console.log("OnInit");
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    console.log("ngAfterViewInit");
  }

  criarObjetoDaTabela(chave: string[], valor: number[]){
      this._tabelaMoedas = [];
      for(var m = 0; m < this._moedas.length; m++){
        this._tabelaMoedas.push({"moeda": chave[m], "valor": valor[m]});
      }
  }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private moedasService: MoedasService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
}