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
      const trimmedID = (airlineID || "").trim().toLowerCase();
      const query = state.searchQuery?.toLowerCase();

      return state.flights.filter((flight) => {
        // Match airline ID ถ้ามี
        const matchAirlineID =
          !trimmedID || flight.airlineID.toLowerCase() === trimmedID;

        // Match flight ID search query ถ้ามี
        const matchQuery =
          !query || String(flight.flightID).toLowerCase().includes(query);

        return matchAirlineID && matchQuery;
      });
    },
    getFilteredFlightsByAirlineId: (state) => (airlineID) => {
      const trimmedID = (airlineID || "").trim().toLowerCase();
      const query = state.searchQuery?.toLowerCase() || "";
      const selectedStatus = state.selectedFlightStatus;

      console.log("Filtering with:", {
        trimmedID,
        query,
        selectedStatus: selectedStatus?.value,
      });

      return state.flights.filter((flight) => {
        // First check: airlineID must match
        const matchAirlineID = flight.airlineID.toLowerCase() === trimmedID;

        // Optional checks
        const matchQuery =
          !query || String(flight.flightID).toLowerCase().includes(query);

        const matchStatus =
          !selectedStatus || flight.flightStatus === selectedStatus.value;

        // For debugging
        if (matchAirlineID && !matchQuery)
          console.log("Failed query match:", flight.flightID);
        if (matchAirlineID && !matchStatus)
          console.log(
            "Failed status match:",
            flight.flightStatus,
            "vs",
            selectedStatus?.value
          );

        // Return true only if all applicable conditions are met
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
      this.searchQuery = query;
    },
    setSelectedStatus(status) {
      this.selectedFlightStatus =
        typeof status === "object" ? status : { value: status };
      // this.selectedFlightStatus = status;
    },
  },
});
