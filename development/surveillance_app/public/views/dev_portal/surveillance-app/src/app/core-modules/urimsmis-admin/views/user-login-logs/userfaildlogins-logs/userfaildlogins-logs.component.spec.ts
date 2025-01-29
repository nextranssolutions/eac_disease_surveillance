import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfaildloginsLogsComponent } from './userfaildlogins-logs.component';

describe('UserfaildloginsLogsComponent', () => {
  let component: UserfaildloginsLogsComponent;
  let fixture: ComponentFixture<UserfaildloginsLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserfaildloginsLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserfaildloginsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
