import { Component, OnInit, TemplateRef} from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

declare var Conekta;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  PUBLIC_KEY = 'key_MjbjZMy9XbTrWK4pCWBFjHg'

  data = {
    "card": {
      "number": "4242424242424242",
      "name": "Javier Pedreiro",
      "exp_year": "2022",
      "exp_month": "12",
      "cvc": "123"
    }
  };

  conektaTokenObject:any;

  aux:any = [];

  
	constructor(
    private router: Router,
    private api: ApiService,
    private toast: ToastService
    ) {}
  ngOnInit() {}

  createTokoenCard() {
    console.log(Conekta);
    
    Conekta.setPublicKey(this.PUBLIC_KEY);

    var successHandler = (token) => {
      /* token keys: id, livemode, used, object */
      console.log(token);
      this.onSuccesFulToken(token);

    };
     
    var errorHandler = (err) => {
      /* err keys: object, type, message, message_to_purchaser, param, code */
      console.log(err);
      this.onErrorToken(err);
    };

    Conekta.Token.create(this.data, successHandler, errorHandler);
    
  }

  onSuccesFulToken(token) {
      console.log(token);

      var Token = token.id;

      console.log(Token);
      
      let endpoint = "/pays/createOrder";
  
      this.api.post(endpoint,{Token:Token}).subscribe( res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  onErrorToken(error) {
    this.toast.showError(error);
  }

}
