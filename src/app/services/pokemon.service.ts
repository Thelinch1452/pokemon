import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, filter, flatMap, ignoreElements, map, mapTo, merge, mergeAll, mergeMap, of, zip } from 'rxjs';
import { Pokemon, dataPaginacionPokemonApi, pokemonApi, pokemonDetalle } from '../models/pokemon';
import { Abecedario } from '../models/abecedario';
import abecedarioData from '../utils/abecerdarioData';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) { }

  buscarPorUrl(url: string) {
    return this.http.get<pokemonApi>(url);
  }
  buscarPorUrls(urls: string[]) {
    return urls.map(u => this.buscarPorUrl(u));
  }


  dataPaginada({ offset, limit, nombre }: { offset: number, limit: number, nombre?: string }): Observable<Pokemon[]> {
    return this.http.get<dataPaginacionPokemonApi>(`${environment.urlApi}?offset=${offset}&limit=${limit}`)
      .pipe(
        flatMap((data: dataPaginacionPokemonApi) => of(data.results)),
        map((data: { name: string, url: string }[]) => data.filter(d => nombre ? d.name.includes(nombre) : d != undefined)),
        map((data: { name: string, url: string }[]) => this.buscarPorUrls(data.map(d => d.url))),
        mergeMap((data: Observable<pokemonApi>[]) => zip(...data).pipe(map((d) => d.filter(d => d != undefined).map((p) => ({ id: p.id, nombre: p.name, urlFoto: p.sprites.other['official-artwork'].front_default, urlShiny: p.sprites.other['official-artwork'].front_shiny, altura: p.height, peso: p.weight, tipos: p.types.map(t => t.type.name) }))))))

  }
  traerDetalle(id: number): Observable<pokemonDetalle> {
    return this.http.get<pokemonApi>(`${environment.urlApi}/${id}`).pipe(
      map((data: pokemonApi) => ({
        id: data.id, nombre: data.name, urlFoto: data.sprites.other['official-artwork'].front_default, experienciaBase: data.base_experience, habilidades: data.abilities.map(a => a.ability.name),
        peso: data.weight, altura: data.height, sonidoUrl: data.cries.legacy,
        estadisticas: data.stats.map(s => ({ nombre: s.stat.name, valor: s.base_stat })),
        tipos: data.types.map(t => t.type.name)
      }))
    );

  }

}
