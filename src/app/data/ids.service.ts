import { Injectable } from '@angular/core';

@Injectable()
export class IdsService {

  //IDs zu Videospieleinträgen der Internet Videogame Database (IGDB)
  public idCollection = new Array(
    0, //PLACEHOLDER
    434, //Red Dead Redemption
    126459, //Valorant
    121, //Minecraft
    1020, //Grand Theft Auto V
    731, //Grand Theft Auto IV
    172427, //Kirby and the forgotten land
    119133, //Elden Ring
    118218, //Tom Clancys Ghost Recon: Breakpoint
    119305, //LEGO Star Wars: The Skywalker Saga
    144054, //Pokemon Legends: Arceus
    19560, //God of War
    732, //GTA San Andreas
    154986, //FIFA 22
    9066, //City Skylines
    7360, //Rainbow Six Siege
    26758, //Super Mario Odyssey
    7346, //Breath of the Wild
    7331, //Uncharted 4
  );

  constructor() { }

}