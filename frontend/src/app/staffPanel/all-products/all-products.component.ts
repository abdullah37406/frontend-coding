import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryInfo } from 'src/app/models/category-info';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  headElements = ['Name', 'Description', 'Price', 'Image'];

  constructor(
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
    private fb: FormBuilder,

  ) { }
  itemInfoArray: CategoryInfo[] = [];
  selectedCategory = new CategoryInfo();

  @ViewChild(FormGroupDirective) myform;
  serachItemFormGroup: FormGroup;
  itemCategories = [];
  itemSubcategories = [];
  filteringItems = [];
  searchText: string = '';
  copylistOfData = [];

  public itemsForm = {
    subCategory: new FormControl(''),
    parentCategory: new FormControl(''),
  }
  ngOnInit(): void {
    this.getAllItems();
    this.createForm();
    this.getItemCategories();
  }
  createForm() {
    this.serachItemFormGroup = this.fb.group(this.itemsForm);
  }
  getAllItems() {
    this.Jarwis.getAllItems().subscribe(
      (data) => this.getAllItemsSuccess(data),
      (error) => this.getAllItemsError(error)
    );
  }
  getAllItemsSuccess(data) {
    this.itemInfoArray = data.getItems;
    this.filteringItems = this.itemInfoArray;
    this.copylistOfData=this.itemInfoArray;
  }
  getAllItemsError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  getItemCategories() {
    this.selectedCategory.itemOrTable = "items";
    this.Jarwis.getParentCategories(this.selectedCategory).subscribe(
      (data) => this.parentCategories(data),
      (error) => this.parentCategoriesError(error)
    );
  }
  parentCategories(data) {
    for (var i = 0; i < data.parentCategories.length; i++) {
      data.parentCategories[i].name = data.parentCategories[i].name.toUpperCase();
    }
    this.itemCategories = data.parentCategories;
  }
  parentCategoriesError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }

  getSubcategories() {
    if (this.itemsForm.subCategory.value != null) {
      this.itemsForm.subCategory.setValue(null);
    }
    this.selectedCategory.id = this.itemsForm.parentCategory.value;
    this.selectedCategory.itemOrTable = "items";
    this.Jarwis.getcategorySubcategories(this.selectedCategory).subscribe(
      (data) => this.categorySubcategories(data),
      (error) => this.categorySubcategoriesError(error)
    );
  }
  categorySubcategories(data) {
    for (var i = 0; i < data.categorySubcategories.length; i++) {
      data.categorySubcategories[i].name = data.categorySubcategories[i].name.toUpperCase();
    }
    this.itemSubcategories = data.categorySubcategories;
    if (this.itemsForm.parentCategory.value == null) {
      this.itemInfoArray = this.filteringItems;
      this.copylistOfData=this.itemInfoArray;
    }
    else {
      this.itemInfoArray = [];
      this.itemSubcategories.forEach(item => {
        this.filteringItems.forEach(itemSepration => {
          if (itemSepration.subcategoryId == item.id) {
            this.itemInfoArray.push(itemSepration);
            this.copylistOfData=this.itemInfoArray;
          }
        })
      })
    }
  }
  categorySubcategoriesError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  getSubcategoriesItems() {
    this.itemInfoArray = [];
    this.filteringItems.forEach(item => {
      if (item.subcategoryId == this.itemsForm.subCategory.value) {
        this.itemInfoArray.push(item);
        this.copylistOfData=this.itemInfoArray;
      }
      else if (this.itemsForm.subCategory.value == null) {
        this.getSubcategories();
      }
    })
  }
  search(search) {
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && (value[keys[i]].toString().toLocaleLowerCase().includes(search))) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.itemInfoArray = targetValue;
  }
}
