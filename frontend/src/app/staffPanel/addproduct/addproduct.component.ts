import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
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
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})

export class AddproductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { }
  addItem = new CategoryInfo()

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  addItemFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) myform;
  itemCategories = [];
  itemSubcategories = [];

  public addItemForm = {
    subCategory: new FormControl('', [Validators.required]),
    parentCategory: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  }
  ngOnInit(): void {
    this.createForm();
    this.getItemCategories();
  }
  createForm() {
    this.addItemFormGroup = this.fb.group(this.addItemForm);
  }
  getItemCategories() {
    this.addItem.itemOrTable = "items";
    this.Jarwis.getParentCategories(this.addItem).subscribe(
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
  getDetails() {
    this.addItem.id = this.addItemForm.parentCategory.value;
    this.addItem.itemOrTable = "items";
    this.Jarwis.getcategorySubcategories(this.addItem).subscribe(
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
  onSubmitItemDetail() {
    if (this.addItemFormGroup.invalid) {
      return
    }
    this.addItem.parentCategory = this.addItemForm.parentCategory.value;
    this.addItem.name = this.addItemForm.subCategory.value;
    this.addItem.itemInfo.name = this.addItemForm.name.value;
    this.addItem.itemInfo.description = this.addItemForm.description.value;
    this.addItem.itemInfo.price = this.addItemForm.price.value;
    this.addItem.itemOrTable = "itemCreate";
    this.Jarwis.createCategory(this.addItem).subscribe(
      (data) => this.categorySubmission(data),
      (error) => this.categorySubmissionError(error)
    );
  }
  categorySubmission(data: any) {
    this.myform.resetForm();
    this.fileList=[];
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

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    this.addItem.itemInfo=new ItemInfo();
    reader.readAsDataURL(file as unknown as File);
    reader.onload = () => {
      file.preview = reader.result;
      file.originFileObj = file as unknown as File;
      this.fileList = this.fileList.concat(file);
      if (this.fileList.length > 0) {
        this.addItem.itemInfo.file1 = file.preview;
        this.addItem.itemInfo.imagePath = file.name;
      }
    };

    return false;
  };

  onRemove = (file: NzUploadFile): boolean => {
    if (this.fileList.length == 1) {
      this.addItemFormGroup.patchValue({
        image: ''
      });
    }

    return true;
  };

  getParentCategoryError() { return this.addItemForm.parentCategory.hasError('required') ? 'You must select parent category' : ''; }
  getSubCategoryError() { return this.addItemForm.subCategory.hasError('required') ? 'You must select subcategory' : ''; }
  getNameError() { return this.addItemForm.name.hasError('required') ? 'You must enter item name' : ''; }
  getDescriptionError() { return this.addItemForm.description.hasError('required') ? 'You must enter description' : ''; }
  getPriceError() { return this.addItemForm.price.hasError('required') ? 'You must enter price' : ''; }
  getImageError() { return  'You must select image' }

}
