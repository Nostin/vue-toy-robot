<template>
  <header>
    <h1>Toy Robot</h1>
    <h2>Developed in Vue by {{ name }}</h2>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  @Prop() private name!: string
}
</script>

<style scoped>
header {
  background: white;
  border-bottom: 1px solid grey;
  margin-bottom: 40px;
  width: 100%;
}

h1 {
  display: block;
  line-height: 2;
  margin: 0;
}

h2 {
  display: block;
  line-height: 3;
  margin: 0;
}
</style>
