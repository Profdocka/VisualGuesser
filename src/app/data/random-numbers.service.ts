import { Injectable } from '@angular/core';

@Injectable()
export class RandomNumbersService {
  constructor() {}

  randomInt(): number[] {
    var randomNumberArray: number[] = [];
    var check = new Object();
    var answercount = 4;

    while (randomNumberArray.length < answercount) {
      var random = Math.round(1 + (answercount-1) * Math.random());
      if (!check[random]) {
        randomNumberArray.push(random);
        check[random] = true;
      }
    }

    return randomNumberArray;
  }
}
