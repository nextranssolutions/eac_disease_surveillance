import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemguudelinesDetailsComponent } from './systemguudelines-details.component';

describe('SystemguudelinesDetailsComponent', () => {
  let component: SystemguudelinesDetailsComponent;
  let fixture: ComponentFixture<SystemguudelinesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemguudelinesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemguudelinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
