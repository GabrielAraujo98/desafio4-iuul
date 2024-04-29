import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeConversoesComponent } from './lista-de-conversoes.component';

describe('ListaDeConversoesComponent', () => {
  let component: ListaDeConversoesComponent;
  let fixture: ComponentFixture<ListaDeConversoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeConversoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaDeConversoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
