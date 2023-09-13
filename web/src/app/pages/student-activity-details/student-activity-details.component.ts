import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-student-activity-details',
  templateUrl: './student-activity-details.component.html',
  styleUrls: ['./student-activity-details.component.scss']
})
export class StudentActivityDetailsComponent implements OnInit {

  activityId:number | null = null;
  temporaryFile:any = null;
  fileCheck:boolean = false;

  public files: NgxFileDropEntry[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService:NavigationService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.activityId = params['activityId'];
    });
  }

  GoToActivities() {
    this.navigationService.GoToUserRoute(`mis-actividades`);
  }

  OnDropped(files: NgxFileDropEntry[]) {
    this.temporaryFile = files[0];
    // for (const droppedFile of files) {
    //   if (droppedFile.fileEntry.isFile) {
    //     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    //     fileEntry.file((file: File) => {
    //       console.info(droppedFile.relativePath, file);
    //     });
    //   } else {
    //     const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
    //     console.info(droppedFile.relativePath, fileEntry);
    //   }
    // }
  }

  OnFileOver(event:any){
    console.info(event);
  }

  onFileLeave(event:any){
    console.info(event);
  }

  OnFileChange (event:any, isAdding:boolean) {
    if (event.target.files != null && event.target.files.length > 0) {
      this.temporaryFile = event.target.files[0];
      if(isAdding) {this.fileCheck = false;}
    }
  }

  DeleteTemporaryFile(isAdding:boolean) {
    this.temporaryFile = null;
    if(isAdding) {this.fileCheck = true;}
  }
}
