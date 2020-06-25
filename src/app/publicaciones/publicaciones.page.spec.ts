import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesPage } from './publicaciones.page';

describe('PublicacionesPage', () => {
  let component: PublicacionesPage;
  let fixture: ComponentFixture<PublicacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
