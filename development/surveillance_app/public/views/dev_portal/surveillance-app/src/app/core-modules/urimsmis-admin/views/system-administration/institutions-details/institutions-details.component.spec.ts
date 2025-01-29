import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsDetailsComponent } from './institutions-details.component';

describe('InstitutionsDetailsComponent', () => {
  let component: InstitutionsDetailsComponent;
  let fixture: ComponentFixture<InstitutionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
