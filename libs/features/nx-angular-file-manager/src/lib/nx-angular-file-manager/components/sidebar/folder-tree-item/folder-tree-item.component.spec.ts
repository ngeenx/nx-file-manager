/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { NxFolderTreeItemComponent } from "./folder-tree-item.component";

describe("NxFolderTreeItemComponent", () => {
  let component: NxFolderTreeItemComponent;
  let fixture: ComponentFixture<NxFolderTreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NxFolderTreeItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NxFolderTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
