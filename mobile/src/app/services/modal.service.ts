import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	constructor(protected modalController: ModalController,) { }


    public async OpenModal(component: any) {
        const modal = await this.modalController.create({ component: component })
        return await modal.present()
    }
}
