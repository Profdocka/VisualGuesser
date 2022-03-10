import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';

@Injectable()
export class GameDataService {
  
  CorrectGame: Game = new Game(null, null, null);
  WrongGames: Game[] = [];

  constructor(private http: HttpClient) {
    const url = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/"; 
    var header = new HttpHeaders()
    .set('Client-ID', '56pmsmf23lb6a8rn0z6t8vvg47r0a2')
    .set('Authorization', 'Bearer ud22j0xr53lb06mep6au7m8mxcogx3');
    var params = new HttpParams().set('fields', 'name').set('search', 'SIX');
  }

  //Sendet eine Request an die Videogame-API und liefert ein Observable zurück
  getData(): Observable {
    this.http.get()
  }

}