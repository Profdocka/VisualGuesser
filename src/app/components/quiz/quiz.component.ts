import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../data/game-data.service';
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

  //Servicezugriff Points
/*
  addPoints() {
    console.log(this.GameDataService.gamesList[0]);
    console.log(this.RandomNumberService);
    console.log(this.PointsService.points);
  }

  wrongPick() {
    console.log("WRONG")
  }
*/

  //Servicezugriff Games & Artworks

  // GAMES //
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

  // ARTWORKS //
  async requestArtwork() {
    await this.GameDataService.getArtwork(
      this.GameDataService.getCorrectGame().id
    )
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
      console.log('URL:' + this.GameDataService.getCorrectGameArtwork().url);
    }
    console.log(this.GameDataService.getCorrectGameArtwork());
    console.log(this.PointsService.points);
  }

  // Anzeige des Artworks
  printOut() {
    let pic = document.getElementById('pic');
    pic.setAttribute('src', this.GameDataService.getCorrectGameArtwork().url);
    console.log(
      this.GameDataService.getCorrectGame(),
      this.GameDataService.getCorrectGameArtwork()
    );
  }

  async prepareRound() {
    //Spiel und Artwork für die Quizrunde vorbereitet
    console.log('start');
    await this.requestGames();
    console.log('Games finished');
    await this.requestArtwork();
    console.log('Artworks finished');
    this.printOut();
    console.log('PrintOut finished');

    //Knopfvariablen bekommen in einer zufälligen Reigenfolge einen realen Knopf zugewiesen
    let order = this.RandomNumberService.randomInt();
    let answerButton1 = document.getElementById(order[0].toString());
    let answerButton2 = document.getElementById(order[1].toString());
    let answerButton3 = document.getElementById(order[2].toString());
    let answerButton4 = document.getElementById(order[3].toString());

    //Antwortmöglichkeiten den verschiedenen Knopfvariablen zuweisen | Der erste beinhaltet die richtige Antwort
    answerButton1.innerHTML = this.GameDataService.gamesList[0].name;
    answerButton1.addEventListener('click', () => {
      this.PointsService.addPoints();
    });
    answerButton2.innerHTML = this.GameDataService.gamesList[1].name;
    answerButton3.innerHTML = this.GameDataService.gamesList[2].name;
    answerButton4.innerHTML = this.GameDataService.gamesList[3].name;
  }

  ngOnInit() {}
}
