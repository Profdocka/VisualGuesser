import { Injectable } from '@angular/core';

@Injectable()
export class RandomNumbersService {
  constructor() {}
  
  randomOrder = [];
  randomGameListOrder = [];

  randomInt(count: number, arraylength: number): number[] {
    var randomNumberArray: number[] = [];
    var check = new Object();
    var answercount = count;

    while (randomNumberArray.length < arraylength) {
      var random = Math.round(1 + (answercount-1) * Math.random());
      if (!check[random]) {
        randomNumberArray.push(random);
        check[random] = true;
      }
    }

    return randomNumberArray;
  }
}
