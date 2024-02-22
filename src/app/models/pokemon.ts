export interface Pokemon {
    id: number;
    nombre: string;
    urlFoto: string;
    urlShiny: string;
    altura: number;
    peso: number;
    tipos: string[];

}
export interface pokemonApi {
    id: number;
    sprites: { other: { 'official-artwork': { front_default: string, front_shiny: string } ,showdown:{front_default:string}} };
    name: string;
    weight: number;
    height: number;
    types: { type: { name: string } }[];
    cries: {
        latest: string;
        legacy: string;
    },
    base_experience:number;
    abilities: { ability: { name: string } }[];
    moves: { move: { name: string } }[];
    stats: { base_stat: number, stat: { name: string } }[];
}
export interface dataPaginacionPokemonApi {
    count: number;
    next: string;
    previus: string;
    results: { name: string, url: string }[];
}
export interface pokemonDetalle {
    id: number;
    nombre: string;
    urlFoto: string;
    experienciaBase: number;
    habilidades: string[];
    peso: number;
    altura: number;
    sonidoUrl: string;
    tipos: string[];
    estadisticas: { nombre: string, valor: number }[];
}