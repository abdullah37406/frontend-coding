import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ContactInfo } from 'src/app/models/contact-info';
import { ContactDetailInfo } from 'src/app/models/contactDetail-inf';
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
  addContact = new ContactInfo()
  facebook = false;
  twitter = false;
  linkedin = false;
  phonemask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]


  contactImage = "/assets/user.jpg"
  addContactFormGroup: FormGroup;
  @ViewChild(FormGroupDirective) myform;
  public addContactForm = {
    firstName: new FormControl('', [Validators.required]),
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
    this.addContact.contactDetail = new ContactDetailInfo()
this.checkPhoneValidity()
  }
  createForm() {
    this.addContactFormGroup = this.fb.group(this.addContactForm);
  }
  checkPhoneValidity(){

    this.addContactFormGroup.get('primaryPhone').valueChanges.subscribe(val => {
      let rep = /_/gi;
      let rep1 = /-/gi;
      if(this.addContactForm.primaryPhone.value){
        let phoneNumber = this.addContactForm.primaryPhone.value.replace(rep, '').replace(rep1, '');
        if (phoneNumber.length > 0 && phoneNumber.length < 11) {
          this.addContactFormGroup.get('primaryPhone').setErrors({ 'notFull': true }); 
        }
      }
    });
  }

  onSubmitContactDetail() {
    if (this.addContactFormGroup.invalid) {
      return
    }
    this.addContact.firstName = this.addContactForm.firstName.value;
    this.addContact.lastName = this.addContactForm.lastName.value;
    this.addContact.designation = this.addContactForm.designation.value;
    this.addContact.contactDetail.priPhone = this.addContactForm.primaryPhone.value;
    this.addContact.contactDetail.secPhone = this.addContactForm.secondaryPhone.value;
    this.addContact.contactDetail.secEmail = this.addContactForm.secondaryEmail.value;
    this.addContact.contactDetail.priEmail = this.addContactForm.primaryEmail.value;
    this.addContact.contactDetail.meeting = this.addContactForm.meeting.value;
    this.addContact.contactDetail.bio = this.addContactForm.bio.value;
    this.addContact.contactDetail.facebook=this.facebook;
    this.addContact.contactDetail.twitter=this.twitter;
    this.addContact.contactDetail.linkedin=this.linkedin;
    this.Jarwis.createContact(this.addContact).subscribe(
      (data) => this.createContactSuccess(data),
      (error) => this.createContactError(error)
    );
  }
  createContactSuccess(data) {
    this.myform.resetForm();
    this.contactImage="/assets/user.jpg";
    this.facebook=false;
    this.twitter=false;
    this.linkedin=false;
    this.snotifyService.clear();
    this.snotifyService.success(data.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  createContactError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
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
        this.contactImage = file.preview;
        this.addContact.file = file.preview;
        this.addContact.imgPath = file.name;
        debugger
        // this.addContact.newImage=1;
      }
    };
    return false;
  };

  getNameError() { return this.addContactForm.firstName.hasError('required') ? 'You must enter first name' : ''; }
  getDesignationError() { return this.addContactForm.designation.hasError('required') ? 'You must enter designation' : ''; }
  getPrimaryPhoneError() { return this.addContactForm.primaryPhone.hasError('required') ? 'You must enter contact number' :
    this.addContactForm.primaryPhone.hasError('notFull') ? 'You must enter Complete Cell Number' : '';}
  getPrimaryEmailError() { return this.addContactForm.primaryEmail.hasError('required') ? 'You must enter email' : ''; }
  getBioError() { return this.addContactForm.bio.hasError('required') ? 'You must enter bio' : ''; }
}
