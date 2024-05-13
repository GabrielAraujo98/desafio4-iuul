import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-lista-de-conversoes',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatPaginator, MatPaginatorModule],
  templateUrl: './lista-de-conversoes.component.html',
  styleUrl: './lista-de-conversoes.component.css'
})
export class ListaDeConversoesComponent {

}
