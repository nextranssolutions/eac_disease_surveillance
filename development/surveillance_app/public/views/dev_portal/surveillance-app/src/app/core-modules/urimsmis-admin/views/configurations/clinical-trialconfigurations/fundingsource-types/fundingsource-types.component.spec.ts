import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingsourceTypesComponent } from './fundingsource-types.component';

describe('FundingsourceTypesComponent', () => {
  let component: FundingsourceTypesComponent;
  let fixture: ComponentFixture<FundingsourceTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundingsourceTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundingsourceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
