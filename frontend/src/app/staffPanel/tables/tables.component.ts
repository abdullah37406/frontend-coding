import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryInfo } from 'src/app/models/category-info';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,

  ) { }

  categoryInfo = new CategoryInfo()


  @ViewChild(FormGroupDirective) myform;
  // @ViewChild(FormGroupDirective) myform;
  selectedValue = null;
  dateFormat = 'dd/MM/yyyy';
  addCategoryFormGroup: FormGroup;
  addSubCategoryFormGroup: FormGroup;
  updateFormGroup: FormGroup;

  itemCategories = [];
  itemSubcategories = [];
  selectedCategory = null;
  updateModalVisibility = false;


  public categoryForm = {
    category: new FormControl('', [Validators.required]),
  }
  public subCategoryForm = {
    subCategory: new FormControl('', [Validators.required]),
    parentCategory: new FormControl('', [Validators.required]),
  }
  public updateForm = {
    name: new FormControl('', [Validators.required]),
  }
  ngOnInit(): void {
    this.createForm();
    this.getItemCategories();
    // this.subCategoryForm.parentCategory.setValue(this.option[0]);
  }
  createForm() {
    this.addCategoryFormGroup = this.fb.group(this.categoryForm);
    this.addSubCategoryFormGroup = this.fb.group(this.subCategoryForm);
    this.updateFormGroup = this.fb.group(this.updateForm);

  }
  getItemCategories() {
    this.categoryInfo.itemOrTable="tables";
    this.Jarwis.getParentCategories(this.categoryInfo).subscribe(
      (data) => this.parentCategories(data),
      (error) => this.parentCategoriesError(error)
    );
  }
  parentCategories(data) {
    for (var i = 0; i < data.parentCategories.length; i++) {
      data.parentCategories[i].name = data.parentCategories[i].name.toUpperCase();
    }
    this.itemCategories = data.parentCategories;
    if(this.categoryInfo.subOrMain=="tableMain"){
      this.selectedCategory = this.itemCategories.find(x => x.id == this.categoryInfo.id).name;
    }
  }
  parentCategoriesError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  onSubmitCategory() {
    if (this.addCategoryFormGroup.invalid) {
      return
    }
    this.categoryInfo.name = this.categoryForm.category.value;
    this.categoryInfo.itemOrTable="tables"
    this.Jarwis.createCategory(this.categoryInfo).subscribe(
      (data) => this.categorySubmission(data),
      (error) => this.categorySubmissionError(error)
    );
  }
  categorySubmission(data: any) {
    this.myform.resetForm();
    this.snotifyService.clear();
    this.snotifyService.success(data.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
    this.getItemCategories();
  }
  categorySubmissionError(error: any) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  onSubmitSubCategory() {
    if (this.addSubCategoryFormGroup.invalid) {
      return
    }
    this.categoryInfo.name = this.subCategoryForm.subCategory.value;
    this.categoryInfo.parentCategory = this.subCategoryForm.parentCategory.value;
    this.categoryInfo.itemOrTable="tables";
    this.Jarwis.createSubcategory(this.categoryInfo).subscribe(
      (data) => this.subcategorySubmission(data),
      (error) => this.subcategorySubmissionError(error)
    );
  }
  subcategorySubmission(data) {
    this.subCategoryForm.subCategory.setValue("");
    this.snotifyService.clear();
    this.snotifyService.success(data.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
    this.getDetails();
  }
  subcategorySubmissionError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  getDetails() {
    this.categoryInfo.id = this.subCategoryForm.parentCategory.value;
    this.selectedCategory = this.itemCategories.find(x => x.id == this.categoryInfo.id).name;
    this.categoryInfo.itemOrTable="tables";
    this.Jarwis.getcategorySubcategories(this.categoryInfo).subscribe(
      (data) => this.categorySubcategories(data),
      (error) => this.categorySubcategoriesError(error)
    );
  }
  categorySubcategories(data) {
    this.itemSubcategories = data.categorySubcategories;
  }
  categorySubcategoriesError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  edit(category, index?) {
    if (category == "tableMain") {
      this.categoryInfo.id = this.itemCategories.find(x => x.name == this.selectedCategory).id;
      this.updateForm.name.setValue(this.selectedCategory);
      this.categoryInfo.subOrMain=category;

    }
    if (category == "tableSub") {
      this.categoryInfo.id = this.itemSubcategories[index].id;
      this.updateForm.name.setValue(this.itemSubcategories.find(x => x.id == this.categoryInfo.id).name);
      this.categoryInfo.subOrMain=category;
    }
    this.updateModalVisibility = true;
  }
  cancelUpdateModal(): void {
    this.updateModalVisibility = false;
  }
  onSubmitUpdateModal() {
    if (this.updateFormGroup.invalid) {
      return
    }
    this.categoryInfo.updatedName = this.updateForm.name.value;
    this.Jarwis.updateName(this.categoryInfo).subscribe(
      (data) => this.updation(data),
      (error) => this.updationError(error)
    );
  }
  updation(data) {
    this.snotifyService.clear();
    this.snotifyService.success(data.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
    this.updateModalVisibility=false;
    if(this.categoryInfo.subOrMain=="tableSub"){
    this.getDetails();
    }
    else{
      this.getItemCategories();
    }
  }
  updationError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  confirm(category,index?){
    if (category == "tableMain") {
      this.categoryInfo.id = this.itemCategories.find(x => x.name == this.selectedCategory).id;
      this.categoryInfo.subOrMain=category;

    }
    if (category == "tableSub") {
      this.categoryInfo.id = this.itemSubcategories[index].id;
      this.categoryInfo.subOrMain=category;
    }
    this.Jarwis.deleteItem(this.categoryInfo).subscribe(
      (data) => this.deletion(data),
      (error) => this.deletionError(error)
    );
  }
  deletion(data){
    this.snotifyService.clear();
    this.snotifyService.success(data.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
    if(this.categoryInfo.subOrMain=="tableSub"){
      this.getDetails();
    }
    else{
      this.getItemCategories();
     this.subCategoryForm.parentCategory.setValue("");
     this.selectedCategory=null;
     this.itemSubcategories=[];

    }
   
  }
  deletionError(error){
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  cancel(){}

  getCategoryError() { return this.categoryForm.category.hasError('required') ? 'You must enter category name' : ''; }
  getParentCategoryError() { return this.subCategoryForm.parentCategory.hasError('required') ? 'You must select parent category' : ''; }
  getsubCategoryError() { return this.subCategoryForm.subCategory.hasError('required') ? 'You must enter subcategory name' : ''; }
  getNameError() { return this.updateForm.name.hasError('required') ? 'You must enter name' : ''; }
  onChange() {

  }

}
