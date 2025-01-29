import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSystemlabelsmanagementComponent } from './app-systemlabelsmanagement.component';

describe('AppSystemlabelsmanagementComponent', () => {
  let component: AppSystemlabelsmanagementComponent;
  let fixture: ComponentFixture<AppSystemlabelsmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSystemlabelsmanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppSystemlabelsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
