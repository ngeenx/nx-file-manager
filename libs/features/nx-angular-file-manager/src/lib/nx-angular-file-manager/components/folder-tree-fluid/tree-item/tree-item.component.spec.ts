/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TreeItemComponent } from './tree-item.component';

describe('TreeItemComponent', () => {
  let component: TreeItemComponent;
  let fixture: ComponentFixture<TreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
