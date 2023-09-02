import pokemonApi from '../api/pokemonApi';

export const getPokemons = () => Array.from(Array(650)).map((_, i) => i + 1 );

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5 );
  return await getPokemonNames(mixedPokemons.splice(0, 4));
};

export const getPokemonNames = async ( pokemons = []) => {
  const promiseArray = Promise.all(pokemons.map( p => pokemonApi.get(`/${p}`) ));
  try {
    const result = await promiseArray;
    return result.map( r => ({
      name: r.data.name,
      id: r.data.id
    }));
  } catch (error) {
    console.error(error); 
  }
};

export default getPokemonOptions;