import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Artwork } from '../model/artwork';
import { ArtworkInterface } from '../model/artwork-interface';
import { Game } from '../model/game';
import { GameInterface } from '../model/game_interface';

@Injectable()
export class GameDataService {
  gamesList: Game[] = [];
  artworksList: Artwork[] = [];
  private CorrectGame: any = new Object();
  private CorrectGameArtwork: any = new Object();
  // WrongGames: Game[] = [];

  constructor(private http: HttpClient) {}

  gameUrl =
    'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/';
  artworkUrl =
    'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/artworks';

  header = new HttpHeaders()
    .set('Client-ID', '56pmsmf23lb6a8rn0z6t8vvg47r0a2')
    .set('Authorization', 'Bearer ud22j0xr53lb06mep6au7m8mxcogx3');
  gameParams = new HttpParams()
    .set('fields', 'name')
    .set('search', 'Valorant')
    .set('limit', '4');

  artworkParams = new HttpParams().set('fields', 'url,game');
  artworkBody = '';

  //**  VIDEOSPIELE **//

  //Sendet eine Request an die Videogame-API und liefert ein Observable zurück
  getData(): Observable<GameInterface[]> {
    return this.http
      .get<GameInterface[]>(this.gameUrl, {
        headers: this.header,
        params: this.gameParams,
      })
      .pipe(
        map((games: GameInterface[]) => games.map((game) => new Game(game)))
      );
  }

  setArtworkBody(id: number) {
    this.artworkBody = 'fields *; where game =' + id;
  }

  getCorrectGame(): Game {
    return this.CorrectGame;
  }

  setCorrectGame(game: Game) {
    this.CorrectGame = game;
  }

  //**  ARTWORKS **//

  getArtwork(id: number): Observable<ArtworkInterface[]> {
    this.artworkBody = 'fields *; where game = ' + id + ';';
    return this.http
      .post<ArtworkInterface[]>(this.artworkUrl, this.artworkBody, {
        headers: this.header,
      })
      .pipe(
        map((artworks: ArtworkInterface[]) =>
          artworks.map((artwork) => new Artwork(artwork))
        )
      );
  }

  getCorrectGameArtwork(): Artwork {
    return this.CorrectGameArtwork;
  }

  setCorrectGameArtwork(artwork: Artwork) {
    this.CorrectGameArtwork = artwork;
  }
}