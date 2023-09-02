import pokemonApi from '@/api/pokemonApi';

describe('pokemonApi.js', () => {
  it('should Axios return the defined baseUrl.', () => {
    expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
  });
});