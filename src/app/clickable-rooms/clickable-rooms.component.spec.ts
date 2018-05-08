import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableRoomsComponent } from './clickable-rooms.component';

describe('ClickableRoomsComponent', () => {
  let component: ClickableRoomsComponent;
  let fixture: ComponentFixture<ClickableRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
