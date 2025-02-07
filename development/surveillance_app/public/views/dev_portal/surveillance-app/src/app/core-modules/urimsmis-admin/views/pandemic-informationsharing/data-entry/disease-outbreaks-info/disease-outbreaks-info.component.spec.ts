import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseOutbreaksInfoComponent } from './disease-outbreaks-info.component';

describe('DiseaseOutbreaksInfoComponent', () => {
  let component: DiseaseOutbreaksInfoComponent;
  let fixture: ComponentFixture<DiseaseOutbreaksInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiseaseOutbreaksInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiseaseOutbreaksInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
