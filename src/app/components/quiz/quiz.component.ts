import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../model/game';
import { GameDataService } from '../../data/game-data.service';
import { Artwork } from '../../model/artwork';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  gamesList: Game[] = [];
  artwork: Artwork[] = [];

  constructor(private GameDataService: GameDataService) { 

  }


  requestGames() {
    this.GameDataService.getData().subscribe(items => {
      for(let keys in items) {
        if(items.hasOwnProperty) {
          this.gamesList.push(items[keys]);
        }
      }
    })
  }

  requestArtwork() {
    this.GameDataService.getArtwork().subscribe(items => {
      for(let keys in items) {
        if(items.hasOwnProperty) {
          this.artwork.push(items[keys]);
        }
      }
    })
  }

  printOutGamesList() {
    console.log(this.gamesList);
    console.log("cool")
  }

  printOutArtwork() {

  }
  ngOnInit() {
  }

}