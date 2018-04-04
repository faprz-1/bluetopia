import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';



export const ADMIN_ROUTES: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'edituser/:id', component: UserEditComponent },
];
