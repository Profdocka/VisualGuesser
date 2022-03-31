import { ArtworkInterface } from './artwork-interface';

export class Artwork implements ArtworkInterface {
  id: number;
  url: string;

  constructor(baseArtwork: ArtworkInterface) {
    this.id = baseArtwork.id;
    this.url = baseArtwork.url;
  }

  //Veränderung der URL, um an eine HD-Version des Artworks zu gelangen
  setUrl() {
    this.url = this.url.replace("t_thumb", "t_original");
  }
}
