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
}
