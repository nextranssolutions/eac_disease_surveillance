import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPremisesconfigurationsComponent } from './shared-premisesconfigurations.component';

describe('SharedPremisesconfigurationsComponent', () => {
  let component: SharedPremisesconfigurationsComponent;
  let fixture: ComponentFixture<SharedPremisesconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPremisesconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedPremisesconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
