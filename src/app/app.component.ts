import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonContainerComponent } from './pokemon-container/pokemon-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PokemonContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'poke-api';
}
