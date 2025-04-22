import { defineStore } from "pinia";
import { flightData } from "@/data/management-flight";

export const useFlightStore = defineStore("flight", {
  state: () => ({
    flights: [],
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
    getFlightStatusByID: (state) => (flightID) => {
      const flight = state.flights.find(
        (flight) => flight.flightID === flightID
      );
      return flight ? flight.flightStatus : null;
    },
  },

  actions: {
    loadFlights() {
      this.flights = flightData;
    },
    addFlight(flight) {
      this.flights.push(flight);
    },
    updateSeatFlightAvailability(flightID, isSeatAvailable) {
      const index = this.flights.findIndex(
        (flight) => flight.flightID === flightID
      );
      if (index !== -1) {
        const updated = {
          ...this.flights[index],
          isSeatAvailable: isSeatAvailable,
        };
        this.flights.splice(index, 1, updated);
      }
    },
  },
});
