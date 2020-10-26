import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dashboardEstadisticasPage } from './dashboard-estadisticas.page';

describe('ContactanosPage', () => {
  let component: dashboardEstadisticasPage;
  let fixture: ComponentFixture<dashboardEstadisticasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dashboardEstadisticasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dashboardEstadisticasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
