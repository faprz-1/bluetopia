import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

const BASE_LOADING_MESSAGE = "Cargando...";
const BASE_LOADING_DURATION = 2000;

@Injectable({
	providedIn: 'root'
})
export class LoadingService {

	private loadingElement: HTMLIonLoadingElement;
    private isLoading: boolean = false;

  	constructor(protected loadingController: LoadingController) { 
  		this.InitializeLoadingElement();
  	}

  	public async InitializeLoadingElement() {
        this.loadingElement = await this.loadingController.create({
            // message: BASE_LOADING_MESSAGE,
            duration: BASE_LOADING_DURATION,
            translucent : true
        })
    }

    public Show() {
        if (this.loadingElement && !this.isLoading) {
            this.loadingElement.present()
            this.isLoading = true
        }
    }

    public Dismiss() {
        if (this.loadingElement) {
            this.loadingElement.dismiss()
            this.isLoading = false
        }
    }
}
