import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorLevelsComponent } from './sponsor-levels.component';

describe('SponsorLevelsComponent', () => {
  let component: SponsorLevelsComponent;
  let fixture: ComponentFixture<SponsorLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorLevelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsorLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
