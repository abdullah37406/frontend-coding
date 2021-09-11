import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ContactInfo } from 'src/app/models/contact-info';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {

  allcontactsArray:ContactInfo[]=[]
  specificContact=new ContactInfo();
  searchText: string = '';
  copylistOfData = [];
  duplicateArray=[];
  constructor(
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllContacts();
  }
  getAllContacts() {
    this.Jarwis.getAllContacts().subscribe(
      (data) => this.getAllContactsSuccess(data),
      (error) => this.getAllContactsError(error)
    );
  }
  getAllContactsSuccess(data) {
   this.allcontactsArray=data.getContacts;
  //  this.allcontactsArray.forEach(contact=>{
  //   var newContact={
  //     name:contact.firstName+contact.lastName,
  //     designation:contact.designation,
  //   }
  //  this.duplicateArray.push(newContact);
  // })
  this.copylistOfData=this.allcontactsArray;
  }
  getAllContactsError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  showDetails(index){
    this.specificContact.id=this.allcontactsArray[index].id;
    this.Jarwis.setIdforDetail(this.specificContact).subscribe(
      (data) => this.setIdforDetailSuccess(data),
      (error) => this.setIdforDetailError(error)
    );
  }
  setIdforDetailSuccess(data) {
   this.allcontactsArray=data.getContacts;
  }
  setIdforDetailError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
  search(search) {
    const targetValue: any[] = [];
    this.copylistOfData.forEach((value: any) => {
      let keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        if (value[keys[i]] && (value[keys[i]].toString().toLocaleLowerCase().includes(search) )) {
          targetValue.push(value);
          break;
        }
      }
    });
    this.allcontactsArray = targetValue;
  }
}
