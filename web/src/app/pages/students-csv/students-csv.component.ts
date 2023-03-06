import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { CsvFileService } from 'src/app/services/csv-file.service';
import { DownloadFileService } from 'src/app/services/download-file-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-students-csv',
  templateUrl: './students-csv.component.html',
  styleUrls: ['./students-csv.component.scss']
})
export class StudentsCsvComponent implements OnInit {

  @ViewChild('studentsAlertModal') studentsAlertModal?: ModalDirective;

  dataConversions: Array<any> = [
    {
      oldKey: 'Nombre',
      newKey: 'name'
    },
    {
      oldKey: 'Apellido P',
      newKey: 'fatherLastname'
    },
    {
      oldKey: 'Apellido M',
      newKey: 'motherLastname'
    },
    {
      oldKey: 'Numero de registro',
      newKey: 'registerNumber'
    },
    {
      oldKey: 'Grado',
      newKey: 'grade'
    },
    {
      oldKey: 'Grupo',
      newKey: 'group'
    },
  ];
  students: Array<any> = [];
  loading: any = {
    uploading: false
  }
  step: number = 1;
  instructionsStep: number = 1;

  constructor(
    private downloadFile: DownloadFileService,
    private csvService: CsvFileService,
    private api: ApiService,
    private toast: ToastService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
    const user = this.api.GetUser();
    if(!!user && user.role.name == 'Teacher' && !!user.schoolUserId) this.nav.GoToUserRoute('');
  }

  DownloadTemplate() {
    if(this.instructionsStep < 2) this.instructionsStep = 2;
    this.downloadFile.DownloadWithoutApi("assets/docs/studentsTemplate.csv", 'studentsTemplate.csv');
  }

  Cancel() {
    if(this.step > 1) this.step--;
    else this.nav.GoToUserRoute('mis-estudiantes');
  }

  Continue() {
    switch (this.step) {
      case 2:
        this.UploadStudents();
        break;
    }
    if(this.step != 2) this.step++;
  }

  OnFileChanged(event: any): void {
    const file = event.target.files[0];
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csvService.ReadCSV(FILE_READER.result).then(res => {
        this.students = this.FormatData(res.data);
        this.step++;
      });
    };
    if(file) {
      if(this.instructionsStep < 3) this.instructionsStep = 3;
      FILE_READER.readAsText(file, 'ISO-8859-1');
    }
  }
  
  FormatData(students: Array<any>) {
    const user = this.api.GetUser();
    return students.map(student => {
      let studentFormatted: any = {};
      this.dataConversions.forEach(conversion => {
        studentFormatted[conversion.newKey] = student[conversion.oldKey];
      });
      if(user.role.name == 'School') studentFormatted.schoolUserId = user.id;
      else if(user.role.name == 'Teacher') studentFormatted.teacherUserId = user.id;
      return studentFormatted;
    });
  }
  
  UploadStudents() {
    this.loading.uploading = true;
    this.api.Post(`/Students/Array`, {students: this.students}).subscribe((newStudents: any) => {
      this.toast.ShowSuccess(`${newStudents.length} Estudiantes agregados correctamente`);
      this.loading.uploading = false;
      this.studentsAlertModal?.show();
    }, err => {
      console.error("Error at uploading students", err);
      this.loading.uploading = false;
    });
  }

}
