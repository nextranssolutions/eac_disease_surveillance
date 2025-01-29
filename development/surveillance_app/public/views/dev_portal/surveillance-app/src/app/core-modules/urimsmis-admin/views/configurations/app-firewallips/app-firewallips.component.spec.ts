import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFirewallipsComponent } from './app-firewallips.component';

describe('AppFirewallipsComponent', () => {
  let component: AppFirewallipsComponent;
  let fixture: ComponentFixture<AppFirewallipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFirewallipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppFirewallipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
