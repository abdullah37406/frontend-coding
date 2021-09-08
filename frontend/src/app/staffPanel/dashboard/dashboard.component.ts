import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { }

  headElements = ['Name', 'Phone', 'Address'];
  prevId; currentId = "food";
  tableModalVisibility = false;
  customerModalVisibility = false;
  isConfirmLoading = false;
  addTableFormGroup: FormGroup;
  addCustomerFormGroup: FormGroup;

  itemCategories = [];
  itemSubategories = [];
  filteredItemSubategories = [];
  tableCategories = [];
  tableSubcategories = [];
  allItems = [];
  filteredItems = [];
  skip = "no";
 
  @ViewChild(FormGroupDirective) myform1;
  @ViewChild(FormGroupDirective) myform2;

  option = [{
    name: "abc",
    id: 1
  }, {
    name: "def",
    id: 2
  }, {
    name: "ghi",
    id: 3
  }]
  public addTableForm = {
    tableCategory: new FormControl('', [Validators.required]),
    tabeleName: new FormControl('', [Validators.required]),
  }
  public addCustomerForm = {
    customerName: new FormControl('', [Validators.required]),
    customerPhone: new FormControl('', [Validators.required]),
    customerAddress: new FormControl('', [Validators.required]),
  }
  ngOnInit(): void {
    this.createForm();
    this.getEveryThing();
  }
  createForm() {
    this.addTableFormGroup = this.fb.group(this.addTableForm);
    this.addCustomerFormGroup = this.fb.group(this.addCustomerForm);
  }
  getEveryThing() {
    this.Jarwis.getEveryThing().subscribe(
      (data) => this.getEveryThingSuccess(data),
      (error) => this.getEveryThingError(error)
    );
  }
  getEveryThingSuccess(data) {
    this.itemCategories = data.parentItemCategories;
    this.tableCategories = data.parentTableCategories;
    this.itemSubategories = data.allSubcategoriesItems;
    this.tableSubcategories = data.allSubcategoriesTables;
    this.allItems = data.getItems;
  }
  getEveryThingError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  onSubmitTableModal() {

  }
  selectedCategory(value) {
    this.filteredItemSubategories = [];
    this.filteredItems = [];
    var parentId = this.itemCategories[value].id
    this.itemSubategories.forEach(subCat => {
      if (subCat.categoryId == parentId) {
        this.filteredItemSubategories.push(subCat);
      }
    })
    this.filteredItemSubategories.forEach(subCat => {
      this.allItems.forEach(item => {
        if (item.subcategoryId == subCat.id) {
          this.filteredItems.push(item)
        }
      })
    })
  }
  call(name, index) {
    var id = this.filteredItems[index].subcategoryId;
    var subName = this.filteredItemSubategories.find(x => x.id == id).name
    if (name == subName) {
      this.skip = "no";
    }
    else {
      this.skip = "skip"
    }
  }
  createId(id){
    return id.replace(" ",'_');
  }

  showTableModal(): void {
    this.tableModalVisibility = true;
  }
  cancelTableModal(): void {
    this.tableModalVisibility = false;
  }
  showCustomerModal(): void {
    this.customerModalVisibility = true;
  }
  canceleCustomerModal(): void {
    this.customerModalVisibility = false;
  }
  getTableCategoryError() { return this.addTableForm.tableCategory.hasError('required') ? 'You must select table category' : ''; }
  getTableNameError() { return this.addTableForm.tabeleName.hasError('required') ? 'You must select table name' : ''; }
  getcustomerNameError() { return this.addCustomerForm.customerName.hasError('required') ? 'You must eneter name' : ''; }
  getcustomerPhoneError() { return this.addCustomerForm.customerPhone.hasError('required') ? 'You must eneter phone' : ''; }
  getcustomerAddressError() { return this.addCustomerForm.customerAddress.hasError('required') ? 'You must eneter address' : ''; }

}
