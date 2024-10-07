/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NxAngularTabComponent } from './tab.component';

describe('NxAngularTabComponent', () => {
  let component: NxAngularTabComponent;
  let fixture: ComponentFixture<NxAngularTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NxAngularTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NxAngularTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
