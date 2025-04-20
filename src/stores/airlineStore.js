import { defineStore } from "pinia";
import { airlineData } from "@/data/management-airline.js";

export const useAirlineStore = defineStore("airline", {
  state: () => ({
    airlines: [],
    selectedAirline: null,
  }),

  getters: {
    getTotalAirlines: (state) => state.airlines.length,
    getAllAirlines: (state) => state.airlines,
    getAirlineByID: (state) => (airlineID) => {
      return state.airlines.find((airline) => airline.airlineID === airlineID);
    },
  },

  actions: {
    loadAirlines() {
      this.airlines = airlineData;
    },
    addAirline(airline) {
      this.airlines.push(airline);
    },
  },
});
