import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-event-or-product',
  templateUrl: './create-event-or-product.component.html',
  styleUrls: ['./create-event-or-product.component.scss']
})
export class CreateEventOrProductComponent implements OnInit {

  strategyId: any;
  date: any;

  activities: Array<any> = [];
  formTypes: Array<any> = [
    {
      name: 'Evento de cierre',
      type: 'event'
    },
    {
      name: 'Product parcial',
      type: 'parcialProduct'
    },
  ];
  loading: boolean = false;

  eventForm: FormGroup = new FormGroup({
    name: new FormControl(null, []),
    instructions: new FormControl(null, []),
    type: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    parcialProduct: new FormControl(null, [Validators.required]),
    strategyId: new FormControl(null, [Validators.required]),
    resources: new FormControl([], []),
  });

  public get formatedDate() {
    if(!this.date) return '';
    return moment(this.date).format('DD/MM/YY');
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
      this.strategyId = params['strategyId'];
      this.date = params['date'];
      
      this.eventForm.get('date')?.setValue(new Date(moment(this.date).toISOString()));
      this.eventForm.get('strategyId')?.setValue(this.strategyId);
      this.GetStrategyTeacherActivities();
    });
  }

  GoBack() {
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${this.date}`);
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
    let event = {
      ...this.eventForm.value,
      date: moment(this.eventForm.value.date).tz(environment.timeZone).toISOString()
    }
    this.api.Post(`/Events`, {event}).subscribe(newEvent => {
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
