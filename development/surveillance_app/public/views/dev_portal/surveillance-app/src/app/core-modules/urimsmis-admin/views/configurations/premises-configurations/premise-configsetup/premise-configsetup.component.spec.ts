import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseConfigsetupComponent } from './premise-configsetup.component';

describe('PremiseConfigsetupComponent', () => {
  let component: PremiseConfigsetupComponent;
  let fixture: ComponentFixture<PremiseConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiseConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiseConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
