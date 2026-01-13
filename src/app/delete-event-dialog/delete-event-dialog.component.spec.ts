import { ComponentFixture, TestBed } from '@angular/core/testing';

import {DeleteEventDialogComponent} from './delete-event-dialog.component';

describe('DeleteEventDialogComponent', () => {
  let component: DeleteEventDialogComponent;
  let fixture: ComponentFixture<DeleteEventDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEventDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
