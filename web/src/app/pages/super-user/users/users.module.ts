import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { TreeModule } from '@circlon/angular-tree-component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileChooserModule } from 'src/app/components/file-chooser/file-chooser.module';
import { UserCardModule } from './user-card/user-card.module';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    ModalModule.forRoot(),
    FileChooserModule,
    UserCardModule
  ]
})
export class UsersModule { }
