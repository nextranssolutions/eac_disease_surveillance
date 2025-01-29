import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessConfsetupComponent } from './process-confsetup.component';

describe('ProcessConfsetupComponent', () => {
  let component: ProcessConfsetupComponent;
  let fixture: ComponentFixture<ProcessConfsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessConfsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessConfsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
