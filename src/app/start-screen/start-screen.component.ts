import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importiere Router

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private router: Router) {}

  newGame() {
    this.router.navigate(['/game']); // Navigiere zur Game Route
  }

  ngOnInit(): void {
    
  }
}
