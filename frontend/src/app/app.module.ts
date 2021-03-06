import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from './core/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { IconsModule } from 'angular-bootstrap-md';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {MatDialogModule} from '@angular/material/dialog';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { DashboardComponent } from './staffPanel/dashboard/dashboard.component';
import { AllContactsComponent } from './staffPanel/all-contacts/all-contacts.component';
import { ContactDetailComponent } from './staffPanel/contact-detail/contact-detail.component';
import { AddContactComponent } from './staffPanel/add-contact/add-contact.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TextMaskModule } from 'angular2-text-mask';

registerLocaleData(en);

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
   
    DashboardComponent,
    AllContactsComponent,
    ContactDetailComponent,
    AddContactComponent,
    
  ],
  imports: [
    TextMaskModule ,
    NzDropDownModule,
    NzSwitchModule ,
    NzPopconfirmModule,
    MatDialogModule,
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    LayoutModule,
    IconsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/api/auth/signin']
      }
    }),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
