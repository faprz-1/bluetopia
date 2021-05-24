import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingLevel: number = 0;
  public loadingLevelEmitter: EventEmitter<boolean>;

  constructor() {
    this.loadingLevelEmitter = new EventEmitter<boolean>();
  }

  public AddLoadingLevel() {
    this.loadingLevel += 1;
    this.loadingLevelEmitter.emit(this.loadingLevel > 0);
  }

  public ReleaseLoadingLevel() {
    this.loadingLevel = this.loadingLevel > 0 ? this.loadingLevel - 1 : 0;
    this.loadingLevelEmitter.emit(this.loadingLevel > 0);
  }
}
