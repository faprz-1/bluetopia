import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static password: any = '';
  static confirmPassword: any = '';

  constructor() { }

  static GetValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = [
      {
        name: 'required',
        label: 'Campo requerido',
      },
      {
        name: 'invalidRFC',
        label: 'No tiene el formato adecuado',
      },
      {
        name: 'invalidEmailAddress',
        label: 'Correo inválido',
      },
      {
        name: 'invalidPassword',
        label: 'Las contraseñas no coinciden',
      },
      {
        name: 'minlength',
        label: `Mínimo de Caracteres ${validatorValue.requiredLength}`,
      },
      {
        name: 'maxlength',
        label: `Máximo de Caracteres ${validatorValue.requiredLength}`,
      },
      {
        name: 'invalidNumber',
        label: `Solo números enteros, o con decimal`
      },
    ];

    return config.find(v => v.name == validatorName);
  }

  static CheckOnlyNumbers(control: AbstractControl | null) {
    const patron = /^[1-9]\d*\.?\d*$/;
    if (patron.test(control?.value)) {
      if (control?.value == 0) {
        return { 'invalidNumber': true };
      }
      return null;
    } else {
      return { 'invalidNumber': true };
    }
  }

  static EmailValidator(control: AbstractControl | null) {
    const patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (control?.value.match(patron)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static RfcValidator(control: AbstractControl | null) {
    const patron = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    if (control?.value && control?.value.match(patron)) {
      return null;
    } else {
      return { 'invalidRFC': true };
    }
  }
}
