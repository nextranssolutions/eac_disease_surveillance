import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedpreviewexpressionofinterestsComponent } from './sharedpreviewexpressionofinterests.component';

describe('SharedpreviewexpressionofinterestsComponent', () => {
  let component: SharedpreviewexpressionofinterestsComponent;
  let fixture: ComponentFixture<SharedpreviewexpressionofinterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedpreviewexpressionofinterestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedpreviewexpressionofinterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
