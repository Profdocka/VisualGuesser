import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../model/game';
import { GameDataService } from '../../data/game-data.service';
import { Artwork } from '../../model/artwork';
import { RandomNumbersService } from '../../data/random-numbers.service';
import { PointsService } from '../../data/points.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(
    private GameDataService: GameDataService,
    private RandomNumberService: RandomNumbersService,
    public PointsService: PointsService
  ) {}


  add() {
   this.addPoints();
  }

  addPoints() {
    console.log(this.GameDataService.gamesList[0]);
    console.log(this.RandomNumberService);
    console.log(this.PointsService.points);
  }

  async requestGames() {
    await this.GameDataService.getData()
      .toPromise()
      .then((items) => {
        for (let keys in items) {
          if (items.hasOwnProperty) {
            this.GameDataService.gamesList.push(items[keys]);
          }
        }
      });
    this.setGameDataServiceCorrectGame();
  }

  setGameDataServiceCorrectGame() {
    if (this.GameDataService.gamesList[0] != undefined) {
      this.GameDataService.setCorrectGame(this.GameDataService.gamesList[0]);
    }
    console.log(this.GameDataService.getCorrectGame());
  }

  async requestArtwork() {
    await this.GameDataService.getArtwork(this.GameDataService.getCorrectGame().id)
      .toPromise()
      .then((items) => {
        for (let keys in items) {
          if (items.hasOwnProperty) {
            this.GameDataService.artworksList.push(items[keys]);
          }
        }
      });
    this.setGameDataServiceCorrectArtwork();
  }

  setGameDataServiceCorrectArtwork() {
    if (this.GameDataService.artworksList[0] != undefined) {
      this.GameDataService.setCorrectGameArtwork(
        this.GameDataService.artworksList[0]
      );
      this.GameDataService.getCorrectGameArtwork().setUrl();
      console.log("URL:" +  this.GameDataService.getCorrectGameArtwork().url)
    }
    console.log(this.GameDataService.getCorrectGameArtwork());
    console.log(this.PointsService.points)
  }

  printOut() {
    //console.log(Math.floor(Math.random() * 3));
    //console.log(this.GameDataService.gamesList);
    //console.log(this.GameDataService.artworksList);
    let pic = document.getElementById('pic');
    let title = document.getElementById('title');
    // pic.setAttribute("src", "https://images.igdb.com/igdb/image/upload/t_original/arz9r.jpg");
    pic.setAttribute('src', this.GameDataService.getCorrectGameArtwork().url);
    console.log(
      this.GameDataService.getCorrectGame(),
      this.GameDataService.getCorrectGameArtwork()
    );
    title.innerHTML = this.GameDataService.getCorrectGame().name;
  }

  /*  printOutArtwork() {
    
  }
*/



  wrongPick() {
    console.log("WRONG")
  }

  async printOutRandomNumbers() {
    console.log('start');
    await this.requestGames();
    console.log('Games finished');
    await this.requestArtwork();
    console.log('Artworks finished');
    await this.printOut();
    console.log('PrintOut finished');
    let order = this.RandomNumberService.randomInt();
    //console.log(order);
    let answerButton1 = document.getElementById(order[0].toString());
    let answerButton2 = document.getElementById(order[1].toString());
    let answerButton3 = document.getElementById(order[2].toString());
    let answerButton4 = document.getElementById(order[3].toString());
    answerButton1.innerHTML = this.GameDataService.gamesList[0].name;
    answerButton1.addEventListener("click", () => {
      this.PointsService.addPoints();
    });
    answerButton2.innerHTML = this.GameDataService.gamesList[1].name;
    answerButton3.innerHTML = this.GameDataService.gamesList[2].name;
    answerButton4.innerHTML = this.GameDataService.gamesList[3].name;
  }

  ngOnInit() {
  }
}
