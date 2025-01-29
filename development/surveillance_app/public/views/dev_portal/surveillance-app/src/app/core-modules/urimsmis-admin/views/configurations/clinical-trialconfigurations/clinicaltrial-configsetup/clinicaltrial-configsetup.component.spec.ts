import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaltrialConfigsetupComponent } from './clinicaltrial-configsetup.component';

describe('ClinicaltrialConfigsetupComponent', () => {
  let component: ClinicaltrialConfigsetupComponent;
  let fixture: ComponentFixture<ClinicaltrialConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicaltrialConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClinicaltrialConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
