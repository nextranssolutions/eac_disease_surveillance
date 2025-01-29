import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChecklistTypesComponent } from './app-checklist-types.component';

describe('AppChecklistTypesComponent', () => {
  let component: AppChecklistTypesComponent;
  let fixture: ComponentFixture<AppChecklistTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChecklistTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppChecklistTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
