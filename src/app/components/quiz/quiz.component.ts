import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../../data/game-data.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private GameDataService) { }

  ngOnInit() {
  }

}