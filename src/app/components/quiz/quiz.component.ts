import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../data/game-data.service';
import { RandomNumbersService } from '../../data/random-numbers.service';
import { PointsService } from '../../data/points.service';
import { Artwork } from '../../model/artwork';
import { ArtworkInterface } from '../../model/artwork-interface';
import { IdsService } from '../../data/ids.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  constructor(
    private GameDataService: GameDataService,
    private RandomNumberService: RandomNumbersService,
    public PointsService: PointsService,
    public IDsService: IdsService
  ) {}

  //Servicezugriff Points

  rightAnswer() {
    this.PointsService.addPoints();
    this.resetButtonEventListeners();
    this.prepareRound();
  }
  /*

  console.log(this.GameDataService.gamesList[0]);
    console.log(this.RandomNumberService);
    console.log(this.PointsService.points);
*/

  wrongAnswer() {
    this.PointsService.deductPoints();
    this.resetButtonEventListeners();
    this.prepareRound();
  }

  //Entfernt von allen Knöpfen den Event Listener
  resetButtonEventListeners() {
    let button1 = document.getElementById(
        this.RandomNumberService.randomOrder[0]
      ),
      button1Clone = button1.cloneNode(true);
    button1.parentNode.replaceChild(button1Clone, button1);

    let button2 = document.getElementById(
        this.RandomNumberService.randomOrder[1]
      ),
      button2Clone = button2.cloneNode(true);
    button2.parentNode.replaceChild(button2Clone, button2);

    let button3 = document.getElementById(
        this.RandomNumberService.randomOrder[2]
      ),
      button3Clone = button3.cloneNode(true);
    button3.parentNode.replaceChild(button3Clone, button3);

    let button4 = document.getElementById(
        this.RandomNumberService.randomOrder[3]
      ),
      button4Clone = button4.cloneNode(true);
    button4.parentNode.replaceChild(button4Clone, button4);
  }

  //Servicezugriff Games & Artworks

  // GAMES //
  async requestGames() {
    this.GameDataService.refreshIDsArray();
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
    this.RandomNumberService.randomGameListOrder =
      this.RandomNumberService.randomInt(
        this.GameDataService.gamesList.length,
        4
      );

    console.log('GameListOrder: ');
    console.log('');

    if (
      this.GameDataService.gamesList[
        this.RandomNumberService.randomGameListOrder[0] - 1
      ] != undefined
    ) {
      this.GameDataService.setCorrectGame(
        this.GameDataService.gamesList[
          this.RandomNumberService.randomGameListOrder[0] - 1
        ]
      );
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
      console.log('Richtiges Artworkobjekt: ');
      this.GameDataService.getCorrectGameArtwork().setUrl();
      console.log('URL: ' + this.GameDataService.getCorrectGameArtwork().url);
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
    let order = this.RandomNumberService.randomInt(4, 4);
    this.RandomNumberService.randomOrder = order;

    let answerButton1 = document.getElementById(order[0].toString());
    let answerButton2 = document.getElementById(order[1].toString());
    let answerButton3 = document.getElementById(order[2].toString());
    let answerButton4 = document.getElementById(order[3].toString());

    //Antwortmöglichkeiten den verschiedenen Knopfvariablen zuweisen | Der erste beinhaltet die richtige Antwort

    console.log('GameList: ');
    console.log(this.GameDataService.gamesList);

    answerButton1.innerHTML =
      this.GameDataService.gamesList[
        this.RandomNumberService.randomGameListOrder[0] - 1
      ].name;
    answerButton1.addEventListener('click', () => this.rightAnswer(), true);

    answerButton2.innerHTML =
      this.GameDataService.gamesList[
        this.RandomNumberService.randomGameListOrder[1] - 1
      ].name;
    answerButton2.addEventListener('click', () => this.wrongAnswer(), true);

    answerButton3.innerHTML =
      this.GameDataService.gamesList[
        this.RandomNumberService.randomGameListOrder[2] - 1
      ].name;
    answerButton3.addEventListener('click', () => this.wrongAnswer(), true);

    answerButton4.innerHTML =
      this.GameDataService.gamesList[
        this.RandomNumberService.randomGameListOrder[3] - 1
      ].name;
    answerButton4.addEventListener('click', () => this.wrongAnswer(), true);

    this.GameDataService.gamesList = [];
    this.GameDataService.artworksList = [];
  }

  ngOnInit() {}
}
