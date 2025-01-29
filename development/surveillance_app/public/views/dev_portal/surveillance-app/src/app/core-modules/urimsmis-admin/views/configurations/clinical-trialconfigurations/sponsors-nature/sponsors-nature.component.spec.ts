import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsNatureComponent } from './sponsors-nature.component';

describe('SponsorsNatureComponent', () => {
  let component: SponsorsNatureComponent;
  let fixture: ComponentFixture<SponsorsNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorsNatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsorsNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
