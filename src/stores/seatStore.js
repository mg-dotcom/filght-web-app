import { defineStore } from "pinia";
import { seatData } from "@/data/management-seat";

export const useSeatStore = defineStore("seat", {
  state: () => ({
    seats: [],
    selectedSeat: null,
  }),

  getters: {
    getAllSeats: (state) => state.seats,
    getSeatsByFlightId: (state) => (flightID) => {
      return state.seats.filter((seat) => seat.flightID === flightID);
    },
    getSeatByID: (state) => (seatID) => {
      return state.seats.find((seat) => seat.seatID === seatID);
    },
    getEconomySeatsByFlightId: (state) => (flightID) => {
      return state.seats.filter(
        (seat) => seat.flightID === flightID && seat.seatClass === "economy"
      );
    },
    getBusinessSeatsByFlightId: (state) => (flightID) => {
      return state.seats.filter(
        (seat) => seat.flightID === flightID && seat.seatClass === "business"
      );
    },
    getFirstClassSeatsByFlightId: (state) => (flightID) => {
      return state.seats.filter(
        (seat) => seat.flightID === flightID && seat.seatClass === "first-class"
      );
    },
  },

  actions: {
    loadSeats() {
      this.seats = seatData;
    },
  },
});
