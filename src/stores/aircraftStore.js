import { defineStore } from "pinia";
import { aircraftData } from "@/data/aircraft";

export const useAircraftStore = defineStore("aircraft", {
  state: () => ({
    aircraft: [],
    selectedAircraft: null,
  }),

  getters: {
    getTotalAircraft: (state) => state.aircraft.length,
    getAllAircraft: (state) => state.aircraft,
    getAircraftByID: (state) => (aircraftID) => {
      return state.aircraft.find(
        (aircraft) => aircraft.aircraftID === aircraftID
      );
    },
  },

  actions: {
    loadAircrafts() {
      this.aircraft = aircraftData;
    },
  },
});
