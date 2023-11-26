import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importiere Router
import { FirestoreConnectionService } from '../firestore-connection.service';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: FirestoreConnectionService,private router: Router) {}

  newGame() {
    let game = new Game();
    this.firestore.addGame(game.toJson()).then((gameId: string) => {
      this.router.navigate(['/game', gameId]); // Füge die ID als Route-Parameter hinzu
    }).catch(error => {
      console.error('Fehler beim Erstellen des Spiels:', error);
    });
  }
  

  ngOnInit(): void {
    
  }
}
