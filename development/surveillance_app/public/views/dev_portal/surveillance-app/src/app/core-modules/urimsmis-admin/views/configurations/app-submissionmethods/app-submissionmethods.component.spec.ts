import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubmissionmethodsComponent } from './app-submissionmethods.component';

describe('AppSubmissionmethodsComponent', () => {
  let component: AppSubmissionmethodsComponent;
  let fixture: ComponentFixture<AppSubmissionmethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSubmissionmethodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSubmissionmethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
