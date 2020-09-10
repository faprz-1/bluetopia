import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  	constructor(protected menuController: MenuController) { }

    public Enable() {
        this.menuController.enable(true)
    }

    public Disable() {
        this.menuController.enable(false)
    }

    public Open() {
        this.menuController.open("templateMenu")
    }

    public Close() {
        this.menuController.close("templateMenu")
    }
}
