import Vue from 'vue'
import Vuex from 'vuex'
import type { CommandHistoryEntryType, TableStateType } from '../globalTypes' // eslint-disable-line

Vue.use(Vuex)

const initialTableTopState: TableStateType = {
  gridSize: 5,
  robotIsPlaced: false,
}

const initialCommandHistoryState: CommandHistoryEntryType[] = []

export default new Vuex.Store({
  state: {
    commandHistory: initialCommandHistoryState,
    tableTop: initialTableTopState,
  },
  mutations: {
    addCommandRecord(state, command: CommandHistoryEntryType) {
      state.commandHistory = [...state.commandHistory, command]
    },
    resetTable(state) {
      state.tableTop = initialTableTopState
    },
    updateTable (state, newTableState) {
      state.tableTop = newTableState
    },
  },
  getters: {
    commandHistory: state => state.commandHistory,
    tableTop: state => state.tableTop,
  },
  actions: {
    addCommandRecord(context, payload) {
      context.commit('addCommandRecord', payload)
    },
    updateTable (context, payload) {
      context.commit('updateTable', payload)
    },
  },
  modules: {}
})
