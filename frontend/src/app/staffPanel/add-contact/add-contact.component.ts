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
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { }
  addItem = new CategoryInfo()
  itemImage = "/assets/user.jpg"
  addItemFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) myform;
  public addItemForm = {
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    designation: new FormControl('', [Validators.required]),
    primaryPhone: new FormControl('', [Validators.required]),
    secondaryPhone: new FormControl(''),
    primaryEmail: new FormControl('', [Validators.required]),
    secondaryEmail: new FormControl(''),
    bio: new FormControl('', [Validators.required]),
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    linkedin: new FormControl(''),
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.addItemFormGroup = this.fb.group(this.addItemForm);
  }

  onSubmitItemDetail() {
    //   if (this.addItemFormGroup.invalid) {
    //     return
    //   }
    //   this.addItem.parentCategory = this.addItemForm.parentCategory.value;
    //   this.addItem.name = this.addItemForm.subCategory.value;
    //   this.addItem.itemInfo.name = this.addItemForm.name.value;
    //   this.addItem.itemInfo.description = this.addItemForm.description.value;
    //   this.addItem.itemInfo.price = this.addItemForm.price.value;
    //   this.addItem.itemOrTable = "itemCreate";
    //   this.Jarwis.createCategory(this.addItem).subscribe(
    //     (data) => this.categorySubmission(data),
    //     (error) => this.categorySubmissionError(error)
    //   );
    // }
    // categorySubmission(data: any) {
    //   this.myform.resetForm();
    //   this.fileList=[];
    //   this.snotifyService.clear();
    //   this.snotifyService.success(data.message, "", {
    //     timeOut: 1000,
    //     closeButton: true,
    //   });
    //   this.getItemCategories();
    // }
    // categorySubmissionError(error: any) {
    //   this.snotifyService.clear();
    //   this.snotifyService.error(error.error.message, "", {
    //     timeOut: 1000,
    //     closeButton: true,
    //   });
  }
  fileList: NzUploadFile[] = [];
  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.readAsDataURL(file as unknown as File);
    reader.onload = () => {
      file.preview = reader.result;
      file.originFileObj = file as unknown as File;
      this.fileList = this.fileList.concat(file);
      if (this.fileList.length > 0) {
        this.itemImage = file.preview;
        // this.editItem.itemInfo.file1 = file.preview;
        // this.editItem.itemInfo.imagePath = file.name;
        // this.editItem.itemInfo.newImage=1;
      }
    };
    return false;
  };

  getNameError() { return this.addItemForm.name.hasError('required') ? 'You must enter first name' : ''; }
  getDesignationError() { return this.addItemForm.designation.hasError('required') ? 'You must enter designation' : ''; }
  // getLastNameError() { return this.addItemForm.lastName.hasError('required') ? 'You must enter last name' : ''; }
}
