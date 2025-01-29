import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPmsconfigurationsComponent } from './shared-pmsconfigurations.component';

describe('SharedPmsconfigurationsComponent', () => {
  let component: SharedPmsconfigurationsComponent;
  let fixture: ComponentFixture<SharedPmsconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPmsconfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedPmsconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
