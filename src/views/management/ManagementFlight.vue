<script setup>
import ManagementOverview from "@/components/ManagementOverview.vue";
import FlightPagination from "@/components/management-flight/FlightPagination.vue";
import ModalAddFlight from "@/components/management-flight/ModalAddFlight.vue";
import { formatDate, mapFlightStatus } from "@/utils/flightUtils";
import { ref, onMounted, watch } from "vue";
import { useFlightStore } from "@/stores/flightStore";
import { useAircraftStore } from "@/stores/aircraftStore";
import { useRouter, useRoute } from "vue-router";
import Dropdown from "@/components/Dropdown.vue";
import ModalAircraft from "@/components/management-flight/ModalAircraft.vue";
import {
  getAircraftModelPart,
  getAircraftStatusClass,
} from "@/utils/flightUtils";

const tableHeaders = [
  { label: "SeatAvailable" },
  { label: "Departure" },
  { label: "" },
  { label: "Destination" },
  { label: "Date" },
  { label: "Aircraft" },
  { label: "Status" },
  { label: "Action" },
];

const statusOptions = [
  { label: "All", value: "all", class: "all" },
  { label: "Canceled", value: "canceled", class: "canceled" },
  {
    label: "Completed",
    value: "completed",
    class: "completed",
  },
  { label: "Pending", value: "pending", class: "pending" },
  { label: "Delayed", value: "delayed", class: "delayed" },
];

const route = useRoute();
const flightStore = useFlightStore();
const aircraftStore = useAircraftStore();
const router = useRouter();
const showModal = ref(false);
const showAircraft = ref(false);
const status = ref("");
const formMode = ref("");
const selectedAircraftID = ref("");
const airlineID = route.params.airlineID;

onMounted(() => {
  flightStore.loadFlights();
  aircraftStore.loadAircrafts();
  // reset ค่า query เเละ status ของ flightStore
  flightStore.setSelectedStatus(null);
  flightStore.setSearchQuery("");
});

// ส่วนของ pageination เเละ sort data
const paginatedFlights = ref([]);

// เป็นการส่งค่าจาก child component ไปยัง parent component
// เพื่อให้ parent component สามารถอัพเดทข้อมูลได้ จากการกดเปลี่ยนหน้าเเต่ละครั้ง ข้อมูลจะถูกส่งไปที่ parent component
// ex. กด next page จะส่งข้อมูลเที่ยวบินที่อยู่ในหน้าที่ 2 ไปที่ parent component
const updatePaginatedFlights = (flights) => {
  paginatedFlights.value = flights;
};

const addFlight = (newFlight) => {
  flightStore.addFlight(newFlight);
  showModal.value = false;
};

const showModalAddFlight = () => {
  showModal.value = true;
  formMode.value = "add";
};

const showModalInfoAircraft = (aircraftID) => {
  selectedAircraftID.value = aircraftID;
  showAircraft.value = true;
};

const handleSearch = (event) => {
  flightStore.setSearchQuery(event.target.value);
};

watch(status, (newStatus) => {
  flightStore.setSelectedStatus(newStatus);
});
</script>

<template>
  <ManagementOverview :showModal="showModal">
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
            <img src="/search-input.svg" alt="Search Input Icon" />
          </div>
          <input
            type="text"
            placeholder="Search Flight"
            class="search-input"
            @input="handleSearch"
          />
        </div>
        <Dropdown v-model="status" :statusOptions="statusOptions">
          <template #trigger="{ selected }">
            <span
              :class="['badge', selected?.class?.toLowerCase()]"
              v-if="selected"
            >
              {{ selected.label }}
            </span>
            <span v-else>Select Status</span>
          </template>
        </Dropdown>
        <div class="status-selector">
          <button class="status-button" @click="showModalAddFlight">
            Add +
          </button>
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
              header.label === 'SeatAvailable'
                ? 'display: flex; justify-content: center;'
                : ''
            "
          >
            {{ header.label }}
          </div>
        </div>

        <div
          class="flight-row"
          v-for="(flight, index) in paginatedFlights"
          :key="index"
        >
          <div
            class="flight-cell seat-cell"
            @click="
              router.push({
                name: 'management-seat',
                params: {
                  airlineID: airlineID,
                  flightID: flight.flightID,
                },
              })
            "
          >
            <div class="seat-icon">
              <img
                v-if="flight.isSeatAvailable === true"
                src="/management-pic/management-flight/available-seat.png"
                alt="Available Seat"
              />
              <img
                v-else
                src="/management-pic/management-flight/not-available-seat.png"
                alt="Not available Seat"
              />
            </div>
          </div>

          <div
            class="flight-cell departure-cell"
            @click="
              router.push({
                name: 'PassengerManagement',
                params: {
                  airlineID: airlineID,
                  flightID: flight.flightID,
                },
              })
            "
          >
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

          <div
            class="flight-cell route-cell"
            @click="
              router.push({
                name: 'PassengerManagement',
                params: {
                  airlineID: airlineID,
                  flightID: flight.flightID,
                },
              })
            "
          >
            <div class="flight-line">
              <p>{{ flight.duration.time }} hrs</p>
              <div class="line">
                <img
                  src="/dashboard-pic/icons/plane-icon.png"
                  :class="{
                    animate: flight.flightStatus === 'pending',
                    center: flight.flightStatus !== 'pending',
                  }"
                  alt="Plane Icon"
                />
              </div>
              <p>{{ flight.duration.stop }} stop</p>
            </div>
          </div>

          <div
            class="flight-cell destination-cell"
            @click="
              router.push({
                name: 'PassengerManagement',
                params: {
                  flightID: flight.flightID,
                  airlineID: airlineID,
                },
              })
            "
          >
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
            {{ formatDate(flight.departure.date) }}
          </div>

          <div
            class="flight-cell aircraft-cell"
            @click="showModalInfoAircraft(flight.aircraftID)"
          >
            <p :class="getAircraftStatusClass(flight.aircraftID)">
              {{ getAircraftModelPart(flight.aircraftID, 0) }}<br />
              {{ getAircraftModelPart(flight.aircraftID, 1) }}
            </p>
          </div>

          <div class="flight-cell status-cell">
            <span
              class="status-badge"
              :class="{
                'status-completed': flight.flightStatus === 'completed',
                'status-canceled': flight.flightStatus === 'canceled',
                'status-pending': flight.flightStatus === 'pending',
                'status-delayed': flight.flightStatus === 'delayed',
              }"
            >
              {{ mapFlightStatus(flight.flightStatus) }}
            </span>
          </div>

          <div class="flight-cell action-cell">
            <button
              class="edit-button"
              @click="
                router.push({
                  name: 'management-passenger',
                  params: { flightID: flight.flightID },
                })
              "
            >
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
  <ModalAircraft
    :showAircraft="showAircraft"
    :aircraftID="selectedAircraftID"
    @close="showAircraft = false"
  ></ModalAircraft>

  <ModalAddFlight
    :showModal="showModal"
    @close="showModal = false"
    @addFlight="addFlight"
  ></ModalAddFlight>
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
  cursor: pointer;
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

.aircraft-cell {
  cursor: pointer;
}

.status-AC-not-available {
  color: var(--c-soft-blue);
}

.status-AC-not-available:hover {
  color: var(--c-soft-blue);
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.status-AC-available {
  color: var(--vt-c-gray-5);
}

.status-AC-available:hover {
  color: var(--vt-c-gray-5);
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.aircraft-cell:hover {
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.date-cell,
.aircraft-cell {
  color: var(--vt-c-gray-5);
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

.clickable-cell {
  cursor: pointer;
}
.clickable-cell:hover {
  background-color: #f9fafb; /* match your row-hover color */
}

.flight-cell {
  cursor: default;
}

.flight-cell.departure-cell,
.flight-cell.route-cell,
.flight-cell.destination-cell {
  cursor: pointer;
}

.flight-cell.departure-cell:hover,
.flight-cell.route-cell:hover,
.flight-cell.destination-cell:hover {
  background-color: #f9fafb;
}

@media (max-width: 992px) {
  .flight-table-header,
  .flight-row {
    grid-template-columns: 0.5fr 1fr 0.8fr 1fr 0.8fr 0.8fr 0.8fr 0.5fr;
  }
}

@media (max-width: 768px) {
  .flight-table-header {
    display: none;
  }

  .flight-row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }
}
</style>
