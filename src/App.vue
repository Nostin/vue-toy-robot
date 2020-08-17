<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Header name="Sean Thompson" />
    <TableTop />
    <CommandLine />
    <CommandHistory />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CommandHistory from './components/CommandHistory.vue'
import CommandLine from './components/CommandLine.vue'
import Header from './components/Header.vue'
import TableTop from './components/TableTop.vue'

@Component({
  components: {
    CommandHistory,
    CommandLine,
    Header,
    TableTop,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
