import { Component, OnInit } from '@angular/core';
import { ImageModel } from 'src/app/models/ImageModel.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  imageObject: Array<ImageModel> = [];
  constructor() { }

  ngOnInit(): void {
    this.setImageObject();
  }

  setImageObject() {
    this.imageObject =[
      {
        image :"/assets/images/1.jpg",
        thumbImage :"/assets/images/1.jpg",
      },
      {
        image :"/assets/images/2.jpg",
        thumbImage :"/assets/images/2.jpg",
      },
      {
        image :"/assets/images/3.jpg",
        thumbImage :"/assets/images/3.jpg",
      },
      {
        image :"/assets/images/4.jpg",
        thumbImage :"/assets/images/4.jpg",
      },
      {
        image :"/assets/images/5.jpg",
        thumbImage :"/assets/images/5.jpg",
      },
    ]
  }

  imageClickHandler(e: any) {
    console.log(e);
  }
}
