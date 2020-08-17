<template>
  <CommandLineInputHandler @command="handleCommand" v-bind:error="error" />
</template>

<script lang="ts">
import update from 'immutability-helper'
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import CommandLineInputHandler from './CommandLineInputHandler.vue'
import { BaseCommandEnum, RobotFaceDirectionEnum } from '../globalTypes'
import type { CommandType } from '../globalTypes'

@Component({
  components: { CommandLineInputHandler },
  computed: mapState(['tableTop']),
})
export default class CommandLine extends Vue {
  private error: string | null = null

  public handleCommand(cmd: CommandType) {
    const { baseCommand } = cmd
    const allowedCommands = Object.values(BaseCommandEnum) as string[]

    if (allowedCommands.includes(baseCommand)) {
      switch (baseCommand) {
        case BaseCommandEnum.Place:
          this.tryPlaceRobot(cmd)
          break
        case BaseCommandEnum.Move:
          this.tryMoveRobot(cmd)
          break
        case BaseCommandEnum.Left:
        case BaseCommandEnum.Right:
          this.tryTurnRobot(cmd)
          break
        case BaseCommandEnum.Report:
          this.tryReportPosition(cmd)
          break
        default:
          this.error = `Unhandled base command type ${baseCommand}`
      }
    } else {
      this.error = `Bad command, Please use one of: ${Object.values(BaseCommandEnum).join(', ')}`
      const newTableTopState = update(this.$store.getters.tableTop, {
        reportPosition: { $set: false },
      })
      this.$store.dispatch('updateTable', newTableTopState)
    }
  }

  public tryPlaceRobot(command: CommandType) {
    const { faceDirection, fullString, xcoord, ycoord } = command

    let placeError = null

    if (faceDirection === undefined || xcoord === undefined || ycoord === undefined) {
      placeError = 'Bad Command: expected 4 arguments'
    } else {
      if (!Number.isInteger(xcoord) || !Number.isInteger(ycoord)) {
        placeError = 'Bad Command: X and Y coordinates must be integers'
      }

      if (xcoord < 0 || ycoord < 0 || xcoord >= this.$store.getters.tableTop.gridSize || ycoord >= this.$store.getters.tableTop.gridSize) {
        placeError = 'Bad Command: coordinates are off the table'
      }

      const allowedDirections = Object.values(RobotFaceDirectionEnum) as string[]
      if (!faceDirection || !allowedDirections.includes(faceDirection)) {
        placeError = `Bad Command: direction must be one of ${Object.values(allowedDirections).join(', ')}`
      }
    }

    this.error = placeError

    const newTableTopState = update(this.$store.getters.tableTop, {
      faceDirection: { $set: !placeError ? (faceDirection as RobotFaceDirectionEnum) : this.$store.getters.tableTop.faceDirection },
      reportPosition: { $set: false },
      robotIsPlaced: { $set: !placeError ? true : this.$store.getters.tableTop.robotIsPlaced },
      xcoord: { $set: !placeError ? xcoord : this.$store.getters.tableTop.xcoord },
      ycoord: { $set: !placeError ? ycoord : this.$store.getters.tableTop.ycoord },
    })
    this.$store.dispatch('updateTable', newTableTopState)
    this.$store.dispatch('addCommandRecord', { command: fullString, error: !!placeError })
  }

  public tryMoveRobot(command: CommandType) {
    const { faceDirection, gridSize, robotIsPlaced, xcoord, ycoord } = this.$store.getters.tableTop

    let moveError = null
    let x = xcoord
    let y = ycoord

    if (!robotIsPlaced || x === undefined || y === undefined) {
      moveError = 'Cannot move unplaced robot'
    } else {
      if (faceDirection === RobotFaceDirectionEnum.East) {
        x = x >= gridSize - 1 ? x : x + 1
      } else if (faceDirection === RobotFaceDirectionEnum.North) {
        y = y >= gridSize - 1 ? y : y + 1
      } else if (faceDirection === RobotFaceDirectionEnum.South) {
        y = y === 0 ? y : y - 1
      } else if (faceDirection === RobotFaceDirectionEnum.West) {
        x = x === 0 ? x : x - 1
      }
      moveError = x === xcoord && y === ycoord ? 'Cannot move robot off the table' : null
    }

    this.error = moveError
      if (!moveError) {
      const newTableTopState = update(this.$store.getters.tableTop, {
        reportPosition: { $set: false },
        xcoord: { $set: x },
        ycoord: { $set: y },
      })
      this.$store.dispatch('updateTable', newTableTopState)
    }
    this.$store.dispatch('addCommandRecord', { command: command.fullString, error: !!moveError })
  }

  public tryTurnRobot(command: CommandType) {
    const { faceDirection, robotIsPlaced } = this.$store.getters.tableTop
    const { baseCommand, fullString } = command

    let turnError = null
    let newDir: RobotFaceDirectionEnum = faceDirection

    if (robotIsPlaced && faceDirection) {
      if (faceDirection === RobotFaceDirectionEnum.East) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.North : RobotFaceDirectionEnum.South
      }
      if (faceDirection === RobotFaceDirectionEnum.North) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.West : RobotFaceDirectionEnum.East
      }
      if (faceDirection === RobotFaceDirectionEnum.South) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.East : RobotFaceDirectionEnum.West
      }
      if (faceDirection === RobotFaceDirectionEnum.West) {
        newDir = baseCommand === BaseCommandEnum.Left ? RobotFaceDirectionEnum.South : RobotFaceDirectionEnum.North
      }
    } else {
      turnError = 'Cannot turn unplaced robot'
    }

    this.error = turnError
    if (!turnError) {
      const newTableTopState = update(this.$store.getters.tableTop, {
        faceDirection: { $set: newDir },
        reportPosition: { $set: false },
      })
      this.$store.dispatch('updateTable', newTableTopState)
    }
    this.$store.dispatch('addCommandRecord', { command: fullString, error: !!turnError })
  }

  public tryReportPosition(command: CommandType) {
    const { robotIsPlaced } = this.$store.getters.tableTop

    let reportError = null
    if (!robotIsPlaced) {
      reportError = 'Cannot report position of unplaced robot'
    }

    this.error = reportError
    const newTableTopState = update(this.$store.getters.tableTop, {
      reportPosition: { $set: reportError ? false : true },
    })
    this.$store.dispatch('updateTable', newTableTopState)
    this.$store.dispatch('addCommandRecord', { command: command.fullString, error: !!reportError })
  }
}
</script>
