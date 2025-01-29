import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTranslationmanagementComponent } from './app-translationmanagement.component';

describe('AppTranslationmanagementComponent', () => {
  let component: AppTranslationmanagementComponent;
  let fixture: ComponentFixture<AppTranslationmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTranslationmanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppTranslationmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
