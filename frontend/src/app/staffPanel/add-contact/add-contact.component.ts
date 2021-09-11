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
  addContact = new CategoryInfo()
  facebook = false;
  twitter = false;
  linkedin = false;


  itemImage = "/assets/user.jpg"
  addContactFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) myform;
  public addContactForm = {
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    designation: new FormControl('', [Validators.required]),
    primaryPhone: new FormControl('', [Validators.required]),
    secondaryPhone: new FormControl(''),
    primaryEmail: new FormControl('', [Validators.required]),
    secondaryEmail: new FormControl(''),
    bio: new FormControl('', [Validators.required]),
    meeting: new FormControl(''),
    // facebook: new FormControl(''),
    // twitter: new FormControl(''),
    // linkedin: new FormControl(''),
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.addContactFormGroup = this.fb.group(this.addContactForm);
  }

  onSubmitItemDetail() {
    //   if (this.addContactFormGroup.invalid) {
    //     return
    //   }
    //   this.addContact.parentCategory = this.addContactForm.parentCategory.value;
    //   this.addContact.name = this.addContactForm.subCategory.value;
    //   this.addContact.itemInfo.name = this.addContactForm.name.value;
    //   this.addContact.itemInfo.description = this.addContactForm.description.value;
    //   this.addContact.itemInfo.price = this.addContactForm.price.value;
    //   this.addContact.itemOrTable = "itemCreate";
    //   this.Jarwis.createCategory(this.addContact).subscribe(
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

  getNameError() { return this.addContactForm.name.hasError('required') ? 'You must enter first name' : ''; }
  getDesignationError() { return this.addContactForm.designation.hasError('required') ? 'You must enter designation' : ''; }
  getPrimaryPhoneError() { return this.addContactForm.primaryPhone.hasError('required') ? 'You must enter contact number' : ''; }
  getPrimaryEmailError() { return this.addContactForm.primaryEmail.hasError('required') ? 'You must enter email' : ''; }
  getBoError() { return this.addContactForm.bio.hasError('required') ? 'You must enter bio' : ''; }
}
