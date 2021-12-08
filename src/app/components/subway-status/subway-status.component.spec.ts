import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubwayStatusComponent } from './subway-status.component';

describe('SubwayStatusComponent', () => {
  let component: SubwayStatusComponent;
  let fixture: ComponentFixture<SubwayStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubwayStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubwayStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
