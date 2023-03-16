import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-slider',
  templateUrl: './files-slider.component.html',
  styleUrls: ['./files-slider.component.scss']
})
export class FilesSliderComponent implements OnInit {

  files: Array<any> = [
    {
      name: 'Matar a un ruiseñor.mp3',
      url: '',
    },
    {
      name: 'Matar a un ruiseñor.jpg',
      url: '',
    },
    {
      name: 'Matar a un ruiseñor.doc',
      url: '',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  GetIcon(file: any) {
    const audioFormats = ['mp3', 'wav'];
    const imageFormats = ['jpg', 'png'];
    if(audioFormats.includes(file.name.split('.').pop())) return `music.png`;
    else if(imageFormats.includes(file.name.split('.').pop())) return `gallery-alt.png`;
    else return `document.png`
  }

}
