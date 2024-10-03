import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NxAngularFileManagerComponent } from './nx-angular-file-manager.component';

describe('NxAngularFileManagerComponent', () => {
  let component: NxAngularFileManagerComponent;
  let fixture: ComponentFixture<NxAngularFileManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxAngularFileManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NxAngularFileManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
