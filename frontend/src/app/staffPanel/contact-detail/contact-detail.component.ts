import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { io } from "socket.io-client";
import { AuthService } from 'src/app/auth/auth.service';
import { ContactInfo } from 'src/app/models/contact-info';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  private socket: any;
  detail="no";
  constructor(
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
  ) { this.socket = io('http://localhost:8000') }
  specificContact=new ContactInfo();
  dataArray:ContactInfo[]=[]

  ngOnInit(): void {
    this.socket.on('notification', data => {
    this.specificContact.id=data;
    this.showDetails();
    });
  }
  showDetails(){
    this.Jarwis.getDetail(this.specificContact).subscribe(
      (data) => this.setIdforDetailSuccess(data),
      (error) => this.setIdforDetailError(error)
    );
  }
  setIdforDetailSuccess(data) {
    this.detail="yes";
   this.specificContact=data.getDetail;
   debugger

  }
  setIdforDetailError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.message, "", {
      timeOut: 1000,
      closeButton: true,
    });
  }
}
