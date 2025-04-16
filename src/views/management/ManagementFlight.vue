<script setup>
import ManagementOverview from "@/components/ManagementOverview.vue";
import { flightData } from "@/data/management-flight";
import FlightPagination from "@/components/management-flight/FlightPagination.vue";
import { ref, onMounted } from "vue";

const tableHeaders = [
  { label: "SeatAvailable", filter: true, center: true },
  { label: "Departure", filter: true },
  { label: "", filter: false }, // ช่องว่าง
  { label: "Destination", filter: true },
  { label: "Date", filter: true },
  { label: "Aircraft", filter: true },
  { label: "Status", filter: true },
  { label: "Action", filter: false },
];

const paginatedFlights = ref([]);

const updatePaginatedFlights = (flights) => {
  paginatedFlights.value = flights;
};

onMounted(() => {
  paginatedFlights.value = flightData.slice(0, 6);
});

const sortOrder = ref({});

const filterHeader = (headerLabel) => {
  // สร้างการจับคู่ระหว่างป้ายกำกับหัวตารางกับคุณสมบัติข้อมูลที่เกี่ยวข้อง
  const filterMap = {
    SeatAvailable: "isSeatAvailable",
    Departure: "departure.airport",
    Destination: "destination.airport",
    Date: "date",
    Aircraft: "aircraft",
    Status: "status",
  };

  // ดึง property ที่ต้องการกรอง
  const property = filterMap[headerLabel];

  if (!property) return;

  // กำหนดการเรียงลำดับเริ่มต้นหากยังไม่ได้ตั้งค่า หรือสลับระหว่างการเรียงจากน้อยไปมาก/มากไปน้อย/ไม่เรียง
  if (!sortOrder.value[property]) {
    sortOrder.value[property] = "asc";
  } else if (sortOrder.value[property] === "asc") {
    sortOrder.value[property] = "desc";
  } else {
    sortOrder.value[property] = "asc";
  }

  const currentOrder = sortOrder.value[property];

  // เรียงลำดับตามลำดับปัจจุบัน
  const sorted = [...flightData].sort((a, b) => {
    const getNestedValue = (obj, path) => {
      return path
        .split(".")
        .reduce((prev, curr) => (prev ? prev[curr] : null), obj);
    };

    const valueA = getNestedValue(a, property);
    const valueB = getNestedValue(b, property);

    if (typeof valueA === "boolean") {
      return currentOrder === "asc"
        ? valueA === valueB
          ? 0
          : valueA
          ? -1
          : 1
        : valueA === valueB
        ? 0
        : valueA
        ? 1
        : -1;
    }

    if (typeof valueA === "string") {
      return currentOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return currentOrder === "asc" ? valueA - valueB : valueB - valueA;
  });

  // อัปเดตรายการเที่ยวบินแบบแบ่งหน้าด้วยผลลัพธ์ที่เรียงลำดับหน้าแรก
  paginatedFlights.value = sorted.slice(0, 6);
};
</script>

<template>
  <ManagementOverview>
    <!-- ฝั่งซ้ายของ header -->
    <template #header-left>
      <div class="section-header">
        <h2>All Bookings</h2>
        <p>Overview of Recent Reservations</p>
      </div>
    </template>

    <!-- ฝั่งขวาของ header -->
    <template #header-right>
      <div class="controls">
        <div class="search-container">
          <div class="search-icon">
            <img src="/search-input.svg" alt="" />
          </div>
          <input type="text" placeholder="Search Flight" class="search-input" />
        </div>

        <div class="status-selector">
          <button class="status-button">Add +</button>
        </div>
      </div>
    </template>

    <template #content>
      <div class="management-filght-content">
        <div class="flight-table-header">
          <div
            class="header-item"
            v-for="(header, index) in tableHeaders"
            :key="index"
            :style="
              header.center ? 'display: flex; justify-content: center;' : ''
            "
          >
            {{ header.label }}
            <div
              v-if="header.filter"
              class="filter-icon"
              @click="filterHeader(header.label)"
            >
              <img
                src="/management-pic/management-airline/filter-icon.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          class="flight-row"
          v-for="(flight, index) in paginatedFlights"
          :key="index"
        >
          <div class="flight-cell seat-cell">
            <div class="seat-icon">
              <img
                v-if="flight.isSeatAvailable === true"
                src="/management-pic/management-seat/reserve-seat-type.png"
                alt="Seat"
              />
              <img
                v-else
                src="/management-pic/management-seat/unreserve-seat-type.png"
                alt="Seat"
              />
            </div>
          </div>

          <div class="flight-cell departure-cell">
            <div class="flight-info">
              <div class="flight-icon">
                <img src="/dashboard-pic/plane-booking-up.png" alt="Plane" />
              </div>
              <div class="flight-details">
                <div class="flight-code">
                  {{ flight.departure.airport }}
                </div>
                <div class="flight-time">
                  {{ flight.departure.time }}
                </div>
              </div>
            </div>
          </div>

          <div class="flight-cell route-cell">
            <div class="flight-line">
              <p>
                {{ flight.stops.time }}
              </p>
              <div class="line">
                <img
                  src="/dashboard-pic/icons/plane-icon.png"
                  :class="{
                    animate: flight.status === 'Pending',
                    center: flight.status !== 'Pending',
                  }"
                  alt=""
                />
              </div>
              <p>
                {{ flight.stops.stop }}
              </p>
            </div>
          </div>

          <div class="flight-cell destination-cell">
            <div class="flight-info">
              <div class="flight-icon">
                <img src="/dashboard-pic/plane-booking-down.png" alt="Plane" />
              </div>
              <div class="flight-details">
                <div class="flight-code">
                  {{ flight.destination.airport }}
                </div>
                <div class="flight-time">
                  {{ flight.destination.time }}
                </div>
              </div>
            </div>
          </div>

          <div class="flight-cell date-cell">
            {{ flight.date.split(" ")[0] }}<br />
            {{ flight.date.split(" ")[1] }} {{ flight.date.split(" ")[2] }}
          </div>

          <div class="flight-cell aircraft-cell">
            {{ flight.aircraft.split(" ")[0] }}<br />
            {{ flight.aircraft.split(" ")[1] }}
            {{ flight.aircraft.split(" ")[2] }}
          </div>

          <div class="flight-cell status-cell">
            <span
              class="status-badge"
              :class="{
                'status-completed': flight.status === 'Completed',
                'status-canceled': flight.status === 'Canceled',
                'status-pending': flight.status === 'Pending',
                'status-delayed': flight.status === 'Delayed',
              }"
            >
              {{ flight.status }}
            </span>
          </div>

          <div class="flight-cell action-cell">
            <button class="edit-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                ></path>
                <path
                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <FlightPagination @update:paginatedData="updatePaginatedFlights" />
    </template>
  </ManagementOverview>
</template>

<style scoped>
/* Header Section Styling */
.section-header {
  display: flex;
  flex-direction: column;
  position: relative;
}

.section-header h2 {
  margin: 0;
  font-weight: 700;
  color: var(--c-navy-light);
  font-size: 1.5rem;
}

.section-header p {
  color: var(--c-navy-green);
  font-weight: 400;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Control Section - Search and Buttons */
.controls {
  display: flex;
  gap: 15px;
  align-items: center;
}

/* Search Input Styling */
.search-container {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid var(--c-navy-light);
  border-radius: 24px;
  font-size: 14px;
}

.search-input::placeholder {
  color: var(--c-navy-light);
  opacity: 0.5;
}

.search-input:focus {
  outline: none;
  border-color: var(--c-navy);
  box-shadow: 0 0 5px rgba(57, 116, 153, 0.3);
  transition: all 0.3s ease;
}

/* Status Selector Button */
.status-selector {
  position: relative;
}

.status-button {
  padding: 10px 25px;
  border: 1px solid var(--c-navy-light);
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: var(--c-navy-light);
  transition: all 0.3s ease;
  font-weight: 500;
}

.status-button:hover {
  background-color: var(--c-navy-light);
  color: white;
}

/* Main Flight Table Container */
.management-flight-content {
  padding: 20px;
  width: 100%;
}

/* Table Header Styling */
.flight-table-header {
  display: grid;
  grid-template-columns: 1fr 120px 300px 120px 1fr 1fr 1fr 0.5fr;
  padding: 16px 0;
  border-bottom: 2px solid var(--c-soft-blue);
  color: var(--vt-c-gray);
  font-size: 14px;
  font-weight: 600;
  position: relative;
  letter-spacing: 0.5px;
}

.flight-table-header::after,
.flight-table-header::before {
  content: "";
  position: absolute;
  bottom: -12px;
  width: 25px;
  height: 25px;
  background-color: var(--c-soft-blue);
  border-radius: 50%;
  z-index: 1;
}

.flight-table-header::after {
  left: -52px;
}

.flight-table-header::before {
  right: -52px;
}

.header-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.header-item .filter-icon {
  cursor: pointer;
}

/* Flight Row Styling */
.flight-row {
  display: grid;
  grid-template-columns: 1fr 120px 300px 120px 1fr 1fr 1fr 0.5fr;
  border-bottom: 3px dashed var(--c-soft-blue);
  padding: 16px 0;
  align-items: center;
  min-height: 80px;
  position: relative;
  transition: all 0.2s ease-in-out;
}

.flight-row::after,
.flight-row::before {
  content: "";
  position: absolute;
  bottom: -12px;
  width: 25px;
  height: 25px;
  background-color: var(--c-soft-blue);
  border-radius: 50%;
  z-index: 1;
  transition: background-color 0.3s ease;
}

.flight-row::after {
  left: -52px;
}

.flight-row::before {
  right: -52px;
}

.flight-row:last-child {
  border-bottom: none;
}

.flight-row:last-child::after,
.flight-row:last-child::before {
  display: none;
}

.flight-row:hover {
  background-color: #f9fafb;
}

/* Seat Cell Styling */
.seat-cell {
  display: flex;
  justify-content: center;
}

/* Flight Information Cell Styling */
.flight-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.flight-icon img {
  width: 32px;
  height: 32px;
}

.flight-code {
  font-size: 16px;
  font-weight: bold;
  color: var(--vt-c-navy-light);
}

.flight-time {
  font-weight: bold;
  color: var(--c-navy-light);
}

/* Flight Route Line Styling */
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
  top: 50%;
  transform: translateY(-50%);
  color: var(--c-soft-blue);
}

/* not pending  */
.line img.center {
  left: 50%;
  transform: translate(-50%, -50%);
}

/* pending */
.line img.animate {
  left: 0;
  animation: plane-move 4s infinite linear;
}

/* Animation */
@keyframes plane-move {
  0% {
    transform: translateY(-50%) translateX(0);
  }
  100% {
    transform: translateY(-50%) translateX(180px);
  }
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

/* Route Information Styling */
.flight-route {
  display: flex;
  justify-content: center;
}

.route-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.route-duration {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}

.route-line {
  display: flex;
  align-items: center;
  width: 60px;
  margin: 4px 0;
}

.route-line::before,
.route-line::after {
  content: "";
  flex-grow: 1;
  height: 1px;
  background-color: #cbd5e1;
}

.route-dot {
  width: 8px;
  height: 8px;
  background-color: #94a3b8;
  border-radius: 50%;
  margin: 0 4px;
}

.route-stops {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
}

/* Date and Aircraft Cells Styling */
.date-cell,
.aircraft-cell {
  color: #64748b;
  font-weight: 500;
  line-height: 1.4;
}

/* Status Badge Styling */
.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.status-pending {
  background-color: var(--c-light-orange);
  color: var(--c-orange);
}

.status-completed {
  background-color: var(--c-soft-blue);
  color: var(--c-navy-light);
}

.status-canceled {
  background-color: var(--c-dark-navy);
  color: var(--c-soft-blue);
}

.status-delayed {
  background-color: var(--c-soft-orange);
  color: var(--c-light-orange);
}

/* Action Button Styling */
.edit-button {
  background-color: transparent;
  color: #3e7ca3;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-button:hover {
  background-color: #3e7ca3;
  color: white;
}

/* Responsive Layout Adjustments */
@media (max-width: 992px) {
  .flight-table-header,
  .flight-row {
    grid-template-columns: 0.5fr 1fr 0.8fr 1fr 0.8fr 0.8fr 0.8fr 0.5fr;
  }
}

@media (max-width: 768px) {
  .flight-table-header {
    display: none; /* Hide headers on mobile */
  }

  .flight-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }
}
</style>
