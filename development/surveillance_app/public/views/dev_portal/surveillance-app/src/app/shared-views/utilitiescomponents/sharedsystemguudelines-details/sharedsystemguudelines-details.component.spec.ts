import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedsystemguudelinesDetailsComponent } from './sharedsystemguudelines-details.component';

describe('SharedsystemguudelinesDetailsComponent', () => {
  let component: SharedsystemguudelinesDetailsComponent;
  let fixture: ComponentFixture<SharedsystemguudelinesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedsystemguudelinesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedsystemguudelinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
