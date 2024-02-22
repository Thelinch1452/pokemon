import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent {
  @Input({
    required: true
  }) pokemon: Pokemon;
  fotoElegida: number = 0
  @Output() seleccionarPokemon: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  setFotoElegida(foto: number) {
    this.fotoElegida = foto;
  }
  seleccionar() {
    this.seleccionarPokemon.emit(this.pokemon);
  }
}
