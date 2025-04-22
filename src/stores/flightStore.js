import { defineStore } from "pinia";
import { flightData } from "@/data/management-flight";

export const useFlightStore = defineStore("flight", {
  state: () => ({
    flights: [],
    searchQuery: "",
    selectedFlightStatus: null,
  }),

  getters: {
    getAllFlights: (state) => state.flights,
    getFlightsByAirlineId: (state) => (airlineID) => {
      const trimmedID = airlineID.trim().toLowerCase();
      const query = state.searchQuery;
      const selectedStatus = state.selectedFlightStatus;

      return state.flights.filter((flight) => {
        const matchAirlineID = flight.airlineID.toLowerCase() === trimmedID;

        const matchQuery =
          !query || String(flight.flightID).toLowerCase().includes(query);

        const matchStatus =
          !selectedStatus ||
          selectedStatus === "all" ||
          flight.flightStatus === selectedStatus;

        return matchAirlineID && matchQuery && matchStatus;
      });
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
    setSearchQuery(query) {
      const trimmedQuery = query.trim().toLowerCase();
      this.searchQuery = trimmedQuery;
    },
    setSelectedStatus(status) {
      this.selectedFlightStatus = status;
    },
  },
});
