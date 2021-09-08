import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CategoryInfo } from 'src/app/models/category-info';
import { ItemInfo } from 'src/app/models/item-info';

function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  editItem = new CategoryInfo();
  editItemArray: CategoryInfo[] = [];
  itemId = 0;
  itemImage = "/assets/Fish.jpg"
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) {
    this.itemId = this.route.snapshot.params.requestId;
  }
  editItemFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) myform;
  itemCategories = [];
  itemSubcategories = [];
  setSubcategory: any;
  public editItemForm = {
    subCategory: new FormControl('', [Validators.required]),
    parentCategory: new FormControl({ value: "", disabled: true }),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  }
  ngOnInit(): void {
    this.createForm();
    this.getItemCategories();
    this.getDetailForOne();
    this.editItem.itemInfo = new ItemInfo();
  }
  createForm() {
    this.editItemFormGroup = this.fb.group(this.editItemForm);
  }
  getItemCategories() {
    this.editItem.itemOrTable = "items";
    this.Jarwis.getParentCategories(this.editItem).subscribe(
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
  getDetailForOne() {
    this.editItem.id = this.itemId;
    this.Jarwis.getDetailForOne(this.editItem).subscribe(
      (data) => this.detailForOne(data),
      (error) => this.detailForOneError(error)
    );
  }
  detailForOne(data) {
    this.editItemForm.name.setValue(data.detailForOne.name);
    this.editItemForm.description.setValue(data.detailForOne.description);
    this.editItemForm.price.setValue(data.detailForOne.price);
    this.editItemForm.parentCategory.setValue(data.subcategoryForOne.categoryId);
    this.setSubcategory = data.detailForOne.subcategoryId;
    this.itemImage = data.detailForOne.imagePath;
    this.editItem.itemInfo.oldPath=data.detailForOne.imagePath;
  }
  detailForOneError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  getDetails() {
    this.editItem.id = this.editItemForm.parentCategory.value;
    this.editItem.itemOrTable = "items";
    this.Jarwis.getcategorySubcategories(this.editItem).subscribe(
      (data) => this.categorySubcategories(data),
      (error) => this.categorySubcategoriesError(error)
    );
  }
  categorySubcategories(data) {
    this.itemSubcategories = data.categorySubcategories;
    this.editItemForm.subCategory.setValue(this.setSubcategory)
  }
  categorySubcategoriesError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }

  fileList: NzUploadFile[] = [];
  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    // this.editItem.itemInfo=new ItemInfo();
    reader.readAsDataURL(file as unknown as File);
    reader.onload = () => {
      file.preview = reader.result;
      file.originFileObj = file as unknown as File;
      this.fileList = this.fileList.concat(file);
      if (this.fileList.length > 0) {
        this.itemImage = file.preview;
        this.editItem.itemInfo.file1 = file.preview;
        this.editItem.itemInfo.imagePath = file.name;
        this.editItem.itemInfo.newImage=1;
      }
    };
    return false;
  };



  onSubmitItemDetail() {
    this.editItem.itemInfo.id = this.itemId;
    this.editItem.itemInfo.name=this.editItemForm.name.value;
    this.editItem.itemInfo.description=this.editItemForm.description.value;
    this.editItem.itemInfo.price=this.editItemForm.price.value;
    this.editItem.id=this.itemSubcategories.find(x=>x.id==this.editItemForm.subCategory.value).id;
    debugger
    this.Jarwis.updateItem(this.editItem).subscribe(
      (data) => this.updateItem(data),
      (error) => this.updateItemError(error)
    );
  }
  updateItem(data) {
    this.snotifyService.clear();
    this.snotifyService.success(data.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
    this.ngOnInit();
  }
  updateItemError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  getParentCategoryError() { return this.editItemForm.parentCategory.hasError('required') ? 'You must select parent category' : ''; }
  getSubCategoryError() { return this.editItemForm.subCategory.hasError('required') ? 'You must select subcategory' : ''; }
  getNameError() { return this.editItemForm.name.hasError('required') ? 'You must enter item name' : ''; }
  getDescriptionError() { return this.editItemForm.description.hasError('required') ? 'You must enter description' : ''; }
  getPriceError() { return this.editItemForm.price.hasError('required') ? 'You must enter price' : ''; }
  getImageError() { return this.editItemForm.image.hasError('required') ? 'You must select image' : ''; }

}
