import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortentryExitComponent } from './portentry-exit.component';

describe('PortentryExitComponent', () => {
  let component: PortentryExitComponent;
  let fixture: ComponentFixture<PortentryExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortentryExitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortentryExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
