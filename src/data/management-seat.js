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
  columns: ["A", "B", "C", "", "D", "E", "F", "", "G", "H", "I"],
};

// ตัวอย่างข้อมูล
export const economySeatsData = [
  // Row 01
  {
    id: "A01",
    row: "01",
    col: "A",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "B01",
    row: "01",
    col: "B",
    status: UNAVAILABLE,
    isCheckedIn: true,
    class: ECONOMY,
  },
  {
    id: "C01",
    row: "01",
    col: "C",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "D01",
    row: "01",
    col: "D",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "E01",
    row: "01",
    col: "E",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "F01",
    row: "01",
    col: "F",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "G01",
    row: "01",
    col: "G",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "H01",
    row: "01",
    col: "H",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "I01",
    row: "01",
    col: "I",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },

  // Row 02
  {
    id: "A02",
    row: "02",
    col: "A",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "B02",
    row: "02",
    col: "B",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "C02",
    row: "02",
    col: "C",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "D02",
    row: "02",
    col: "D",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "E02",
    row: "02",
    col: "E",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "F02",
    row: "02",
    col: "F",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "G02",
    row: "02",
    col: "G",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "H02",
    row: "02",
    col: "H",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "I02",
    row: "02",
    col: "I",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },

  // Row 03
  {
    id: "A03",
    row: "03",
    col: "A",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "B03",
    row: "03",
    col: "B",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "C03",
    row: "03",
    col: "C",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "D03",
    row: "03",
    col: "D",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "E03",
    row: "03",
    col: "E",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "F03",
    row: "03",
    col: "F",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "G03",
    row: "03",
    col: "G",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "H03",
    row: "03",
    col: "H",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "I03",
    row: "03",
    col: "I",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },

  // Row 04
  {
    id: "A04",
    row: "04",
    col: "A",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "B04",
    row: "04",
    col: "B",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "C04",
    row: "04",
    col: "C",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "D04",
    row: "04",
    col: "D",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "E04",
    row: "04",
    col: "E",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "F04",
    row: "04",
    col: "F",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "G04",
    row: "04",
    col: "G",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "H04",
    row: "04",
    col: "H",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "I04",
    row: "04",
    col: "I",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  // Row 05
  {
    id: "A05",
    row: "05",
    col: "A",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "B05",
    row: "05",
    col: "B",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "C05",
    row: "05",
    col: "C",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "D05",
    row: "05",
    col: "D",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "E05",
    row: "05",
    col: "E",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "F05",
    row: "05",
    col: "F",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "G05",
    row: "05",
    col: "G",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "H05",
    row: "05",
    col: "H",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "I05",
    row: "05",
    col: "I",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  // Row 06
  {
    id: "A06",
    row: "06",
    col: "A",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "B06",
    row: "06",
    col: "B",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "C06",
    row: "06",
    col: "C",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "D06",
    row: "06",
    col: "D",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "E06",
    row: "06",
    col: "E",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "F06",
    row: "06",
    col: "F",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "G06",
    row: "06",
    col: "G",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "H06",
    row: "06",
    col: "H",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "I06",
    row: "06",
    col: "I",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },

  // Row 07
  {
    id: "A07",
    row: "07",
    col: "A",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "B07",
    row: "07",
    col: "B",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "C07",
    row: "07",
    col: "C",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "D07",
    row: "07",
    col: "D",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "E07",
    row: "07",
    col: "E",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "F07",
    row: "07",
    col: "F",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "G07",
    row: "07",
    col: "G",
    status: UNAVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "H07",
    row: "07",
    col: "H",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
  {
    id: "I07",
    row: "07",
    col: "I",
    status: AVAILABLE,
    isCheckedIn: false,
    class: ECONOMY,
  },
];

// ย่อเป้นการทำงานแบบ loop
export const businessSeatsData = [
  ...Array.from({ length: 7 }, (_, rowIndex) => {
    const row = (rowIndex + 1).toString().padStart(2, "0");
    return ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
      (col, colIndex) => ({
        id: col + row,
        row,
        col,
        status: (rowIndex + colIndex) % 2 === 0 ? "unavailable" : "available",
        isCheckedIn: (rowIndex + colIndex) % 3 === 0,
        class: BUSINESS,
      })
    );
  }).flat(),
];

// ย่อเป้นการทำงานแบบ loop
export const firstClassSeatsData = [
  ...Array.from({ length: 7 }, (_, rowIndex) => {
    const row = (rowIndex + 1).toString().padStart(2, "0");
    return ["A", "B", "C", "D", "E", "F", "G", "H", "I"].map(
      (col, colIndex) => ({
        id: col + row,
        row,
        col,
        status: (rowIndex + colIndex) % 3 === 0 ? "unavailable" : "available",
        isCheckedIn: (rowIndex + colIndex) % 4 === 0,
        class: FIRST_CLASS,
      })
    );
  }).flat(),
];

// Helper functions
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

  return `${seat.id} - (${seat.status}) - ${seat.class}`;
};

export const getUniqueRows = (seats) => {
  return [...new Set(seats.map((seat) => seat.row))].sort((a, b) => a - b);
};

export const formatSelectedClassTypeId = (classTypeId) => {
  switch (classTypeId) {
    case "economy":
      return "Economy";
    case "business":
      return "Business";
    case "first-class":
      return "First Class";
    default:
      return "Unknown Class";
  }
};

export const formatSeatId = (rowNum, col) => {
  return col + rowNum.padStart(2, "0");
};
