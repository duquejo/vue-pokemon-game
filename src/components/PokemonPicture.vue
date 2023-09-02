<template>
  <div class="pokemon-container">
    <img v-if="!showPokemon" :src="imgSrc" class="hidden-pokemon" alt="Pokémon" />
    <img v-else :src="imgSrc" class="fade-in" alt="Pokémon" />
  </div>
</template>

<script>
export default {
  props: {
    pokemonId: {
      type: Number,
      required: true,
      default: 1,
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    }
  },
}
</script>

<style scoped>
/* Pokemon Picture */
.pokemon-container {
  position: relative;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.pokemon-container img {
  height: 200px;
  position: absolute;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
img.hidden-pokemon {
  filter: brightness(0);
}
</style>