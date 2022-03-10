import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../model/game';

@Injectable()
export class GameDataService {
  
  CorrectGame: Game = new Game(null, null, null);
  WrongGames: Game[] = []
  
  constructor(private http: HttpClient) {
    
  }

}