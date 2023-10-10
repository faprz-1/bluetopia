import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { DownloadFileService } from 'src/app/services/download-file-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  eventId: string | null = null;
  event: any = null;
  evaluation: any = null;
  studentFiles: Array<any> = [];
  loading: any = {
    updating: false
  };
  crumbs: Array<any> = [
    {name: 'Mis actividades', route: `/inicio/student/calendario`},
    {name: 'Actividad', route: `/inicio/student/calendario`},
  ]

  maxScore = 0;
  constructor(
    private api: ApiService,
    private toast: ToastService,
    private activatedRoute: ActivatedRoute,
    public nav: NavigationService,
    private downloadService: DownloadFileService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.eventId = params['activityId'];

      this.GetEvent();
    });
  }

  GetEvent() {
    this.api.Get(`/Events/${this.eventId}`).subscribe(event => {
      this.event = event;
      this.maxScore = this.GetMaxValueOfRubric();
      this.GetStudentFiles();
    }, err => {
      console.error("Error getting parcial product", err);
    });
  }

  GetStudentFiles() {
    const user = this.api.GetUser();
    const instanceId = !!this.event.parcialProduct ? this.event.parcialProduct.id : this.event.id;
    this.api.Get(`/Evaluations/OfStudent/${user.student.id}/OfProduct/${instanceId}`).subscribe(evaluation => {
      this.evaluation = evaluation;
      this.CalculateScoreOfRubric(evaluation.rubricsCalifications);
      this.studentFiles = evaluation.studentFiles || [];
    }, err => {
      console.error("Error getting student evaluation", err);
    });
  }

  GetMaxValueOfRubric(){
    if(!this.event || !this.event.parcialProduct || !this.event.parcialProduct.rubric) return 100;
    let concepts = this.event.parcialProduct.rubric;
    let max = 0;
    concepts.forEach((concept: any)=>{
      const maxObject = concept.concepts.reduce((max:any, obj:any) => (obj.value > max.value ? obj : max), concept.concepts[0]);
      max += maxObject.value;
    });
    return max;
  }

  GetEventDetails(): {icon: string, type: string, title: string, instructions: string} {
    let details: {icon: string, type: string, title: string, instructions: string} = {
      icon: 'activity.png',
      type: 'Actividad',
      title: 'Título',
      instructions: 'Instrucciones',
    }
    if(this.event?.isFinal) {
      details.icon = 'event.png';
      details.type = `Evento de cierre`;
      details.title = this.event?.name;
      details.instructions = this.event?.instructions;
    }
    else if(this.event?.parcialProduct?.isFinal) {
      details.icon = 'final-product.png';
      details.type = `Producto final`;
      details.title = this.event?.parcialProduct.name;
      details.instructions = this.event?.parcialProduct.instructions;
    }
    else if(this.event?.parcialProduct?.isActivity) {
      details.icon = 'activity.png';
      details.type = `Actividad`;
      details.title = this.event?.parcialProduct.name;
      details.instructions = this.event?.parcialProduct.instructions;
    }
    else {
      details.icon = 'parcial-product.png';
      details.type = `Producto parcial`;
      details.title = this.event?.parcialProduct.name;
      details.instructions = this.event?.parcialProduct.instructions;
    }

    this.GetMaxValueOfRubric();
    return details;
  }

  DownloadResource(file: any) {
    this.downloadService.Download(file.URL, file?.name);
  }

  OnFileSelected(event: any) {
    const files: FileList = event.target.files;
    let filesArray = Array.from(files), cont = 0;
    if(!filesArray.length) return;
    filesArray.forEach(file => {
      const reader = new FileReader();
      reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;
        let fileObj = {
          "encodedFileContainer": "studentActivitiesFiles",
          "base64File": btoa(binaryString),
          "name": file.name,
          "resize": false,
          "fileExtention": "." + file.name.split('.').pop()?.toLowerCase()
        };

        this.UploadFile(fileObj);
      };
      reader.readAsBinaryString(file);
    });
  }

  UploadFile(file: any) {
    this.api.Patch(`/Evaluations/${this.evaluation.id}/UploadFile`, {
      file
    }).subscribe(evaluation => {
      this.GetStudentFiles();
    }, err => {
      console.error("Error getting student evaluation", err);
    });
  }

  DeleteFile(file: any) {
    this.api.Delete(`/Evaluations/${this.evaluation.id}/StudentFile/${file.id}`).subscribe(deleted => {
      this.GetStudentFiles();
    });
  }

  ToggleMarkAsDone() {
    this.loading.updating = true;
    this.api.Patch(`/Evaluations/${this.evaluation.id}/ToggleIsDone`, {}).subscribe(evaluation => {
      this.evaluation.isDone = evaluation.isDone;
      this.loading.updating = false;
    }, err => {
      this.loading.updating = false;
    });
  }

  CalculateScoreOfRubric(scores:any){
    if(!scores) return;
    const totalScore = scores.reduce((total:any, score:any) => total + score, 0);
    this.evaluation.calification = (totalScore / this.maxScore) * 100;
  }
}
