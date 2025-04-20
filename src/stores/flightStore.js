import { defineStore } from "pinia";
import { flightData } from "@/data/management-flight";

export const useFlightStore = defineStore("flight", {
  state: () => ({
    flights: [],
    selectedFlight: null,
  }),

  getters: {
    getAvailableFlights: (state) =>
      state.flights.filter((f) => f.isSeatAvailable),
    getTotalFlights: (state) => state.flights.length,
    getAllFlights: (state) => state.flights,
  },

  actions: {
    loadFlights() {
      this.flights = flightData;
    },
  },
});
