// Seat statuses
const AVAILABLE = "available";
const UNAVAILABLE = "unavailable";

// Seat class types
const ECONOMY = "Economy";
const BUSINESS = "Business";
const FIRST_CLASS = "First Class";

// Seat data export
export const seatData = {
  classTypes: [
    { id: "economy", name: ECONOMY },
    { id: "business", name: BUSINESS, active: true },
    { id: "first-class", name: FIRST_CLASS },
  ],
  columns: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  seats: [
    // Row 01
    { id: "01A", row: "01", col: "A", status: UNAVAILABLE, class: ECONOMY },
    { id: "01B", row: "01", col: "B", status: UNAVAILABLE, class: ECONOMY },
    { id: "01C", row: "01", col: "C", status: UNAVAILABLE, class: ECONOMY },
    { id: "01D", row: "01", col: "D", status: UNAVAILABLE, class: BUSINESS },
    { id: "01E", row: "01", col: "E", status: UNAVAILABLE, class: BUSINESS },
    { id: "01F", row: "01", col: "F", status: AVAILABLE, class: BUSINESS },
    { id: "01G", row: "01", col: "G", status: AVAILABLE, class: FIRST_CLASS },
    { id: "01H", row: "01", col: "H", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "01I", row: "01", col: "I", status: UNAVAILABLE, class: FIRST_CLASS },

    // Row 02
    { id: "02A", row: "02", col: "A", status: UNAVAILABLE, class: ECONOMY },
    { id: "02B", row: "02", col: "B", status: UNAVAILABLE, class: ECONOMY },
    { id: "02C", row: "02", col: "C", status: AVAILABLE, class: ECONOMY },
    { id: "02D", row: "02", col: "D", status: AVAILABLE, class: BUSINESS },
    { id: "02E", row: "02", col: "E", status: UNAVAILABLE, class: BUSINESS },
    { id: "02F", row: "02", col: "F", status: UNAVAILABLE, class: BUSINESS },
    { id: "02G", row: "02", col: "G", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "02H", row: "02", col: "H", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "02I", row: "02", col: "I", status: UNAVAILABLE, class: FIRST_CLASS },

    // Row 03
    { id: "03A", row: "03", col: "A", status: UNAVAILABLE, class: ECONOMY },
    { id: "03B", row: "03", col: "B", status: UNAVAILABLE, class: ECONOMY },
    { id: "03C", row: "03", col: "C", status: AVAILABLE, class: ECONOMY },
    { id: "03D", row: "03", col: "D", status: UNAVAILABLE, class: BUSINESS },
    { id: "03E", row: "03", col: "E", status: UNAVAILABLE, class: BUSINESS },
    { id: "03F", row: "03", col: "F", status: UNAVAILABLE, class: BUSINESS },
    { id: "03G", row: "03", col: "G", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "03H", row: "03", col: "H", status: AVAILABLE, class: FIRST_CLASS },
    { id: "03I", row: "03", col: "I", status: UNAVAILABLE, class: FIRST_CLASS },

    // Row 04
    { id: "04A", row: "04", col: "A", status: AVAILABLE, class: ECONOMY },
    { id: "04B", row: "04", col: "B", status: UNAVAILABLE, class: ECONOMY },
    { id: "04C", row: "04", col: "C", status: UNAVAILABLE, class: ECONOMY },
    { id: "04D", row: "04", col: "D", status: UNAVAILABLE, class: BUSINESS },
    { id: "04E", row: "04", col: "E", status: AVAILABLE, class: BUSINESS },
    { id: "04F", row: "04", col: "F", status: AVAILABLE, class: BUSINESS },
    { id: "04G", row: "04", col: "G", status: AVAILABLE, class: FIRST_CLASS },
    { id: "04H", row: "04", col: "H", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "04I", row: "04", col: "I", status: AVAILABLE, class: FIRST_CLASS },

    // Row 05
    { id: "05A", row: "05", col: "A", status: AVAILABLE, class: ECONOMY },
    { id: "05B", row: "05", col: "B", status: AVAILABLE, class: ECONOMY },
    { id: "05C", row: "05", col: "C", status: AVAILABLE, class: ECONOMY },
    { id: "05D", row: "05", col: "D", status: UNAVAILABLE, class: BUSINESS },
    { id: "05E", row: "05", col: "E", status: AVAILABLE, class: BUSINESS },
    { id: "05F", row: "05", col: "F", status: UNAVAILABLE, class: BUSINESS },
    { id: "05G", row: "05", col: "G", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "05H", row: "05", col: "H", status: AVAILABLE, class: FIRST_CLASS },
    { id: "05I", row: "05", col: "I", status: UNAVAILABLE, class: FIRST_CLASS },

    // Row 06 (labeled as 05 in the image)
    { id: "06A", row: "06", col: "A", status: UNAVAILABLE, class: ECONOMY },
    { id: "06B", row: "06", col: "B", status: AVAILABLE, class: ECONOMY },
    { id: "06C", row: "06", col: "C", status: UNAVAILABLE, class: ECONOMY },
    { id: "06D", row: "06", col: "D", status: AVAILABLE, class: BUSINESS },
    { id: "06E", row: "06", col: "E", status: AVAILABLE, class: BUSINESS },
    { id: "06F", row: "06", col: "F", status: UNAVAILABLE, class: BUSINESS },
    { id: "06G", row: "06", col: "G", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "06H", row: "06", col: "H", status: AVAILABLE, class: FIRST_CLASS },
    { id: "06I", row: "06", col: "I", status: UNAVAILABLE, class: FIRST_CLASS },

    // Row 07 (labeled as 05 in the image)
    { id: "07A", row: "07", col: "A", status: UNAVAILABLE, class: ECONOMY },
    { id: "07B", row: "07", col: "B", status: UNAVAILABLE, class: ECONOMY },
    { id: "07C", row: "07", col: "C", status: AVAILABLE, class: ECONOMY },
    { id: "07D", row: "07", col: "D", status: UNAVAILABLE, class: BUSINESS },
    { id: "07E", row: "07", col: "E", status: UNAVAILABLE, class: BUSINESS },
    { id: "07F", row: "07", col: "F", status: AVAILABLE, class: BUSINESS },
    { id: "07G", row: "07", col: "G", status: AVAILABLE, class: FIRST_CLASS },
    { id: "07H", row: "07", col: "H", status: UNAVAILABLE, class: FIRST_CLASS },
    { id: "07I", row: "07", col: "I", status: AVAILABLE, class: FIRST_CLASS },
  ],
};

export const getSeatById = (seatId) => {
  return seatData.seats.find((seat) => seat.id === seatId);
};

export const getUniqueRows = () => {
  return [...new Set(seatData.seats.map((seat) => seat.row))].sort(
    (a, b) => a - b
  );
};

export const getSeatStatus = (seatId) => {
  const seat = getSeatById(seatId);
  if (!seat) return "seat-unknown";

  return seat.status === "available" ? "seat-available" : "seat-unavailable";
};

export const isSeatAvailable = (seatId) => {
  const seat = getSeatById(seatId);
  return seat && seat.status === "available";
};

export const getSeatInfo = (seatId) => {
  const seat = getSeatById(seatId);
  if (!seat) return "Unknown Seat";

  return `${seat.id} - ${seat.class} (${seat.status})`;
};

export const formatSeatId = (rowNum, col) => {
  return rowNum.padStart(2, "0") + col;
};
