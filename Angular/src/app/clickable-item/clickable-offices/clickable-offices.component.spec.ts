import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableOfficesComponent } from './clickable-offices.component';

describe('ClickableOfficesComponent', () => {
  let component: ClickableOfficesComponent;
  let fixture: ComponentFixture<ClickableOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
