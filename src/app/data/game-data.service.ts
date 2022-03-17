import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';
import { GameInterface } from '../model/game_interface';


@Injectable()
export class GameDataService {
  
  CorrectGame: Game = new Game(null, null, null);
  WrongGames: Game[] = [];

  constructor(private http: HttpClient) { 
  }

  gameUrl = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/"; 
  artworkUrl ="https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/artworks"

  header = new HttpHeaders()
    .set('Client-ID', '56pmsmf23lb6a8rn0z6t8vvg47r0a2')
    .set('Authorization', 'Bearer ud22j0xr53lb06mep6au7m8mxcogx3');
  gameParams = new HttpParams().set('fields', 'name').set('search', 'Portal');
  artworkParams = new HttpParams().set('fields', '*').set('game' , 'where game = 434');

  //Sendet eine Request an die Videogame-API und liefert ein Observable zurück
  getData(): Observable<any> {
    return this.http.get(this.gameUrl, {headers: this.header, params: this.gameParams})
  }

  getArtwork(): Observable<GameInterface> {
    return this.http.get<GameInterface>(this.artworkUrl, {headers: this.header, params: this.artworkParams})
  }
}