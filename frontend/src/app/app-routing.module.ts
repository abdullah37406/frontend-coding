import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './staffPanel/dashboard/dashboard.component';
import { AddContactComponent } from './staffPanel/add-contact/add-contact.component';
import { AllContactsComponent } from './staffPanel/all-contacts/all-contacts.component';
import { ContactDetailComponent } from './staffPanel/contact-detail/contact-detail.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'addContact',
    pathMatch: 'full'
  },
  {
    path: 'addContact',
    component: AddContactComponent,
  },
  {
    path: 'dahboard',
    component: DashboardComponent,
  },
  {
    path: 'allContacts',
    component: AllContactsComponent,
  },
  {
    path: 'contactDetail',
    component: ContactDetailComponent,
  },
  // {
  //   path: 'navigation',
  //   component: NavigationComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'addContact',
  //       pathMatch: 'full'
  //     },
      
      
      
  //   ]
  // },
  {
    path: '**', redirectTo: 'staff-panel'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
