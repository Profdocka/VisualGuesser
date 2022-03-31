import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Artwork } from '../model/artwork';
import { ArtworkInterface } from '../model/artwork-interface';
import { Game } from '../model/game';
import { GameInterface } from '../model/game_interface';

@Injectable()
export class GameDataService {
  //Beinhaltet alle Spiele & das dazugehörige Artworks
  gamesList: Game[] = [];
  artworksList: Artwork[] = [];

  //Der erste Eintrag aus dem Game-Array bildet das richtige Spiel für die Runde
  private CorrectGame: any = new Object();
  private CorrectGameArtwork: any = new Object();

  constructor(private http: HttpClient) {}

  //URLs der entsprechenden Endpointverbindung zur API mit Proxyservervorsatz
  gameUrl =
    'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/';
  artworkUrl =
    'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/artworks';

  //Authentifizierungsheader BLEIBT STARR!
  header = new HttpHeaders()
    .set('Client-ID', '56pmsmf23lb6a8rn0z6t8vvg47r0a2')
    .set('Authorization', 'Bearer ud22j0xr53lb06mep6au7m8mxcogx3');

  //Parameter um nach einem bestimmten Spiel zu suchen
  //!TODO hier muss für eine zufällige Suche gesorgt werden
  gameParams = new HttpParams()
    .set('fields', 'name')
    .set('search', 'Valorant')
    .set('limit', '4');

  // API-Zugriffe nach Aufruf des QuizComponents

  //**  GAMES **//

  //GET-Request, welche einen Games-Array zurückliefert
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
