import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNotesComponent } from './invoice-notes.component';

describe('InvoiceNotesComponent', () => {
  let component: InvoiceNotesComponent;
  let fixture: ComponentFixture<InvoiceNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
