import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Artwork } from '../model/artwork';
import { ArtworkInterface } from '../model/artwork-interface';
import { Game } from '../model/game';
import { GameInterface } from '../model/game_interface';
import { IdsService } from './ids.service';
import { RandomNumbersService } from './random-numbers.service';

@Injectable()
export class GameDataService {
  //Beinhaltet alle Spiele & das dazugehörige Artworks

  idArray: number[] = [];
  idString: string = '';
  gamesList: Game[] = [];
  artworksList: Artwork[] = [];

  //Der erste Eintrag aus dem Game-Array bildet das richtige Spiel für die Runde
  private CorrectGame: any = new Object();
  private CorrectGameArtwork: any = new Object();

  constructor(
    private http: HttpClient,
    private RandomNumberService: RandomNumbersService,
    private IDsService: IdsService
  ) {}

  //Ein erzeugter String, welcher vier zufällige IDs aus dem IDsService nimmt. Dieser String wird für die Request zur API benötigt
  refreshIDsArray() {
    this.idArray = this.RandomNumberService.randomInt((
      this.IDsService.idCollection.length-1),4
    );
    this.idString =
      '(' +
      this.IDsService.idCollection[this.idArray[0]] +
      ',' +
      this.IDsService.idCollection[this.idArray[1]] +
      ',' +
      this.IDsService.idCollection[this.idArray[2]] +
      ',' +
      this.IDsService.idCollection[this.idArray[3]] +
      ')';
  }

  //URLs der entsprechenden Endpointverbindung zur API mit Proxyservervorsatz
  gameUrl =
    'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/';
  artworkUrl =
    'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/artworks';

  //Authentifizierungsheader BLEIBT STARR!
  header = new HttpHeaders()
    .set('Client-ID', '56pmsmf23lb6a8rn0z6t8vvg47r0a2')
    .set('Authorization', 'Bearer 4ghbzkgtzlzbhk0txgyrvgeer4ortt');

  //Parameter um nach einem bestimmten Spiel zu suchen
  //!TODO hier muss für eine zufällige Suche gesorgt werden
  gameParams = new HttpParams()
    .set('fields', 'name, artworks.*')
    .set('where id', '(731,121,126459,1020)')
    .set('limit', '4');

  // API-Zugriffe nach Aufruf des QuizComponents

  //**  GAMES **//

  //POST-Request, welche einen Games-Array zurückliefert
  getData(): Observable<GameInterface[]> {
    let gameBody = 'fields name, artworks.*; where id=' + this.idString + ';limit 4;'
    return this.http
      .post<GameInterface[]>(this.gameUrl, gameBody,{
        headers: this.header,
       // params: this.gameParams,
      })
      .pipe(
        map((games: GameInterface[]) => games.map((game) => new Game(game)))
      );
  }

  getCorrectGame(): Game {
    return this.CorrectGame;
  }

  setCorrectGame(game: Game) {
    this.CorrectGame = game;
  }

  //**  ARTWORKS **//

  //POST-Request, welche einen Artwork-Array mit einem Objekteintrag zurückliefert
  getArtwork(id: number): Observable<ArtworkInterface[]> {
    let artworkBody = 'fields *; where game = ' + id + ';';
    return this.http
      .post<ArtworkInterface[]>(this.artworkUrl, artworkBody, {
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
