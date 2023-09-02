import PokemonPicture from '@/components/PokemonPicture';
import { shallowMount } from '@vue/test-utils';

describe('PokemonPicture.vue', () => {
  it('should match the snapshot', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not show the hidden image and the Pokémon #100', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      }
    });
    const [ img1, img2 ] = wrapper.findAll('img');
    expect(img1.exists()).toBeTruthy();
    expect(img2).toBeUndefined();

    expect(img1.classes()).toContain('hidden-pokemon');
    expect(img1.classes('hidden-pokemon')).toBeTruthy();

    expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg');
  });

  it('should show the Pokémon picture if showPokemon is \'true\'', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      }
    });

    const img1 = wrapper.find('img');

    expect(img1.exists()).toBeTruthy();
    expect(img1.classes('hidden-pokemon')).toBeFalsy();
    expect(img1.classes('fade-in')).toBeTruthy();
  });
});