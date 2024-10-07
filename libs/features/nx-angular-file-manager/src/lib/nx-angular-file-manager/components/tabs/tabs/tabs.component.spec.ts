/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NxAngularTabsComponent } from "./tabs.component";

describe("NxAngularTabsComponent", () => {
  let component: NxAngularTabsComponent;
  let fixture: ComponentFixture<NxAngularTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NxAngularTabsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NxAngularTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
