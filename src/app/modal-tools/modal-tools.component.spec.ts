import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalToolsComponent } from './modal-tools.component';

describe('ModalToolsComponent', () => {
  let component: ModalToolsComponent;
  let fixture: ComponentFixture<ModalToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalToolsComponent]
    });
    fixture = TestBed.createComponent(ModalToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
