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

  @ViewChild('confirmationModal') confirmationModal?: ModalDirective;
  areStudentsValid: boolean = true;

  dataConversions: Array<any> = [
    {
      oldKey: 'Nombre (Campo obligatoio)',
      newKey: 'name'
    },
    {
      oldKey: 'Primer Apellido (Campo obligatoio)',
      newKey: 'fatherLastname'
    },
    {
      oldKey: 'Segundo Apellido',
      newKey: 'motherLastname'
    },
    {
      oldKey: 'CURP (Campo obligatoio)',
      newKey: 'registerNumber'
    },
    {
      oldKey: 'Grado (Campo obligatoio)',
      newKey: 'grade'
    },
    {
      oldKey: 'Grupo (Campo obligatoio)',
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
      this.csvService.ReadCSV(FILE_READER.result).then((res) => {
        this.students = this.FormatData(res.data);
        if(this.students.length == 0) this.toast.ShowWarning("Sin alumnos por registrar");
        this.areStudentsValid = this.ValidateStudents(this.students);
        if(this.areStudentsValid && this.students.length > 0) this.step++;
        else this.step = 1;
      });
    };
    if(file) {
      if(this.instructionsStep < 3 && this.areStudentsValid && this.students.length > 0) this.instructionsStep = 3;
      FILE_READER.readAsText(file, 'UTF-8');
    }
  }
  
  FormatData(students: Array<any>) {
    const user = this.api.GetUser();
    return students.map(student => {
      let studentFormatted: any = {};
      this.dataConversions.forEach(conversion => {
        studentFormatted[conversion.newKey] = student[conversion.oldKey];
      });
      studentFormatted.schoolId = user.schoolId;
      studentFormatted.teacherId = user.teacher.id;
      return studentFormatted;
    });
  }
  
  UploadStudents() {
    this.loading.uploading = true;
    this.api.Post(`/Students/Array`, {students: this.students}).subscribe((newStudents: any) => {
      this.toast.ShowSuccess(`${newStudents.length} Estudiantes agregados correctamente`);
      this.loading.uploading = false;
      this.confirmationModal?.show();
    }, err => {
      this.toast.ShowError(`Error al subir a los estudiantes`);
      console.error("Error at uploading students", err);
      this.loading.uploading = false;
    });
  }

  ValidateStudents(students: Array<any>): boolean {
    let valid = true;
    let logsIds: Array<string> = ['name', 'fatherLastname', 'motherLastname', 'registerNumber']
    let logsMap: Map<string, any> = new Map();
    students.forEach(student => {
      if(!student.name) {
        valid = false;
        logsMap.set(logsIds[0], {
          required: true,
          message: 'Algunos estudiantes no tienen nombre'
        });
      }
      if(!student.fatherLastname) {
        logsMap.set(logsIds[0], {
          required: false,
          message: 'Algunos estudiantes no tienen apellido paterno'
        });
      }
      if(!student.motherLastname) {
        logsMap.set(logsIds[2], {
          required: false,
          message: 'Algunos estudiantes no tienen apellido materno'
        });
      }
      if(!student.registerNumber) {
        valid = false;
        logsMap.set(logsIds[3], {
          required: true,
          message: 'Algunos estudiantes no tienen número de registro'
        });
      }
    });
    logsMap.forEach(value => {
      if(value.required) this.toast.ShowError(value.message);
      else this.toast.ShowWarning(value.message);
    });
    return valid;
  }

}
