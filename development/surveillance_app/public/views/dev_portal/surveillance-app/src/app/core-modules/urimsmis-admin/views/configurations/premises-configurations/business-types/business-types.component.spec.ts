import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypesComponent } from './business-types.component';

describe('BusinessTypesComponent', () => {
  let component: BusinessTypesComponent;
  let fixture: ComponentFixture<BusinessTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
