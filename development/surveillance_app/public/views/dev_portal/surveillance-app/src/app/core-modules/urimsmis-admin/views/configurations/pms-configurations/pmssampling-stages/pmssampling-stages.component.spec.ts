import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmssamplingStagesComponent } from './pmssampling-stages.component';

describe('PmssamplingStagesComponent', () => {
  let component: PmssamplingStagesComponent;
  let fixture: ComponentFixture<PmssamplingStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmssamplingStagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmssamplingStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
