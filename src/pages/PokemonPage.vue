<template>
  <h1 v-if="!pokemon">Wait a sec...</h1>
  <div v-else>
    <h1>Who's that Pokémon?</h1>
    <PokemonPicture
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"/>
    <PokemonOptions
      :options="pokemonArray"
      @selection="checkAnswer"/>

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button class="fade-in" @click="newGame">New game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import getPokemonOptions from '../helpers/getPokemonOptions';

export default {
  name: 'PokemonPage',
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArray: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArray = await getPokemonOptions();
      this.pokemon = this.pokemonArray[Math.floor(Math.random() * 4)];
    },
    checkAnswer(pokeId) {
      this.showPokemon = true;
      this.showAnswer = true;
      if( pokeId === this.pokemon.id ) {
        this.message = `That\'s correct!, it's a ${this.pokemon.name}!`;
      } else {
        this.message = `Oops, it's a ${this.pokemon.name}!`;
      }
    },
    newGame() {
      this.showAnswer = false;
      this.showPokemon = false;
      this.pokemon = null;
      this.message = '';
      this.pokemonArray = [];
      this.mixPokemonArray();
    }
  },
  mounted() {
    this.mixPokemonArray(); // Retrieve pokemons when the component is mounted
  }
}
</script>

<style scoped>
button {
  background-color: #FFF;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 10px;
}
button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>