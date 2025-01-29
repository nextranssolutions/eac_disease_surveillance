import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsNonstructuredDocrequirementComponent } from './dms-nonstructured-docrequirement.component';

describe('DmsNonstructuredDocrequirementComponent', () => {
  let component: DmsNonstructuredDocrequirementComponent;
  let fixture: ComponentFixture<DmsNonstructuredDocrequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsNonstructuredDocrequirementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsNonstructuredDocrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
