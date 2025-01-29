import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormsComponent } from './app-forms.component';

describe('AppFormsComponent', () => {
  let component: AppFormsComponent;
  let fixture: ComponentFixture<AppFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
