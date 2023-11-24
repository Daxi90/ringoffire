import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  onSnapshot,
  doc,
  addDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from '../interface/game';

@Injectable({
  providedIn: 'root',
})
export class FirestoreConnectionService {
  gameList = [];

  unsubList;
  unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubList = this.subGameList();
    //this.unsubSingle = this.subSingleGameList();
  }

async addGame(game: {}){
  try {
    const docRef = await addDoc(this.getGamesRef(), game);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}


  subGameList() {
    return onSnapshot(this.getGamesRef(), (list) => {
      this.gameList = [];
      list.forEach((element) => {
        this.gameList.push(element.data());
      });
    });
  }

  subSingleGameList(param) {
    return onSnapshot(
      this.getSingleGame('games', param),
      (element) => {
        console.log(element.data());
      }
    );
  }

  

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGame(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  setGameObject(obj: any, id: string): Game {
    return {
      id: id,
      currentPlayer: obj.player,
      playedCards: obj.playedCards,
      players: obj.players,
      stack: obj.stack,
    };
  }

  ngOnDestroy() {
    this.unsubList();
    this.unsubSingle();
  }
}
