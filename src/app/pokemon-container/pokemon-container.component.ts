import { Component,  OnInit } from '@angular/core';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { PokemonService } from '../services/pokemon.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Pokemon } from '../models/pokemon';
import { PokemonDetalleComponent } from '../pokemon-detalle/pokemon-detalle.component';
import { Abecedario } from '../models/abecedario';
import abecedarioData from '../utils/abecerdarioData';
@Component({
  selector: 'app-pokemon-container',
  standalone: true,
  imports: [PokemonComponent, FormsModule, ReactiveFormsModule, CommonModule, InfiniteScrollModule, PokemonDetalleComponent],
  providers: [PokemonService],
  templateUrl: './pokemon-container.component.html',
  styleUrl: './pokemon-container.component.scss'
})
export class PokemonContainerComponent implements OnInit {
  pokemons: Pokemon[] = [];
  limite: number = 20;
  omitir: number = 0;
  nombre: string = null; ç
  private numeroMaximoPokemons: number = 1118;
  abecedarioD: Abecedario = null;
  pokemonSeleccionado: Pokemon = null;
  cargandoListaPokemon: boolean = false;
  constructor(private fb: FormBuilder, private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.paginacion({ filtrar: true });
  }


  async paginacion({ filtrar = false }: { filtrar?: boolean }) {
    this.cargandoListaPokemon = true;
    const valoresIgnorarNombre = [null, undefined, ''];
    let offset = filtrar ? 0 : this.omitir + this.limite;
    let limite = filtrar && !valoresIgnorarNombre.includes(this.nombre) ? this.numeroMaximoPokemons : this.limite;
    if (filtrar) {
      offset = 0;
      this.pokemonSeleccionado = null;
      this.pokemons = [];
      this.volverArriba()
    }
    this.omitir = offset;
    const pokemonData = await this.pokemonService.dataPaginada({ offset, limit: limite, nombre: this.nombre }).toPromise();
    this.pokemons = this.pokemons.concat(pokemonData?.filter(d => d != undefined) ?? []);
    this.calcularAbecedario()
    this.cargandoListaPokemon = false;
  }
  private calcularAbecedario() {
    const primeraLetraNombres = this.pokemons.map(d => d.nombre.charAt(0).toLowerCase());
    for (const letra in abecedarioData) {
      abecedarioData[letra].ocurrencias = primeraLetraNombres.filter(l => l == letra).length;
    }
    this.abecedarioD = { ...abecedarioData };

  }
  private volverArriba(){
    window.scrollTo(0, 0);
  }
  seleccionarPokemon(pokemon: Pokemon) {
    this.pokemonSeleccionado = pokemon;
  }



}
