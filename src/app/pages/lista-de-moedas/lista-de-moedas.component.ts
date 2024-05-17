import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MoedasService } from "../../services/moedas/moedas.service";
import { TabelasMoedas } from './../../interface/tabelas-moedas/tabelas-moedas';
import { ListaMoedas } from './../../interface/lista-moedas/lista-moedas';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-lista-de-moedas',
  standalone: true,
  imports: [HttpClientModule, MatInputModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginator, MatPaginatorModule],
  templateUrl: './lista-de-moedas.component.html',
  styleUrl: './lista-de-moedas.component.css'
})
export class ListaDeMoedasComponent implements OnInit, AfterViewInit{
  
  private _listaMoedas: ListaMoedas;
  private _moedas: string[] = [];
  private _nome: string[] = [];
  private _tabelaMoedas: TabelasMoedas[] = [];

  get tabelaMoedas(){
    return this._tabelaMoedas;
  }
  get moedas(){
    return this._moedas
  }

  displayedColumns: string[] = ['moeda', 'nome'];
  dataSource: MatTableDataSource<TabelasMoedas, MatPaginator>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    
  ngOnInit() {
    
    this.moedasService.getListaMoedas().subscribe(dados =>{
      this._listaMoedas = dados;

      for(var i = 0; i < this._listaMoedas.supported_codes.length; i++){
        console.log(this._listaMoedas.supported_codes[i][0]);
        console.log(this._listaMoedas.supported_codes[i][1]);
        
        
        this._moedas.push(this._listaMoedas.supported_codes[i][0]);
        this._nome.push(this._listaMoedas.supported_codes[i][1]);
      }

      this.criarObjetoDaTabela(this._moedas, this._nome);
      this.dataSource = new MatTableDataSource<TabelasMoedas>(this._tabelaMoedas);
      this.dataSource.paginator = this.paginator;
      console.log("OnInit");
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    console.log("ngAfterViewInit");
  }

  criarObjetoDaTabela(chave: string[], nome: string[]){
      this._tabelaMoedas = [];
      for(var m = 0; m < this._moedas.length; m++){
        this._tabelaMoedas.push({"moeda": chave[m], "nome": nome[m]});
      }
  }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private moedasService: MoedasService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}