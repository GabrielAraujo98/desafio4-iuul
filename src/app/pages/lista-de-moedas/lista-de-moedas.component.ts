import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MoedasService } from "../../services/moedas/moedas.service";
import { TabelasMoedas } from './../../interface/tabelas-moedas/tabelas-moedas';
import { ListaMoedas } from './../../interface/lista-moedas/lista-moedas';
import {MediaMatcher} from '@angular/cdk/layout';


@Component({
  selector: 'app-lista-de-moedas',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatTableModule, MatPaginator, MatPaginatorModule],
  templateUrl: './lista-de-moedas.component.html',
  styleUrl: './lista-de-moedas.component.css'
})
export class ListaDeMoedasComponent implements OnInit, AfterViewInit{

    displayedColumns: string[] = ['moeda', 'valor'];
    dataSource: MatTableDataSource<TabelasMoedas, MatPaginator>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator
      console.log("oi");
    }
    
    ngOnInit() {
      
        this.moedasService.definirTabela();

        this.dataSource = new MatTableDataSource<TabelasMoedas>(this.moedasService.tabelaMoedas);
      
    }

    mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private moedasService: MoedasService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
}