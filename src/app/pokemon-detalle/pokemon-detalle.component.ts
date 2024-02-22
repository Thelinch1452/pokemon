import { Component, ElementRef, Input, OnChanges, OnInit, Signal, SimpleChanges, ViewChild, effect, input } from '@angular/core';
import { Pokemon, pokemonDetalle } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { Abecedario } from '../models/abecedario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detalle',
  standalone: true,
  imports: [CommonModule],
  providers: [PokemonService],

  templateUrl: './pokemon-detalle.component.html',
  styleUrl: './pokemon-detalle.component.scss'
})
export class PokemonDetalleComponent implements OnInit, OnChanges {
  pokemon: Signal<Pokemon> = input.required<Pokemon>()


  abecedarioD: Signal<Abecedario> = input.required<Abecedario>();

  abecedarioVista: { letra: string, ocurrencias: number, activado: boolean }[]
  pokemonDetalle: pokemonDetalle = null
  @ViewChild('sonido') audio: ElementRef<HTMLAudioElement>;
  cargandoDetalle: boolean = false

  constructor(private pokemonService: PokemonService) {
    effect(() => {
      this.obtenerAbecedarioVista();
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    changes['pokemon']?.currentValue && this.traerDetalle()
  }
  ngOnInit(): void {
    this.traerDetalle()
  }

  private async traerDetalle() {
    this.cargandoDetalle = true
    const dataPokemon=this.pokemon()
    this.pokemonDetalle = await this.pokemonService.traerDetalle(dataPokemon.id).toPromise()
/*     await this.audio.nativeElement.play() */
    this.cargandoDetalle = false
  }

  private obtenerAbecedarioVista() {
    const abecedarioData = this.abecedarioD()
    const dataPokemon=this.pokemon()

    const primeraLetraPokemon = dataPokemon.nombre.charAt(0).toLowerCase()
    this.abecedarioVista = Object.keys(abecedarioData).map(k => ({ letra: k, ocurrencias: abecedarioData[k].ocurrencias, activado: primeraLetraPokemon == k }))
  }



}
