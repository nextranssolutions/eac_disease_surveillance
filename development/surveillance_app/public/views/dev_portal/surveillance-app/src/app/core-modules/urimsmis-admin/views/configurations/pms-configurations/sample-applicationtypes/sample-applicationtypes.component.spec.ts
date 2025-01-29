import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleApplicationtypesComponent } from './sample-applicationtypes.component';

describe('SampleApplicationtypesComponent', () => {
  let component: SampleApplicationtypesComponent;
  let fixture: ComponentFixture<SampleApplicationtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleApplicationtypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SampleApplicationtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
