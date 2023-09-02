import getPokemonOptions, { getPokemonNames, getPokemons } from '@/helpers/getPokemonOptions';
import pokemonApi from '../../../src/api/pokemonApi';

jest.mock('../../../src/api/pokemonApi.js');

describe('getPokemonOptions.ks', () => {


  beforeEach(() =>{
    jest.clearAllMocks();

    pokemonApi.get
    .mockImplementationOnce(() => ({ data: { name: 'poke1', id: 1 }}))
    .mockImplementationOnce(() => ({ data: { name: 'poke2', id: 2 }}))
    .mockImplementationOnce(() => ({ data: { name: 'poke3', id: 3 }}))
    .mockImplementationOnce(() => ({ data: { name: 'poke4', id: 4 }}));
  });


  it('should retrieve an array number.', () => {
    const pokemonsArray = getPokemons();
    expect(pokemonsArray).toHaveLength(650);
    expect(pokemonsArray[0]).toBe(1);
    expect(pokemonsArray[500]).toBe(501);
    expect(pokemonsArray[649]).toBe(650);
  });

  it('should retrieve a 4 length array.', async () => {
    const pokemons = await getPokemonNames();
    expect(pokemons.every(() => 
      expect.objectContaining({
        name: expect.any(String),
        id: expect.any(Number),
      })
    )).toBeTruthy();
  });

  it('should retrieve a mixed array.', async () => {
    const pokemons = await getPokemonOptions();
    expect(pokemons).toHaveLength(4);
    expect(pokemons.every(() => 
      expect.objectContaining({
        name: expect.any(String),
        id: expect.any(Number),
      })
    )).toBeTruthy();
  });
});