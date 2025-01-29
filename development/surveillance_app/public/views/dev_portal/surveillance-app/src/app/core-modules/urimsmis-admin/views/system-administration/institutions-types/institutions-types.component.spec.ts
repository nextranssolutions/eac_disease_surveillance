import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsTypesComponent } from './institutions-types.component';

describe('InstitutionsTypesComponent', () => {
  let component: InstitutionsTypesComponent;
  let fixture: ComponentFixture<InstitutionsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
