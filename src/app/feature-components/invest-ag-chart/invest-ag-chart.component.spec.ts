import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestAgChartComponent } from './invest-ag-chart.component';

describe('InvestAgChartComponent', () => {
  let component: InvestAgChartComponent;
  let fixture: ComponentFixture<InvestAgChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestAgChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestAgChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
