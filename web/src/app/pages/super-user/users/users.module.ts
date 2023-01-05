import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from '@circlon/angular-tree-component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileChooserModule } from 'src/app/components/file-chooser/file-chooser.module';
import { UserCardModule } from './user-card/user-card.module';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';

const MODULE_ROUTES = [
  { path: '', component: UsersComponent }
];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    TreeModule,
    FormsModule,
    CommonModule,
    UserCardModule,
    FileChooserModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MODULE_ROUTES),
  ],
  // exports: [UsersComponent]
})
export class UsersModule { }
