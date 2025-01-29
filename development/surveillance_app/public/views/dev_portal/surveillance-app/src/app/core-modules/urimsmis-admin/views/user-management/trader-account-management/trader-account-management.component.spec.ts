import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderAccountManagementComponent } from './trader-account-management.component';

describe('TraderAccountManagementComponent', () => {
  let component: TraderAccountManagementComponent;
  let fixture: ComponentFixture<TraderAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraderAccountManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraderAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
