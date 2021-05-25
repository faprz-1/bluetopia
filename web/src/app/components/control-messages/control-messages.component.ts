import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {
  @Input() control!: AbstractControl | null;

  constructor() { }

  ngOnInit() {}

  get errorMessage() {
    for (let propertyName in this.control?.errors) {
      if (this.control?.errors.hasOwnProperty(propertyName) && this.control?.touched) {
        return ValidationService.GetValidatorErrorMessage(propertyName, this.control?.errors[propertyName]);
      }
    }

    return null;
  }

}
