import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaEditComponent } from './fatura-edit.component';

describe('FaturaEditComponent', () => {
  let component: FaturaEditComponent;
  let fixture: ComponentFixture<FaturaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaturaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaturaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
