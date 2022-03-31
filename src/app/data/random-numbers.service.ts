import { Injectable } from '@angular/core';

@Injectable()
export class RandomNumbersService {
  constructor() {}

  randomInt(): number[] {
    var randomNumberArray: number[] = [];
    var check = new Object();

    while (randomNumberArray.length < 4) {
      var random = Math.round(1 + 3 * Math.random());
      if (!check[random]) {
        randomNumberArray.push(random);
        check[random] = true;
      }
    }

    return randomNumberArray;
  }
}
