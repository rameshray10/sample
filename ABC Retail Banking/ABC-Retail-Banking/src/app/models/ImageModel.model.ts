export class ImageModel {
  public image!: string;
  public thumbImage!: string;

  constructor(image: string, thumbImage: string) {
      this.image = image;
      this.thumbImage = thumbImage;
  }
};
