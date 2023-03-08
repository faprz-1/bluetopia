import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { CsvFileService } from 'src/app/services/csv-file.service';
import { DownloadFileService } from 'src/app/services/download-file-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-teachers-csv',
  templateUrl: './teachers-csv.component.html',
  styleUrls: ['./teachers-csv.component.scss']
})
export class TeachersCsvComponent implements OnInit {

  @ViewChild('verifyTeachersDataModal') verifyTeachersDataModal?: ModalDirective;

  step: number = 1;
  dataConversions: Array<any> = [
    {
      oldKey: 'Asignaturas',
      newKey: 'subjects'
    },
    {
      oldKey: 'Correo',
      newKey: 'email'
    },
    {
      oldKey: 'Extracurriculares',
      newKey: 'extracurricular'
    },
    {
      oldKey: 'Grado',
      newKey: 'grade'
    },
    {
      oldKey: 'Grupo',
      newKey: 'group'
    },
    {
      oldKey: 'Nombre',
      newKey: 'name'
    },
  ];
  teachers: Array<any> = [];
  loading: any = {
    uploading: false
  }

  constructor(
    private downloadFile: DownloadFileService,
    private csvService: CsvFileService,
    private api: ApiService,
    private toast: ToastService,
    public nav: NavigationService
  ) { }

  ngOnInit(): void {
  }

  DownloadTemplate() {
    this.step = 2;
    this.downloadFile.DownloadWithoutApi("assets/docs/teachersTemplate.csv", 'teachersTemplate.csv');
  }

  OnFileChanged(event: any): void {
    const file = event.target.files[0];
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csvService.ReadCSV(FILE_READER.result).then(res => {
        this.teachers = this.FormatData(res.data);
        this.verifyTeachersDataModal?.show();
      });
    };
    if(file) {
      FILE_READER.readAsText(file, 'ISO-8859-1');
      this.step = 3;
    }
  }

  FormatData(teachers: Array<any>) {
    const user = this.api.GetUser();
    return teachers.map(teacher => {
      let teacherFormatted: any = {};
      this.dataConversions.forEach(conversion => {
        if(conversion.newKey == 'extracurricular') {
          let yesCases = ['si', '1', 1];
          teacherFormatted[conversion.newKey] = yesCases.includes(teacher[conversion.oldKey]?.toLowerCase());
        }
        else teacherFormatted[conversion.newKey] = teacher[conversion.oldKey];
      });
      teacherFormatted.subjects = teacherFormatted.subjects.split(',').map((s: string) => s.trim());
      teacherFormatted.schoolUserId = user.id;
      return teacherFormatted;
    });
  }

  UploadTeachers() {
    this.loading.uploading = true;
    this.api.Post(`/Teachers/Array`, {teachers: this.teachers}).subscribe(newTeachers => {
      this.toast.ShowSuccess(`Maestros agregados correctamente: ${newTeachers.length}`);
      this.loading.uploading = false;
      this.verifyTeachersDataModal?.hide();
    }, err => {
      console.error("Error at uploading teachers", err);
      this.loading.uploading = false;
    });
  }

}
