import PokemonOptions from "@/components/PokemonOptions";
import { shallowMount } from "@vue/test-utils";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonOptions.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        options: pokemons,
      },
    });
  });

  it("should match the snapshot.", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show the 4 options as well', () => {
    const items = wrapper.findAll('li');
    expect(items).toHaveLength(4);
    expect(items[0].text()).toBe(pokemons[0].name);
    expect(items[1].text()).toBe(pokemons[1].name);
    expect(items[2].text()).toBe(pokemons[2].name);
    expect(items[3].text()).toBe(pokemons[3].name);
  });

  it('should emit \'selection\' with its args', () => {
    const [li1, li2, li3, li4] = wrapper.findAll('li');

    li1.trigger('click');
    li2.trigger('click');
    li3.trigger('click');
    li4.trigger('click');

    expect(wrapper.emitted('selection')).toHaveLength(4);

    expect(wrapper.emitted('selection')[0]).toEqual([pokemons[0].id]);
    expect(wrapper.emitted('selection')[1]).toEqual([pokemons[1].id]);
    expect(wrapper.emitted('selection')[2]).toEqual([pokemons[2].id]);
    expect(wrapper.emitted('selection')[3]).toEqual([pokemons[3].id]);
  });
});
