<template>
  <div>
    <label for="command-input">
      <p>Please type your commands here:</p>
      <p class="error" v-if="error">{{ error }}</p>
      <input v-on:keyup.enter="issueCommand" v-model="command" id="command-input" placeholder="enter command" />
    </label>
    <button v-on:click="issueCommand">Enter</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import type { CommandType } from '../globalTypes'

@Component
export default class CommandLineInputHandler extends Vue {
  @Prop() private error!: string | null

  private command = ''

  public issueCommand() {
    const [baseCommand, xcoord, ycoord, faceDirection] = this.command
      .trim()
      .toUpperCase()
      .split(/[ ,]+/)

    const parsedCommand = {
      baseCommand,
      error: null,
      faceDirection: faceDirection ? faceDirection : undefined,
      fullString: this.command,
      xcoord: xcoord ? parseInt(xcoord, 10) : undefined,
      ycoord: ycoord ? parseInt(ycoord, 10) : undefined,
    } as CommandType

    this.$emit('command', parsedCommand)

    this.command = ''
  }
}
</script>

<style scoped>
button {
  background: #0058a1;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 11px 25px;
}

input {
  padding: 0.5rem;
}

label {
  display: block;
  margin-bottom: 10px;
}

p.error {
  color: red;
}
</style>
