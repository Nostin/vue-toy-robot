<template>
  <ol>
    <li v-for="(cmd, index) in commandHistory" :key="index" :class="{ error: cmd.error }">{{ cmd.command }}</li>
  </ol>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  computed: mapState(['commandHistory']),
})
export default class CommandHistory extends Vue {}
</script>

<style scoped>
li {
  color: green;
  margin: 0 auto;
  text-align: left;
  width: 400px;
}

li.error {
  color: red;
}
</style>
