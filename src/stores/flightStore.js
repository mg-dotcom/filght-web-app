import { defineStore } from "pinia";
import { flightData } from "@/data/management-flight";
import { ref } from "vue";

export const useFlightStore = defineStore("flight", {
  state: () => ({
    flights: ref([]),
    selectedFlight: null,
  }),

  getters: {
    getAllFlights: (state) => state.flights,
    getFlightsByAirlineId: (state) => (airlineID) => {
      return state.flights.filter((flight) => flight.airlineID === airlineID);
    },
    getFlightByID: (state) => (flightID) => {
      return state.flights.find((flight) => flight.flightID === flightID);
    },
  },

  actions: {
    loadFlights() {
      this.flights = flightData;
    },
    addFlight(flight) {
      this.flights.push(flight);
    },
  },
});
