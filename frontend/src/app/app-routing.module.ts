import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './staffPANEL/navigation/navigation.component';
import { DashboardComponent } from './staffPanel/dashboard/dashboard.component';
import { AddContactComponent } from './staffPanel/add-contact/add-contact.component';
import { AllContactsComponent } from './staffPanel/all-contacts/all-contacts.component';
import { ContactDetailComponent } from './staffPanel/contact-detail/contact-detail.component';


const routes: Routes = [
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
        redirectTo: 'addContact',
        pathMatch: 'full'
      },
      {
        path: 'dahboard',
        component: DashboardComponent,
      },
      {
        path: 'addContact',
        component: AddContactComponent,
      },
      {
        path: 'allContacts',
        component: AllContactsComponent,
      },
      {
        path: 'contactDetail',
        component: ContactDetailComponent,
      },
    ]
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
