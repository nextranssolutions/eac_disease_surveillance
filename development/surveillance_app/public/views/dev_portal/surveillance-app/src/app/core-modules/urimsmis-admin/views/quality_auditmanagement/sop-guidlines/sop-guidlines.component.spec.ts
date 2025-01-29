import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopGuidlinesComponent } from './sop-guidlines.component';

describe('SopGuidlinesComponent', () => {
  let component: SopGuidlinesComponent;
  let fixture: ComponentFixture<SopGuidlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SopGuidlinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SopGuidlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
