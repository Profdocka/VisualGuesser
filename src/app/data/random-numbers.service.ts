import { Injectable } from '@angular/core';

@Injectable()
export class RandomNumbersService {
  constructor() {}
  
  randomOrder = [];
  randomGameListOrder = [];


  //Erzeugt einen Array beliebiger Länge, welche aus den Zahlen 1 bis zur Maximallänge besteht. Die Anordnung dieser Zahlen ist zufällig und jede Zahl kommt nur einmal vor
  randomInt(count: number, arraylength: number): number[] {
    var randomNumberArray: number[] = [];
    var check = new Object();

    while (randomNumberArray.length < arraylength) {
      var random = Math.round(1 + (count-1) * Math.random());
      if (!check[random]) {
        randomNumberArray.push(random);
        check[random] = true;
      }
    }

    return randomNumberArray;
  }
}
