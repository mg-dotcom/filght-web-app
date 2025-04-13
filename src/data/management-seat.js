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
    { id: "business", name: BUSINESS },
    { id: "first-class", name: FIRST_CLASS },
  ],
  columns: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
};

// ตัวอย่างข้อมูล
export const economySeats = [
  // Row 01
  { id: "01A", row: "01", col: "A", status: AVAILABLE },
  { id: "01B", row: "01", col: "B", status: UNAVAILABLE },
  { id: "01C", row: "01", col: "C", status: AVAILABLE },
  { id: "01D", row: "01", col: "D", status: UNAVAILABLE },
  { id: "01E", row: "01", col: "E", status: AVAILABLE },
  { id: "01F", row: "01", col: "F", status: UNAVAILABLE },
  { id: "01G", row: "01", col: "G", status: AVAILABLE },
  { id: "01H", row: "01", col: "H", status: AVAILABLE },
  { id: "01I", row: "01", col: "I", status: UNAVAILABLE },

  // Row 02
  { id: "02A", row: "02", col: "A", status: AVAILABLE },
  { id: "02B", row: "02", col: "B", status: UNAVAILABLE },
  { id: "02C", row: "02", col: "C", status: UNAVAILABLE },
  { id: "02D", row: "02", col: "D", status: AVAILABLE },
  { id: "02E", row: "02", col: "E", status: AVAILABLE },
  { id: "02F", row: "02", col: "F", status: UNAVAILABLE },
  { id: "02G", row: "02", col: "G", status: AVAILABLE },
  { id: "02H", row: "02", col: "H", status: UNAVAILABLE },
  { id: "02I", row: "02", col: "I", status: AVAILABLE },

  // Row 03
  { id: "03A", row: "03", col: "A", status: UNAVAILABLE },
  { id: "03B", row: "03", col: "B", status: AVAILABLE },
  { id: "03C", row: "03", col: "C", status: UNAVAILABLE },
  { id: "03D", row: "03", col: "D", status: AVAILABLE },
  { id: "03E", row: "03", col: "E", status: UNAVAILABLE },
  { id: "03F", row: "03", col: "F", status: AVAILABLE },
  { id: "03G", row: "03", col: "G", status: UNAVAILABLE },
  { id: "03H", row: "03", col: "H", status: AVAILABLE },
  { id: "03I", row: "03", col: "I", status: UNAVAILABLE },

  // Row 04
  { id: "04A", row: "04", col: "A", status: AVAILABLE },
  { id: "04B", row: "04", col: "B", status: UNAVAILABLE },
  { id: "04C", row: "04", col: "C", status: AVAILABLE },
  { id: "04D", row: "04", col: "D", status: UNAVAILABLE },
  { id: "04E", row: "04", col: "E", status: UNAVAILABLE },
  { id: "04F", row: "04", col: "F", status: AVAILABLE },
  { id: "04G", row: "04", col: "G", status: UNAVAILABLE },
  { id: "04H", row: "04", col: "H", status: AVAILABLE },
  { id: "04I", row: "04", col: "I", status: AVAILABLE },

  // Row 05
  { id: "05A", row: "05", col: "A", status: UNAVAILABLE },
  { id: "05B", row: "05", col: "B", status: AVAILABLE },
  { id: "05C", row: "05", col: "C", status: UNAVAILABLE },
  { id: "05D", row: "05", col: "D", status: AVAILABLE },
  { id: "05E", row: "05", col: "E", status: UNAVAILABLE },
  { id: "05F", row: "05", col: "F", status: AVAILABLE },
  { id: "05G", row: "05", col: "G", status: UNAVAILABLE },
  { id: "05H", row: "05", col: "H", status: AVAILABLE },
  { id: "05I", row: "05", col: "I", status: AVAILABLE },

  // Row 06
  { id: "06A", row: "06", col: "A", status: AVAILABLE },
  { id: "06B", row: "06", col: "B", status: UNAVAILABLE },
  { id: "06C", row: "06", col: "C", status: AVAILABLE },
  { id: "06D", row: "06", col: "D", status: UNAVAILABLE },
  { id: "06E", row: "06", col: "E", status: AVAILABLE },
  { id: "06F", row: "06", col: "F", status: UNAVAILABLE },
  { id: "06G", row: "06", col: "G", status: AVAILABLE },
  { id: "06H", row: "06", col: "H", status: UNAVAILABLE },
  { id: "06I", row: "06", col: "I", status: AVAILABLE },

  // Row 07
  { id: "07A", row: "07", col: "A", status: UNAVAILABLE },
  { id: "07B", row: "07", col: "B", status: AVAILABLE },
  { id: "07C", row: "07", col: "C", status: UNAVAILABLE },
  { id: "07D", row: "07", col: "D", status: AVAILABLE },
  { id: "07E", row: "07", col: "E", status: UNAVAILABLE },
  { id: "07F", row: "07", col: "F", status: AVAILABLE },
  { id: "07G", row: "07", col: "G", status: UNAVAILABLE },
  { id: "07H", row: "07", col: "H", status: AVAILABLE },
  { id: "07I", row: "07", col: "I", status: AVAILABLE },
];

// ย่อเป้นการทำงานแบบ loop
export const businessSeats = [
  ...Array.from({ length: 7 }, (_, rowIndex) => {
    const row = (rowIndex + 1).toString().padStart(2, "0");
    return ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
      (col, colIndex) => ({
        id: `${row}${col}`,
        row,
        col,
        status: (rowIndex + colIndex) % 2 === 0 ? "unavailable" : "available",
      })
    );
  }).flat(),
];

// ย่อเป้นการทำงานแบบ loop
export const firstClassSeats = [
  ...Array.from({ length: 7 }, (_, rowIndex) => {
    const row = (rowIndex + 1).toString().padStart(2, "0");
    return ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
      (col, colIndex) => ({
        id: `${row}${col}`,
        row,
        col,
        status: (rowIndex + colIndex) % 3 === 0 ? "unavailable" : "available",
      })
    );
  }).flat(),
];

// Helper functions to manage seat data
const getSeatById = (seats, seatId) => {
  return seats.find((seat) => seat.id === seatId);
};

export const getSeatStatus = (seats, seatId) => {
  const seat = getSeatById(seats, seatId);
  if (!seat) return "seat-unknown";

  return seat.status === "available" ? "seat-available" : "seat-unavailable";
};

export const isSeatAvailable = (seats, seatId) => {
  const seat = getSeatById(seats, seatId);
  return seat && seat.status === "available";
};

export const getSeatInfo = (seats, seatId) => {
  const seat = getSeatById(seats, seatId);
  if (!seat) return "Unknown Seat";

  return `${seat.id} - ${seat.class} (${seat.status})`;
};

export const getUniqueRows = (seats) => {
  return [...new Set(seats.map((seat) => seat.row))].sort((a, b) => a - b);
};

export const formatSeatId = (rowNum, col) => {
  return rowNum.padStart(2, "0") + col;
};
