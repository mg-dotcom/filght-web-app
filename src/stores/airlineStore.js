import { defineStore } from "pinia";
import { airlineData } from "@/data/management-airline.js";

export const useAirlineStore = defineStore("airline", {
  state: () => ({
    airlines: [],
    selectedAirline: null,
  }),

  getters: {
    getTotalAirlines: (state) => state.airlines.length,
  },

  actions: {
    loadAirlines() {
      this.airlines = airlineData;
    },
    addAirline(airline) {
      this.airlines.push(airline);
    },
    getAllAirlines() {
      return this.airlines;
    },
  },
});
