import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
    public toastr: ToastrService
  ) { }

  ShowSuccess(msg: string) {
    return this.toastr.success(msg, 'Correcto');
  }

  ShowError(msg: string) {
    return this.toastr.error(msg, 'Error');
  }

  ShowWarning(msg: string) {
    return this.toastr.warning(msg, 'Alerta!');
  }

  ShowInfo(msg: string) {
    return this.toastr.info(msg);
  }
}
