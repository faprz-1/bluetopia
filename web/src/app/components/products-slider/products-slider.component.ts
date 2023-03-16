import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss']
})
export class ProductsSliderComponent implements OnInit {

  parcialProducts: Array<any> = [
    {
      name: 'Esculturas de animales',
      url: 'assets/img/animals.png'
    },
    {
      name: 'Ensayo "Mi mundo"',
      url: 'assets/img/ensayo.png'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
