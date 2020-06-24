import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { FileChooserModule } from '../../../components/file-chooser/file-chooser.module';
import { TreeModule } from 'angular-tree-component';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { UserCardModule } from './user-card/user-card.module';


const MODULE_ROUTES = [
  {path:'', component: UsersComponent}
]
@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MODULE_ROUTES),
    ModalModule.forRoot(),
    UserCardModule,
    FormsModule,
    FileChooserModule,
    // MatSlideToggleModule,
    TreeModule.forRoot()
  ]
})
export class UsersModule { }
