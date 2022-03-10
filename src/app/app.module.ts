import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { GameDataService } from './data/game-data.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, QuizComponent],
  bootstrap: [AppComponent],
  providers: [GameDataService],
})
export class AppModule {}
