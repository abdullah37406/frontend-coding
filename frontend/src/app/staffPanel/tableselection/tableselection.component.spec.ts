import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableselectionComponent } from './tableselection.component';

describe('TableselectionComponent', () => {
  let component: TableselectionComponent;
  let fixture: ComponentFixture<TableselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableselectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
