import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  game: Game;

  constructor(){
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
  }

  takeCard(){
    this.pickCardAnimation = true;
  }

  newGame(){
    console.log(this.game);
  }

}
