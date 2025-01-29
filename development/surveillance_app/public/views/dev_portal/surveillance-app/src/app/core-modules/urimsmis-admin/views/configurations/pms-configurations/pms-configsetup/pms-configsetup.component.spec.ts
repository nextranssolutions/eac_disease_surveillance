import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsConfigsetupComponent } from './pms-configsetup.component';

describe('PmsConfigsetupComponent', () => {
  let component: PmsConfigsetupComponent;
  let fixture: ComponentFixture<PmsConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmsConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PmsConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
