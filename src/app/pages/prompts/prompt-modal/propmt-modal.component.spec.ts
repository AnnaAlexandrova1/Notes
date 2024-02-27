import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropmtModalComponent } from './propmt-modal.component';

describe('PropmtModalComponent', () => {
  let component: PropmtModalComponent;
  let fixture: ComponentFixture<PropmtModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropmtModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropmtModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
