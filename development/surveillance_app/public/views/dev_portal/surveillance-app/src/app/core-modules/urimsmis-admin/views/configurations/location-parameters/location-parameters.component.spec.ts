import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationParametersComponent } from './location-parameters.component';

describe('LocationParametersComponent', () => {
  let component: LocationParametersComponent;
  let fixture: ComponentFixture<LocationParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationParametersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
