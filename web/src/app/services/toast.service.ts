import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService 
{
  constructor(public toastr: ToastrService) 
  {}

  ShowSuccess(msg) 
  {
    return this.toastr.success(msg, 'Correcto');
  }
    
  ShowError(msg) 
  {
    return this.toastr.error(msg, 'Error');
  }
    
  ShowWarning(msg) 
  {
    return this.toastr.warning(msg, 'Alerta!');
  }
    
  ShowInfo(msg) 
  {
    return this.toastr.info(msg);
  }
}
