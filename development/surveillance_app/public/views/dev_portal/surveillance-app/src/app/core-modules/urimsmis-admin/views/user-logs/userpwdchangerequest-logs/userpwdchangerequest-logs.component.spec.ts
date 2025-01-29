import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpwdchangerequestLogsComponent } from './userpwdchangerequest-logs.component';

describe('UserpwdchangerequestLogsComponent', () => {
  let component: UserpwdchangerequestLogsComponent;
  let fixture: ComponentFixture<UserpwdchangerequestLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserpwdchangerequestLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserpwdchangerequestLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
