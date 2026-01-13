import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvntComponent } from './events.component';

describe('EventsComponent', () => {
  let component: EvntComponent;
  let fixture: ComponentFixture<EvntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvntComponent]
    });
    fixture = TestBed.createComponent(EvntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
