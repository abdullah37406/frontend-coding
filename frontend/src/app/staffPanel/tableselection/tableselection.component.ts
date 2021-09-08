import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-tableselection',
  templateUrl: './tableselection.component.html',
  styleUrls: ['./tableselection.component.css']
})
export class TableselectionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }
  addTableFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) myform;
  option=[{
    name:"abc",
    id:1
  },{
    name:"def",
    id:2
  },{
    name:"ghi",
    id:3
  }]
  public addTableForm = {
    tableCategory: new FormControl('', [Validators.required]),
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.addTableFormGroup = this.fb.group(this.addTableForm);
  }
  onSubmitTableCategory(){

  }
  getTableCategoryError() { return this.addTableForm.tableCategory.hasError('required') ? 'You must select parent category' : ''; }
  
}
