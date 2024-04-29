import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversorMonetarioComponent } from './conversor-monetario.component';

describe('ConversorMonetarioComponent', () => {
  let component: ConversorMonetarioComponent;
  let fixture: ComponentFixture<ConversorMonetarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversorMonetarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversorMonetarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
