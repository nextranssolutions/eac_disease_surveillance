import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppChecklistDefinationComponent } from './app-checklist-defination.component';

describe('AppChecklistDefinationComponent', () => {
  let component: AppChecklistDefinationComponent;
  let fixture: ComponentFixture<AppChecklistDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppChecklistDefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppChecklistDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
