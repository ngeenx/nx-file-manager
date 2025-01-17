/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StickyTreeItemComponent } from './sticky-tree-item.component';

describe('StickyTreeItemComponent', () => {
  let component: StickyTreeItemComponent;
  let fixture: ComponentFixture<StickyTreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickyTreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
