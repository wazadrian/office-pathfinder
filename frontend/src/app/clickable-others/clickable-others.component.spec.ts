import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableOthersComponent } from './clickable-others.component';

describe('ClickableOthersComponent', () => {
  let component: ClickableOthersComponent;
  let fixture: ComponentFixture<ClickableOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
