import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.scss']
})
export class EventDayComponent implements OnInit {

  grade: any;
  group: any;
  templateId: any;
  strategyId: any;
  eventDate: any;

  activities: Array<any> = [];
  loading: boolean = false;

  eventForm: FormGroup = new FormGroup({
    start: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
    closure: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    strategyId: new FormControl(null, [Validators.required]),
    parcialProjectId: new FormControl(null, [Validators.required]),
    resources: new FormControl([], []),
  });

  public get formatedDate() {
    if(!this.eventDate) return '';
    return moment(this.eventDate).format('DD/MM/YY');
  }

  constructor(
    private api: ApiService,
    private nav: NavigationService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.GetParams();
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.grade = params['grade'];
      this.group = params['group'];
      this.templateId = params['templateId'];
      this.strategyId = params['strategyId'];
      this.eventDate = params['eventDate'];
      
      this.eventForm.get('date')?.setValue(moment(this.eventDate).toISOString());
      this.eventForm.get('strategyId')?.setValue(this.strategyId);
      this.GetStrategyTeacherActivities();
    });
  }

  GoBack() {
    this.nav.GoToUserRoute(`grado/${this.grade}/grupo/${this.group}/plantillas/${this.templateId}/estrategias/${this.strategyId}/calendario`);
  }

  GetStrategyTeacherActivities() {
    this.api.Get(`/Strategies/${this.strategyId}/Activities`).subscribe(activities => {
      this.activities = activities.filter((activity: any) => !activity.eventId);
    }, err => {
      console.error("Error getting activities", err);
    });
  }

  OnFileSelected(event: any) {
    const files: FileList = event.target.files;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (readEvent: any) => {
        var binaryString = readEvent.target.result;
        let fileObj = {
          "encodedFileContainer": "resources",
          "base64File": btoa(binaryString),
          "name": file.name,
          "resize": false,
          "fileExtention": "." + file.name.split('.').pop()?.toLowerCase()
        };

        this.eventForm.get('resources')?.value.push(fileObj);
      };
      reader.readAsBinaryString(file);
    });
  }
  
  OnLibraryFilesSelected(files: Array<any>) {
    this.eventForm.get('resources')?.setValue(
      this.eventForm.get('resources')?.value.concat(files)
    );
  }

  SaveEvent() {
    if(this.eventForm.invalid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos`);
      this.eventForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.api.Post(`/Events`, {event: this.eventForm.value}).subscribe(newEvent => {
      this.loading = false;
      this.toast.ShowSuccess(`Evento creado correctamente`);
      this.GoBack();
    }, err => {
      console.error("Error creating event", err);
      this.loading = false;
    });
  }

  GetFiles(type: string): Array<any> {
    switch (type) {
      case 'new': return this.eventForm.get('resources')?.value.filter((file: any) => !file.id);
      case 'old': return this.eventForm.get('resources')?.value.filter((file: any) => !!file.id);
      default: return []
    }
  }

}
