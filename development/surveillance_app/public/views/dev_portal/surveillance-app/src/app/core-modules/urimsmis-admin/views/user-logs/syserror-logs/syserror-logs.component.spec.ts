import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyserrorLogsComponent } from './syserror-logs.component';

describe('SyserrorLogsComponent', () => {
  let component: SyserrorLogsComponent;
  let fixture: ComponentFixture<SyserrorLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyserrorLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SyserrorLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
