import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExpertprocessnotificationComponent } from './app-expertprocessnotification.component';

describe('AppExpertprocessnotificationComponent', () => {
  let component: AppExpertprocessnotificationComponent;
  let fixture: ComponentFixture<AppExpertprocessnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExpertprocessnotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppExpertprocessnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
