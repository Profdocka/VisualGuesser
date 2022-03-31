import { Injectable } from '@angular/core';

@Injectable()
export class PointsService {

  constructor() { }

  points: number = 1000;

  addPoints() {
    this.points += 20;
  }
}