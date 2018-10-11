import { Injectable,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastService {

  constructor(public toastr: ToastsManager) {    
	}

	  showSuccess(msg) {
        return this.toastr.success(msg, 'Correcto');
      }
    
      showError(msg) {
        return this.toastr.error(msg, 'Error');
      }
    
      showWarning(msg) {
       return this.toastr.warning(msg, 'Alerta!');
      }
    
      showInfo(msg) {
        return this.toastr.info(msg);
      }
      
      showCustom(msg) {
        return this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
      }

}
