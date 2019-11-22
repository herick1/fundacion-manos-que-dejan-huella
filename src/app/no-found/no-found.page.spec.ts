import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFoundPage } from './no-found.page';

describe('NoFoundPage', () => {
  let component: NoFoundPage;
  let fixture: ComponentFixture<NoFoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoFoundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
