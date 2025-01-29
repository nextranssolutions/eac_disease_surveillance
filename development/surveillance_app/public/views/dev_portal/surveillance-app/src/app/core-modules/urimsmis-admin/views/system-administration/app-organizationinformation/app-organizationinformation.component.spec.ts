import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOrganizationinformationComponent } from './app-organizationinformation.component';

describe('AppOrganizationinformationComponent', () => {
  let component: AppOrganizationinformationComponent;
  let fixture: ComponentFixture<AppOrganizationinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppOrganizationinformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppOrganizationinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
