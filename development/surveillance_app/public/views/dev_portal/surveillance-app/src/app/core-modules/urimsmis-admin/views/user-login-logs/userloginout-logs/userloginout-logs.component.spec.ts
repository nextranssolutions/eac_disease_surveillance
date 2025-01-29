import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginoutLogsComponent } from './userloginout-logs.component';

describe('UserloginoutLogsComponent', () => {
  let component: UserloginoutLogsComponent;
  let fixture: ComponentFixture<UserloginoutLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserloginoutLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserloginoutLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
