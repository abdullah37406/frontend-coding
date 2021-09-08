import { StaffNavigationComponent } from './staffPanel/staff-navigation/staff-navigation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { DashboardComponent } from './staffPanel/dashboard/dashboard.component';
import { AddcategoriesComponent } from './staffPANEL/addcategories/addcategories.component';
import { NavigationComponent } from './staffPANEL/navigation/navigation.component';
import { AllProductsComponent } from './staffPANEL/all-products/all-products.component';
import { AddproductComponent } from './staffPanel/addproduct/addproduct.component';
import { EditItemComponent } from './staffPanel/edit-item/edit-item.component';
import { TablesComponent } from './staffPanel/tables/tables.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'navigation',
  //   component: NavigationComponent,
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },
  // {
  //   path: 'addCategories',
  //   component: AddcategoriesComponent,
  // },
  // {
  {
    path: '',
    redirectTo: 'navigation',
    pathMatch: 'full'
  },
  {
    path: 'navigation',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'addItemCategories',
        pathMatch: 'full'
      },
      {
        path: 'allitems',
        component: AllProductsComponent,
      },
      {
        path: 'additems',
        component: AddproductComponent,
      },
      {
        path: 'edititems/:requestId',
        component: EditItemComponent,
      },
      {
        path: 'addItemCategories',
        component: AddcategoriesComponent,
      },
      {
        path: 'addTableCategories',
        component: TablesComponent,
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '**', redirectTo: 'staff-panel'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
