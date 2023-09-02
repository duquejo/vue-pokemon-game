import PokemonPage from '@/pages/PokemonPage';
import { mount, shallowMount } from '@vue/test-utils';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonPage.vue', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  it('should match the snapshot.', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call the mixPokemonArray after mount', () => {
    const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray'); // Must have to instanciate this spy first.
    shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  it('should match the snapshot when the Pokémons are loaded', () => {
    /**
     * Mounts every inner component dependencies
     */
    const wrapper = mount(PokemonPage, {
      data() {
        return {
          pokemonArray: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
        }
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show the PokemonPicture and PokemonOptions components', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArray: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
        }
      }
    });

    const pictureContainer = wrapper.find('pokemon-picture-stub');
    const optionsContainer = wrapper.find('pokemon-options-stub');

    expect(pictureContainer.exists()).toBeTruthy();
    expect(optionsContainer.exists()).toBeTruthy();

    expect(pictureContainer.attributes('pokemonid')).toBe(String(pokemons[0].id));
    expect(optionsContainer.attributes('options')).toBeTruthy();
  });


  it('checkAnswer - Should change the state.', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArray: pokemons,
          pokemon: pokemons[1],
          showPokemon: false,
          showAnswer: false,
          message: '',
        }
      }
    });

    await wrapper.vm.checkAnswer(pokemons[1].id);

    /**
     * From the DOM
     */
    expect(wrapper.find('h2').exists()).toBeTruthy();
    expect(wrapper.find('h2').text()).toBe(`That\'s correct!, it\'s a ${pokemons[1].name}!`);
    expect(wrapper.vm.showPokemon).toBeTruthy();

    await wrapper.vm.checkAnswer(10);

    /**
     * From the data
     */
    expect(wrapper.vm.message).toBe(`Oops, it\'s a ${pokemons[1].name}!`);
  });
});