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
    debugger
  }
  getAllContactsError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
}
