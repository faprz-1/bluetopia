import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private translate: TranslateService,
  ) {}

  public async IsInitialized() {
    while(!this.loadingController) await this.Sleep(50);
  }

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
    return new Promise(resolve => {
      this.translate.get('loading.message').subscribe(
        async (message) => {
          if (!this.loadingElement) {
            await this.WaitUntilControllerExists();
            this.isBusy = true;
            this.loadingElement = await this.loadingController.create({
              message,
              duration: BASE_LOADING_DURATION,
            });
            await this.loadingElement.present();
            this.isBusy = false;
            resolve(true);
          }
        }
      );
    });
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

  private async WaitUntilControllerExists() {
    while(!this.loadingController) await this.Sleep(50);
  }

  Sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}
