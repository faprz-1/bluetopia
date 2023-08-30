import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-library-file-selector-modal',
  templateUrl: './library-file-selector-modal.component.html',
  styleUrls: ['./library-file-selector-modal.component.scss']
})
export class LibraryFileSelectorModalComponent implements OnInit {

  @ViewChild('libraryFileSelectorModal') modal?: ModalDirective;
  @Output() onFilesSelectd: EventEmitter<any> = new EventEmitter<any>();

  user: any = null;
  files: Array<any> = [];

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.GetLibraryFiles();
  }

  public OpenModal() {
    this.modal?.show();
  }

  public CloseModal() {
    this.modal?.hide()
  }

  GetLibraryFiles() {
    this.api.Get(`/Usuarios/${this.user.schoolId}/FileLibrary`).subscribe(files => {
      this.files = files;
    }, err => {
      console.error("Error getting the files", err);
    });
  }

  ToggleFile(file: any) {
    if(!file.selected) file.selected = true;
    else file.selected = false;
  }

  SelectFiles() {
    this.onFilesSelectd.emit(this.files.filter(file => file.selected));
  }

  Reset() {
    this.files.forEach(file => file.selected = false);
  }

}
