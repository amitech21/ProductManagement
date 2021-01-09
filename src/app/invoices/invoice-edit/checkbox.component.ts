import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-checkbox',
  template: `
    <input 
      type="checkbox"
      (click)="changeBoolean()"
      [checked]="this.checked">
      
  `
})
export class CheckboxComponent implements ViewCell, OnInit {
 
  @Input() value: any;
  @Input() rowData: any;

  checked: boolean;

  constructor() { }

  ngOnInit() {
    this.checked = this.value;
  }

  changeBoolean() {
    this.checked = !this.checked;
    this.value === 'N' ? this.value = 'Y' : this.value = 'N';
    this.rowData.eList = this.value;

    console.log(this.rowData);
    console.log(this.value);  }

}