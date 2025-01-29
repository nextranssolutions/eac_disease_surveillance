import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDosageformsComponent } from './app-dosageforms.component';

describe('AppDosageformsComponent', () => {
  let component: AppDosageformsComponent;
  let fixture: ComponentFixture<AppDosageformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDosageformsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppDosageformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
