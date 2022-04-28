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
    141503, //Forza Horizon 5
    140839, //Mass Effect: Legendary Edition
    135243, //It Takes Two
    134595, //Hitman 3
    103281, //Halo Infinite
    134582, //Ratchet & Clank: Rift Apart
    165067, //Call of Duty: Vanguard
    134584, //Returnal
    126290, //Far Cry 6
    1905, //Fortnite
    119277, //Genshin Impact
    165192, //The Elder Scrolls V: Skyrim Anniversary Edition
    124954, //Crusader Kings III
    152354, //Mario Party Superstars
    74701, //Star Wars Jedi: Fallen Order
    143232, //Final Fantasy XIV: Endwalker
    125166, //Battlefield 2042
    55163, //Resident Evil Village
    152249, //Marvel's Guardians of the Galaxy
    15698, //Metroid Dread
  );

  constructor() { }

}