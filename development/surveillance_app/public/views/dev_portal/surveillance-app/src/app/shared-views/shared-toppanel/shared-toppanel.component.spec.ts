import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedToppanelComponent } from './shared-toppanel.component';

describe('SharedToppanelComponent', () => {
  let component: SharedToppanelComponent;
  let fixture: ComponentFixture<SharedToppanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedToppanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedToppanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
