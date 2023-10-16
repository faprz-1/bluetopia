import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {
  strategyId: any;
  date: any;

  activities: Array<any> = [];

  loading: boolean = false;
  canContinue: boolean = true;

  activityForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    instructions: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    strategyId: new FormControl(null, [Validators.required]),
    resources: new FormControl([], []),
    maxCalification: new FormControl([],[Validators.required])
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

  IsANumber(input: any){
    if (isNaN(Number(input))) {
       this.toast.ShowError('Solo valores numéricos')
       this.canContinue = false;
  }else {
    this.canContinue = true;
  }
}

// ThatDateAlreadyPassed(date: any){
//   let startDate = moment(date[0])
//   let today = moment();
//  if(startDate.isBefore(today, 'day')) { 
//   this.toast.ShowError('La fecha proporcionada ya ha pasado, por favor elija otra fecha')
// this.canContinue = false;
//  }else{
//   this.canContinue = true;
//  }
// }
  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.date = params['date'];
      
      this.activityForm.get('date')?.setValue(new Date(moment(this.date).toISOString()));
      this.activityForm.get('strategyId')?.setValue(this.strategyId);
    });
  }

  GoBack() {
    this.nav.GoToUserRoute(`mis-estrategias/${this.strategyId}/calendario/${this.date}`);
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

        this.activityForm.get('resources')?.value.push(fileObj);
      };
      reader.readAsBinaryString(file);
    });
  }
  
  OnLibraryFilesSelected(files: Array<any>) {
    this.activityForm.get('resources')?.setValue(
      this.activityForm.get('resources')?.value.concat(files)
    );
  }

  SaveActivity() {
    if(this.activityForm.invalid) {
      this.toast.ShowWarning(`Favor de llenar todos los campos`);
      this.activityForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    let event = {
      ...this.activityForm.value,
      // date: moment(this.activityForm.value.date).tz(environment.timeZone).toISOString(),
      date: moment(this.date).tz(environment.timeZone).toISOString(),
        strategyId: this.strategyId,
        isActivity: true,
    }
    this.api.Post(`/ParcialProducts/activity`, event).subscribe(newEvent => {
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
      case 'new': return this.activityForm.get('resources')?.value.filter((file: any) => !file.id);
      case 'old': return this.activityForm.get('resources')?.value.filter((file: any) => !!file.id);
      default: return []
    }
  }

}
