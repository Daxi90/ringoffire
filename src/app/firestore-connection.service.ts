import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc
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
  }

  async addGame(game: {}): Promise<string> {
    try {
      const docRef = await addDoc(this.getGamesRef(), game);
      return docRef.id; // Gib die ID des Dokuments zurück
    } catch (err) {
      console.log(err);
      throw err; // Wirf den Fehler, um ihn im Component zu behandeln
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
      this.getSingleGame(param),
      (element) => {
        //console.log('Single loaded game', element.data());
      }
    );
  }


  async updateGame(param, gameObject){
    await updateDoc(this.getSingleGame(param), gameObject)
  }

  
  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGame(param) {
    return doc(collection(this.firestore, 'games'), param);
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
