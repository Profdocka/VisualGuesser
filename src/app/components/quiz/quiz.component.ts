import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../model/game';
import { GameDataService } from '../../data/game-data.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  gamesList: Game[] = [];

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

  printOutGamesList() {
    console.log(this.gamesList);
    console.log("cool")
  }
  ngOnInit() {
  }

}