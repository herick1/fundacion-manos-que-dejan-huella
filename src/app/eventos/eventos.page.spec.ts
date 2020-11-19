import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosPage } from './eventos.page';

describe('EventosPage', () => {
  let component: EventosPage;
  let fixture: ComponentFixture<EventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
