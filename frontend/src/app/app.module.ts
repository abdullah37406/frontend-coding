import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
import { StaffNavigationComponent } from './staffPanel/staff-navigation/staff-navigation.component';
import { IconsModule } from 'angular-bootstrap-md';
import { DashboardComponent } from './staffPanel/dashboard/dashboard.component';
import { AddcategoriesComponent } from './staffPANEL/addcategories/addcategories.component';
import { NavigationComponent } from './staffPANEL/navigation/navigation.component';
import { AllProductsComponent } from './staffPANEL/all-products/all-products.component';
import { AddproductComponent } from './staffPanel/addproduct/addproduct.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { EditItemComponent } from './staffPanel/edit-item/edit-item.component'
import {MatDialogModule} from '@angular/material/dialog';
import { TableselectionComponent } from './staffPanel/tableselection/tableselection.component';
import { CustomerselectionComponent } from './staffPanel/customerselection/customerselection.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TablesComponent } from './staffPanel/tables/tables.component';

registerLocaleData(en);

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffNavigationComponent,
    DashboardComponent,
    AddcategoriesComponent,
    NavigationComponent,
    AllProductsComponent,
    AddproductComponent,
    EditItemComponent,
    TableselectionComponent,
    CustomerselectionComponent,
    TablesComponent
  ],
  imports: [
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
