import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingSubmissionCommentsComponent } from './reporting-submission-comments.component';

describe('ReportingSubmissionCommentsComponent', () => {
  let component: ReportingSubmissionCommentsComponent;
  let fixture: ComponentFixture<ReportingSubmissionCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingSubmissionCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportingSubmissionCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
