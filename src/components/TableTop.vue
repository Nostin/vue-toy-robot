<template>
  <div>
    <table>
      <tbody>
        <tr v-for="rowIndex in tableTop.gridSize" :key="rowIndex">
          <td
            v-for="columnIndex in tableTop.gridSize"
            :key="columnIndex"
            v-bind:class="{
              activeEast:
                tableTop.robotIsPlaced &&
                tableTop.faceDirection === RobotFaceOptions.East &&
                tableTop.gridSize - rowIndex === tableTop.ycoord &&
                columnIndex - 1 === tableTop.xcoord,
              activeNorth:
                tableTop.robotIsPlaced &&
                tableTop.faceDirection === RobotFaceOptions.North &&
                tableTop.gridSize - rowIndex === tableTop.ycoord &&
                columnIndex - 1 === tableTop.xcoord,
              activeSouth:
                tableTop.robotIsPlaced &&
                tableTop.faceDirection === RobotFaceOptions.South &&
                tableTop.gridSize - rowIndex === tableTop.ycoord &&
                columnIndex - 1 === tableTop.xcoord,
              activeWest:
                tableTop.robotIsPlaced &&
                tableTop.faceDirection === RobotFaceOptions.West &&
                tableTop.gridSize - rowIndex === tableTop.ycoord &&
                columnIndex - 1 === tableTop.xcoord,
            }"
          />
        </tr>
      </tbody>
    </table>
    <p v-if="tableTop.reportPosition">
      Report Output: <span>{{ tableTop.xcoord }},{{ tableTop.ycoord }},{{ tableTop.faceDirection }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { RobotFaceDirectionEnum } from '../globalTypes'
import type { TableStateType } from '../globalTypes'

@Component({
  computed: mapState(['tableTop']),
})
export default class TableTop extends Vue {
  private tableTop!: TableStateType
  private RobotFaceOptions = RobotFaceDirectionEnum
}
</script>

<style scoped>
p {
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
  font-size: 1.2rem;
  margin: 20px 0;
  padding: 20px 0;
}

table {
  margin: 0 auto;
}

td {
  border: 1px solid black;
  height: 50px;
  width: 50px;
}

td.activeEast {
  background: url('/robot_east.png');
}

td.activeNorth {
  background: url('/robot_north.png');
}

td.activeSouth {
  background: url('/robot_south.png');
}

td.activeWest {
  background: url('/robot_west.png');
}
</style>
