import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuienesSomosPage } from './quienes-somos.page';

describe('QuienesSomosPage', () => {
  let component: QuienesSomosPage;
  let fixture: ComponentFixture<QuienesSomosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuienesSomosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuienesSomosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
