import { ArtworkInterface } from './artwork-interface';

export class Artwork implements ArtworkInterface {
  id: number;
  url: string;

  constructor(baseArtwork: ArtworkInterface) {
    this.id = baseArtwork.id;
    this.url = baseArtwork.url;
  }

  setUrl() {
    this.url = this.url.replace("t_thumb", "t_original");
  }
}
