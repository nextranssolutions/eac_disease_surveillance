import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEoiengagementComponent } from './app-eoiengagement.component';

describe('AppEoiengagementComponent', () => {
  let component: AppEoiengagementComponent;
  let fixture: ComponentFixture<AppEoiengagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEoiengagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppEoiengagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
