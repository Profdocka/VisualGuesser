import { GameInterface } from "./game_interface";

export class Game implements GameInterface{
  id: number;
  name: string;

  constructor(baseGame: GameInterface) {
    this.id = baseGame.id;
    this.name = baseGame.name;
  }
}
