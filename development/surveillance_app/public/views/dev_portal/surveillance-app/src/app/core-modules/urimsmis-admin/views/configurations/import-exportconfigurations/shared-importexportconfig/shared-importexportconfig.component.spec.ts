import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedImportexportconfigComponent } from './shared-importexportconfig.component';

describe('SharedImportexportconfigComponent', () => {
  let component: SharedImportexportconfigComponent;
  let fixture: ComponentFixture<SharedImportexportconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedImportexportconfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedImportexportconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
