import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpwdresetrequestLogsComponent } from './userpwdresetrequest-logs.component';

describe('UserpwdresetrequestLogsComponent', () => {
  let component: UserpwdresetrequestLogsComponent;
  let fixture: ComponentFixture<UserpwdresetrequestLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserpwdresetrequestLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserpwdresetrequestLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
