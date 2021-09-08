import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-staff-navigation',
  templateUrl: './staff-navigation.component.html',
  styleUrls: ['./staff-navigation.component.css']
})
export class StaffNavigationComponent implements OnInit, AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private tokenStorage: TokenStorageService,
  ) {
    // console.log(this.tokenStorage.getToken());
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }
  logOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }
  reloadPage() {
    window.location.reload();
  }
  ngOnInit() {
  }

}
