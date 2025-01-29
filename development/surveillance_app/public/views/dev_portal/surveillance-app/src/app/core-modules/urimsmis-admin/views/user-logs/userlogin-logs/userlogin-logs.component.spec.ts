import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginLogsComponent } from './userlogin-logs.component';

describe('UserloginLogsComponent', () => {
  let component: UserloginLogsComponent;
  let fixture: ComponentFixture<UserloginLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserloginLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserloginLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
