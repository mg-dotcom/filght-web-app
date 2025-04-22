import { defineStore } from "pinia";
import { airlineData } from "@/data/management-airline.js";

export const useAirlineStore = defineStore("airline", {
  state: () => ({
    airlines: [],
    searchQuery: "",
  }),

  getters: {
    getTotalAirlines: (state) => state.airlines.length,
    getAllAirlines: (state) => {
      if (!state.searchQuery) {
        return state.airlines;
      }
      return state.airlines.filter((airline) =>
        airline.airlineID
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
      );
    },
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
    setSearchQuery(query) {
      this.searchQuery = query.trim();
    },
  },
});
