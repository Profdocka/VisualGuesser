import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { GameDataService } from './data/game-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing/routing.module';
import { RandomNumbersService } from './data/random-numbers.service';
import { PointsService } from './data/points.service';
import { IdsService } from './data/ids.service';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RoutingModule],
  declarations: [AppComponent, HelloComponent, QuizComponent, HeaderComponent],
  bootstrap: [AppComponent],
  providers: [GameDataService, RandomNumbersService, PointsService, IdsService],
})
export class AppModule {}
