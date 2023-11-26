import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { FirestoreConnectionService } from '../firestore-connection.service';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  collectionData,
  collection,
  onSnapshot,
  doc,
  addDoc
} from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  gameId: string;

  unsubSingleGame;


  constructor(
    public dialog: MatDialog,
    private firestore:FirestoreConnectionService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) =>{
      this.unsubSingleGame = this.subSingleGameList(params['id']);
      this.gameId = params['id'];
      console.log(this.gameId)
    })
   
  
  }

  ngOnDestroy(){
    this.unsubSingleGame();
  }

  newGame() {
    this.game = new Game();
  }


  subSingleGameList(gameId) {
    return onSnapshot(
      this.firestore.getSingleGame(gameId),
      (element:any) => {
        let game = element.data();
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      }
    );
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.firestore.updateGame(this.gameId, this.game.toJson());

      this.pickCardAnimation = true;

      console.log('New card: ', this.currentCard);
      console.log('Game is ', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.firestore.updateGame(this.gameId, this.game.toJson());
        this.pickCardAnimation = false;
      }, 1000);
    }
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
        this.firestore.updateGame(this.gameId, this.game.toJson());
      }
    });
  }
}
