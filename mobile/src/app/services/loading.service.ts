import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

const BASE_LOADING_MESSAGE = 'Cargando...';
const BASE_LOADING_DURATION = 0;

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public get isLoading() {
    return this.loadingLevel > 0;
  }
  public loadingLevel = 0;

  private loadingController: LoadingController;
  private loadingElement: HTMLIonLoadingElement;
  private isBusy = false;

  constructor() {}

  public Initialize(loadingController: LoadingController) {
    this.loadingController = loadingController;
  }

  public async Show() {
    if(this.isBusy) await this.WaitUntilFree();
    this.loadingLevel++;
    if (this.isLoading) await this.CreateElement();
  }

  public async Dismiss() {
    if(this.isBusy) await this.WaitUntilFree();
    this.loadingLevel--;
    if (!this.isLoading) await this.DeleteElement();
  }

  private async CreateElement() {
    if (!this.loadingElement) {
      this.isBusy = true;
      this.loadingElement = await this.loadingController.create({
        message: BASE_LOADING_MESSAGE,
        duration: BASE_LOADING_DURATION,
      });
      await this.loadingElement.present();
      this.isBusy = false;
    }
  }

  private async DeleteElement() {
    if (this.loadingElement) {
      this.isBusy = true;
      await this.loadingElement.dismiss();
      this.loadingElement = undefined;
      this.isBusy = false;
    }
  }

  private async WaitUntilFree() {
    while(this.isBusy) await this.Sleep(50);
  }

  Sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}
