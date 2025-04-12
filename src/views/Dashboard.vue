<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

const stats = [
  { title: "Completed Flights", value: 99 },
  { title: "Active Flights", value: 99 },
  { title: "Canceled Flights", value: 99 },
  { title: "Total Flights", value: 999 },
];

const bookings = [
  {
    airline: "Piyavit Airlines",
    date: "Mar 09, 2024",
    seats: 350,
    departure: { time: "18:00", airport: "BKK" },
    arrival: { time: "07:00", airport: "CNX" },
    stops: {
      time: "11hrs",
      stop: "1 Stop",
    },
  },
  {
    airline: "Jaturon Airlines",
    date: "Mar 09, 2024",
    seats: 350,
    departure: { time: "16:00", airport: "Bangkok" },
    arrival: { time: "18:00", airport: "Chiangmai" },
    stops: {
      time: "2hrs",
      stop: "Non-Stop",
    },
  },
];

// Reservation Summary Chart Data
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Tickets",
      data: [2600, 3500, 3000, 1400, 2600, 5000, 4000],
      backgroundColor: [
        getComputedStyle(document.documentElement).getPropertyValue(
          "--c-light-blue"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--c-light-blue"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--c-light-blue"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--c-light-blue"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--c-light-blue"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--c-light-blue"
        ),
        getComputedStyle(document.documentElement).getPropertyValue(
          "--c-orange"
        ),
      ],
      borderRadius: 10,
      barPercentage: 0.9, 
      borderSkipped: false, 
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `${value / 1000}k`,
        color: "#94a3b8",
        font: {
          size: 12,
        },
      },
      grid: {
        drawTicks: false,
        color: "#e2e8f0",
      },
    },
    x: {
      ticks: {
        color: "#94a3b8",
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
      },
    },
  },
};
</script>

<template>
  <div class="dashboard">
    <!-- Stats Cards -->
    <div class="stats-container">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        :class="[stat.title.toLowerCase().replace(/\s+/g, '-') + '-stat-card']"
        class="stat-card"
      >
        <div class="curve-lines-top-left">
          <svg
            width="40"
            height="65"
            viewBox="0 0 40 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 64.3072C1.24399 56.7988 4.80632 40.1223 17.1036 33.4833C32.4753 25.1845 38.5752 10.958 38.5752 0.288208"
              stroke="#7B8080"
            />
          </svg>
          <svg
            width="53"
            height="105"
            viewBox="0 0 53 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 103.999C1.32961 91.8354 6.14187 64.8194 22.754 54.0642C43.5193 40.6202 51.7594 17.5733 51.7594 0.288208"
              stroke="#7B8080"
            />
          </svg>
          <svg
            width="65"
            height="149"
            viewBox="0 0 65 151"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 150.093C1.41094 132.523 7.41064 93.4999 28.1219 77.9646C54.011 58.5455 64.2845 25.2556 64.2845 0.288208"
              stroke="#7B8080"
            />
          </svg>
        </div>

        <div class="curve-lines-bottom-right">
          <svg
            width="40"
            height="65"
            viewBox="0 0 40 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 64.3072C1.24399 56.7988 4.80632 40.1223 17.1036 33.4833C32.4753 25.1845 38.5752 10.958 38.5752 0.288208"
              stroke="#7B8080"
            />
          </svg>
          <svg
            width="53"
            height="105"
            viewBox="0 0 53 105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 103.999C1.32961 91.8354 6.14187 64.8194 22.754 54.0642C43.5193 40.6202 51.7594 17.5733 51.7594 0.288208"
              stroke="#7B8080"
            />
          </svg>
          <svg
            width="65"
            height="149"
            viewBox="0 0 65 151"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 150.093C1.41094 132.523 7.41064 93.4999 28.1219 77.9646C54.011 58.5455 64.2845 25.2556 64.2845 0.288208"
              stroke="#7B8080"
            />
          </svg>
        </div>

        <div class="stat-content">
          <h3>{{ stat.title }}</h3>
          <div class="stat-value">{{ stat.value }}</div>
        </div>
        <div class="plane-icon" v-if="index !== stats.length - 1">
          <img src="/dashboard-pic/plane-type-flight.png" alt="" />
        </div>
        <div class="world-map-icon" v-else>
          <img src="/dashboard-pic/world-map.png" alt="" />
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="bookings-section">
        <div class="section-header">
          <h2>All Bookings</h2>
          <p>Overview of Recent Reservation</p>
          <button class="more-btn">MORE</button>
        </div>

        <div class="bookings-list">
          <div class="bookings-header">
            <div class="header-left">Desination</div>
            <div class="header-right">Detail</div>
          </div>
          <div
            v-for="(booking, index) in bookings"
            :key="index"
            class="booking-item"
          >
            <!-- Left Side: Flight Path -->
            <div class="booking-left">
              <div class="departure">
                <img src="/dashboard-pic/plane-booking-up.png" alt="" />
                <div class="departure-info">
                  <div class="time">{{ booking.departure.time }}</div>
                  <div class="airport">{{ booking.departure.airport }}</div>
                </div>
              </div>

              <div class="flight-line">
                <p>
                  {{ booking.stops.time }}
                </p>
                <div class="line">
                  <img src="/dashboard-pic/icons/plane-icon.png" alt="" />
                </div>
                <p>
                  {{ booking.stops.stop }}
                </p>
              </div>

              <div class="arrival">
                <img src="/dashboard-pic/plane-booking-down.png" alt="" />
                <div class="arrival-info">
                  <div class="time">{{ booking.arrival.time }}</div>
                  <div class="airport">{{ booking.arrival.airport }}</div>
                </div>
              </div>
            </div>

            <!-- Right Side: Info -->
            <div class="booking-right">
              <div class="booking-airline">{{ booking.airline }}</div>
              <div class="booking-details">
                <div class="date">
                  <img src="/dashboard-pic/icons/calendar-icon.png" alt="" />
                  <p>{{ booking.date }}</p>
                </div>
                <div class="seats">
                  <img src="/dashboard-pic/icons/group-icon.png" alt="" />
                  <p>{{ booking.seats }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-summary">
        <div class="section-header">
          <h2>Reservation Summary</h2>
        </div>

        <div class="summary-header">
          <div>Now</div>
          <div class="ticket-sold">3500 <span>Tickets Sold</span></div>
        </div>

        <Bar class="bar-chart" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 20px;
  padding: 20px;
  background-color: var(--color-background);
  color: var(--color-text);
}

/* ส่วนของ Stats Cards */
.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 2fr;
  gap: 15px;
}

.stat-card {
  position: relative;
  border-radius: 10px;
  padding: 20px;
  color: var(--vt-c-white);
  overflow: visible;
  opacity: 1;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-out;
}

.stat-card:hover {
  opacity: 0.95;
  transform: scale(1.02);
  cursor: pointer;
}

.stat-card:nth-last-child(1) {
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.stat-card:nth-last-child(1) .curve-lines-top-left,
.stat-card:nth-last-child(1) .curve-lines-bottom-right {
  display: none;
}

.curve-lines-top-left {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  filter: sepia(100%);
  opacity: 0.5;
}

.curve-lines-top-left svg {
  position: absolute;
  top: -10px;
  left: -10px;
}

.curve-lines-bottom-right {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  filter: sepia(100%);
  opacity: 0.5;
}

.curve-lines-bottom-right svg {
  position: absolute;
  bottom: -10px;
  right: -10px;
}

.stat-content {
  position: relative;
  z-index: 1;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 10px 0;
  z-index: 1;
}

.plane-icon img {
  position: absolute;
  right: -16px;
  bottom: -48px;
  width: 80%;
  opacity: 0.9;
  z-index: 1;
}

.world-map-icon img {
  width: 90%;
}

.completed-flights-stat-card {
  background-color: var(--c-dark-navy);
}

.active-flights-stat-card {
  background-color: var(--c-navy);
}

.canceled-flights-stat-card {
  background-color: var(--c-orange);
}

.total-flights-stat-card {
  background-color: var(--c-dark-navy);
}

/* ส่วนของ Main Content Area */
.main-content {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 20px;
}

/* ส่วนของ Bookings Section */
.section-header {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  font-weight: 700;
  color: var(--c-navy-light);
}

.section-header p {
  color: var(--c-navy-green);
  font-weight: 400;
  font-size: 0.9rem;
}

.more-btn {
  position: absolute;
  color: var(--c-navy-light);
  right: 0;
  top: 10px;
  background-color: var(--vt-c-white);
  border: 1px solid var(--c-light-blue);
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.more-btn:hover {
  background-color: var(--c-light-blue);
  color: var(--vt-c-white);
  transition: background-color 0.3s ease-in-out;
}

.bookings-section {
  background-color: var(--vt-c-white);
  border-radius: 10px;
  padding: 35px;
  overflow: visible; /* เพื่อให้เห็น pseudo-elements ที่เลยออกมา */
  position: relative; /* เผื่อใช้กับ child ถ้าต้อง */
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bookings-header {
  position: relative; /* ต้องมีเพื่อให้ absolute ทำงาน */
  color: var(--vt-c-gray);
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
  border-bottom: 3px dashed var(--c-soft-blue);
  padding-bottom: 10px;
}

.bookings-header::before,
.bookings-header::after {
  content: "";
  position: absolute;
  bottom: -13px;
  width: 25px;
  height: 25px;
  background-color: var(--c-soft-blue);
  border-radius: 50%;
  z-index: 1;
}

.bookings-header::before {
  left: -48px;
}

.bookings-header::after {
  right: -48px;
}
.booking-item {
  display: grid;
  position: relative;
  grid-template-columns: 3fr 1fr;
  gap: 30px;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 3px dashed var(--c-soft-blue);
}

.booking-item::before,
.booking-item::after {
  content: "";
  position: absolute;
  bottom: -13px;
  width: 25px;
  height: 25px;
  background-color: var(--c-soft-blue);
  border-radius: 50%;
}

.booking-item::before {
  left: -48px;
}

.booking-item::after {
  right: -48px;
}

.booking-item:last-child {
  border-bottom: none;
  padding-bottom: 10px;
}

.booking-item:last-child::before,
.booking-item:last-child::after {
  display: none;
}

.booking-right {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.booking-airline {
  font-weight: bold;
  color: var(--vt-c-gray-1);
}

.booking-details {
  font-family: "QuickSand", sans-serif;
  font-size: 0.9rem;
  color: var(--vt-c-gray-1);
  line-height: 1.4;
}

.date,
.seats {
  display: flex;
  align-items: center;
  gap: 5px;
}

.departure,
.arrival {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0;
  min-width: 120px;
}

.booking-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.flight-line {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.flight-line p {
  font-size: 0.8rem;
  color: var(--vt-c-gray-2);
  margin: 0;
}

.line {
  position: relative;
  width: 100%;
  max-width: 200px;
  height: 2px;
  background-color: var(--vt-c-gray-3);
}

.line img {
  position: absolute;
  width: 20px;
  left: 0;
  color: var(--c-soft-blue);
  animation: plane-move 4s infinite linear;
}

@keyframes plane-move {
  0% {
    transform: translateY(-50%) translateX(0);
  }
  100% {
    transform: translateY(-50%) translateX(180px);
  }
}

.line::before {
  left: 0;
}

.line::after {
  right: 0;
}

.line::before,
.line::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: var(--vt-c-gray-4);
  border-radius: 50%;
}

.line::before {
  left: 0;
}

.line::after {
  right: 0;
}

.time {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--c-navy-light);
}

.airport {
  font-size: 0.9rem;
  color: var(--vt-c-gray);
}

/* ส่วนของ Reservation Summary */
.reservation-summary {
  display: flex;
  flex-direction: column;
  background-color: var(--vt-c-white);
  border-radius: 10px;
  padding: 35px;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vt-c-gray);
}

.ticket-sold {
  display: flex;
  align-items: baseline;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--c-orange);
  gap: 5px;
}

.ticket-sold span {
  font-size: 0.9rem;
  font-weight: normal;
  color: var(--vt-c-gray);
}

/* Reservation Summary Chart */
.bar-chart {
  flex: 1;
}

/* Charts Section */
.charts-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.airlines-chart,
.schedule-chart {
  background-color: var(--vt-c-white);
  border-radius: 10px;
  padding: 20px;
}

h2 {
  margin-top: 0;
  color: var(--c-dark-gray-blue);
  font-size: 1.2rem;
}

.chart-placeholder {
  width: 100%;
  height: 200px;
  background-color: var(--c-soft-blue);
  border-radius: 10px;
  margin: 15px 0;
}

.chart-placeholder.circular {
  height: 200px;
  border-radius: 50%;
  width: 200px;
  margin: 20px auto;
  position: relative;
  background: conic-gradient(
    var(--c-orange) 0% 45%,
    var(--c-gray-blue) 45% 87%,
    var(--c-light-blue) 87% 100%
  );
}

.airlines-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-box {
  width: 15px;
  height: 15px;
  border-radius: 3px;
}

.airline-percentage {
  margin-left: auto;
  font-weight: bold;
}

.chart-types {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.chart-type {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
}

.chart-type::before {
  content: "";
  display: inline-block;
  width: 30px;
  height: 3px;
  border-radius: 2px;
}

.domestic::before {
  background-color: var(--c-navy);
}

.international::before {
  background-color: var(--c-orange);
}

@media (max-width: 1024px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .main-content,
  .charts-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: 1fr;
  }

  .plane-icon img {
    width: 60%;
  }
}
</style>
