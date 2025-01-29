import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNavigationsComponent } from './shared-navigations.component';

describe('SharedNavigationsComponent', () => {
  let component: SharedNavigationsComponent;
  let fixture: ComponentFixture<SharedNavigationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedNavigationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedNavigationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
