/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { NxFmFolderTreeComponent } from "./folder-tree.component";

describe("NxFmFolderTreeComponent", () => {
  let component: NxFmFolderTreeComponent;
  let fixture: ComponentFixture<NxFmFolderTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NxFmFolderTreeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NxFmFolderTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
