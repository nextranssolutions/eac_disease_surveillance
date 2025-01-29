import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsProcessesDocdefinationComponent } from './dms-processes-docdefination.component';

describe('DmsProcessesDocdefinationComponent', () => {
  let component: DmsProcessesDocdefinationComponent;
  let fixture: ComponentFixture<DmsProcessesDocdefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsProcessesDocdefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsProcessesDocdefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
