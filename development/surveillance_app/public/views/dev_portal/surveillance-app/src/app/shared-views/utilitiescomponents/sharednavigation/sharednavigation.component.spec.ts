import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharednavigationComponent } from './sharednavigation.component';

describe('SharednavigationComponent', () => {
  let component: SharednavigationComponent;
  let fixture: ComponentFixture<SharednavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharednavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharednavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
