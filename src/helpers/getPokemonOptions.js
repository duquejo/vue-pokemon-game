import pokemonApi from '../api/pokemonApi';

const getPokemons = () => Array.from(Array(650)).map((_, i) => i + 1 );

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5 );
  return await getPokemonNames(mixedPokemons.splice(0, 4));
};

const getPokemonNames = async ( pokemons = []) => {
  const promiseArray = Promise.all(pokemons.map( p => pokemonApi.get(`/${p}`) ));
  try {
    const [ p1, p2, p3, p4 ] = await promiseArray;
    return [
      { name: p1.data.name, id: p1.data.id },
      { name: p2.data.name, id: p2.data.id },
      { name: p3.data.name, id: p3.data.id },
      { name: p4.data.name, id: p4.data.id },
    ];
  } catch (error) {
    
  }
  console.log(a, b, c, d);
};

export default getPokemonOptions;