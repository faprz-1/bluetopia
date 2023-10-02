import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/services/api.service';
import { CsvFileService } from 'src/app/services/csv-file.service';
import { DownloadFileService } from 'src/app/services/download-file-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-students-data',
  templateUrl: './students-data.component.html',
  styleUrls: ['./students-data.component.scss']
})
export class StudentsDataComponent implements OnInit {

  user: any = null;
  grades: Array<any> = [];
  groups: Array<any> = [];
  gradeSelected: any = null;
  groupSelected: any = null;
  students: Array<any> = [];
  isEditing: boolean = false;
  loading: any = {
    getting: false,
    creating: false,
  }

  constructor(
    public nav: NavigationService,
    private api: ApiService,
    private toast: ToastService,
    private downloadFile: DownloadFileService,
    private csvService: CsvFileService,
  ) { }

  ngOnInit(): void {
    this.user = this.api.GetUser();
    this.GetTeacherGroups();
     this.SetGroupsOfSelectedGrade(this.gradeSelected);
  }

   GetTeacherGroups() {
    let user = this.api.GetUser();
    this.api.Get(`/TeacherGroups/of/${user.teacher?.id}`).subscribe(
      (groups) => {
        this.SetGrades(groups);
      },
      (err) => {
        console.error('Error getting groups', err);
      }
    );
  }

   SetGrades(teacherGroups: any) {
    this.grades = [];
    let groupedByGrade = this.GroupByProperty(teacherGroups, 'gradeId');
    groupedByGrade.forEach((grade: any) => {
      let auxGrade: any = grade[0].grade;
      auxGrade.groups = grade.map((item: any) => item.group);
      this.grades.push(auxGrade);
    });
    this.grades = this.SortbyName(this.grades);
    
  }

   GroupByProperty(teacherGroups: any, property: string) {
    const groupedData: any = Object.values(
      teacherGroups.reduce((result: any, item: any) => {
        const valueToGroupBy = item[property];
        if (!result[valueToGroupBy]) {
          result[valueToGroupBy] = [];
        }
        result[valueToGroupBy].push(item);
        return result;
      }, {})
    );
    
    return groupedData;
  }

  SetGroupsOfSelectedGrade(gradeId:any){
    this.groups = [];
    if(!gradeId || gradeId == null || gradeId == 0){
       this.groups = [];
      }
    else{
      let selectedGrade = this.grades.filter((grade:any)=> grade.id == gradeId);
      this.groups = selectedGrade.length > 0 ? selectedGrade[0].groups:[];
    }
    this.groups = this.SortbyName(this.groups);
  }


  SortbyName(objects:any){
    return objects.sort((a:any, b:any) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  };

  GetStudents() {
    if(!this.gradeSelected || !this.groupSelected) {
      this.students = [];
      this.loading.getting = false;
      return;
    }
    this.SetGroupsOfSelectedGrade(this.gradeSelected.id);
    this.loading.getting = true;
    let endpoint = `/Students`;
    switch (this.user.role.name) {
      case 'School': endpoint += `/OfSchool/${this.user.id}`; break;
      case 'Teacher': endpoint += `/OfTeacher/${this.user.id}`; break;
      default: endpoint += `/OfSchool`; break;
    }
    endpoint += `/FilteredBy/Grade/${!!this.gradeSelected ? this.gradeSelected.id : 0}/Group/${!!this.groupSelected ? this.groupSelected.id : 0}`;
    this.api.Get(endpoint).subscribe(students => {
      this.students = this.SortInAlphabeticalOrder(students);
      this.loading.getting = false;
    }, err => {
      console.error("Error getting students", err);
      this.loading.getting = false;
    });
  }

  SortInAlphabeticalOrder(students:any){
    const mergedData = students.map((item:any) => ({
      ...item,
      fullName: `${item.fatherLastname} ${item.motherLastname}`,
    }));
    const sortedData = mergedData.sort((a:any, b:any) => {
      return a.fullName.localeCompare(b.fullName);
    });
    return sortedData;
  }

  AddGradeOrGroup() {
    this.loading.creating = true;
    this.api.Post(`/Grades/GradeOrGroup`, {}).subscribe(newData => {
      this.toast.ShowSuccess(`Datos agregados`);
      this.addGradeOrGroupModal?.hide();
      // this.GetGrades();
      this.loading.creating = false;
    }, err => {
      console.error("Error creating grade or group", err);
      this.loading.creating = false;
    });
  }

  // ---------------------------------- Add students by CSV ---------------------------------- //
  @ViewChild('addGradeOrGroupModal') addGradeOrGroupModal?: ModalDirective;

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
  studentsToUpload: Array<any> = [];
  areStudentsValid: boolean = true;

  DownloadTemplate() {
    this.downloadFile.DownloadWithoutApi("assets/docs/studentsTemplate.csv", 'studentsTemplate.csv');
  }

  OnFileChanged(event: any): void {
    const file = event.target.files[0];
    if(!file) return;
    const FILE_READER = new FileReader();
    FILE_READER.onload = (reader) => {
      this.csvService.ReadCSV(FILE_READER.result).then(res => {
        this.studentsToUpload = this.FormatData(res.data);
        this.areStudentsValid = this.ValidateStudents(this.studentsToUpload);
      });
    };
    if(file) {
      FILE_READER.readAsText(file, 'ISO-8859-3');
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
      studentFormatted.teacherUserId = user.id;
      return studentFormatted;
    });
  }
  
  UploadStudents() {
    this.loading.uploading = true;
    this.api.Post(`/Students/Array`, {students: this.studentsToUpload}).subscribe((newStudents: any) => {
      this.toast.ShowSuccess(`${newStudents.length} Estudiantes agregados correctamente`);
      this.addGradeOrGroupModal?.hide();
      this.loading.uploading = false;
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

  GoToStudentsCSVPage(){
    this.nav.GoToUserRoute('registrar-estudiantes/csv');
  }

}
