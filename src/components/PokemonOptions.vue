<template>
  <div class="options-container">
    <ul>
      <li
        v-for="option in options"
        :key="option.id"
        @click="$emit('selection', option.id)">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style scoped>
/* Pokemon Options */
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  padding-top: 5px;
  width: 250px;
  text-transform: capitalize;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}
</style>