<script setup>
import { ref } from "vue";
import {
  seatData,
  getUniqueRows,
  formatSeatId,
  getSeatStatus,
  getSeatInfo,
  isSeatAvailable,
} from "@/data/management-seat.js";

const isStatusDropdownOpen = ref(false);
const statusOptions = ref([
  { id: 1, name: "Available" },
  { id: 2, name: "Not Available" },
]);

const toggleStatusDropdown = () => {
  isStatusDropdownOpen.value = !isStatusDropdownOpen.value;
  console.log(statusOptions.value);
};
</script>

<template>
  <div class="management-seat">
    <!-- มุมปะฝั่งซ้าย -->
    <div class="notches left-notches">
      <div class="notch" v-for="index in 7" :key="`left-${index}`"></div>
    </div>

    <!-- Main content  -->
    <div class="content-container">
      <div class="management-seat-header">
        <div class="flight-info">
          <button class="back-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.7672 7.5431C11.0672 7.25744 11.0788 6.78271 10.7931 6.48276C10.5074 6.18281 10.0327 6.17123 9.73276 6.4569L10.7672 7.5431ZM4.48276 11.4569C4.18281 11.7426 4.17123 12.2173 4.4569 12.5172C4.74256 12.8172 5.21729 12.8288 5.51724 12.5431L4.48276 11.4569ZM5.51724 11.4569C5.21729 11.1712 4.74256 11.1828 4.4569 11.4828C4.17123 11.7827 4.18281 12.2574 4.48276 12.5431L5.51724 11.4569ZM9.73276 17.5431C10.0327 17.8288 10.5074 17.8172 10.7931 17.5172C11.0788 17.2173 11.0672 16.7426 10.7672 16.4569L9.73276 17.5431ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12.75ZM9.73276 6.4569L4.48276 11.4569L5.51724 12.5431L10.7672 7.5431L9.73276 6.4569ZM4.48276 12.5431L9.73276 17.5431L10.7672 16.4569L5.51724 11.4569L4.48276 12.5431ZM5 12.75H19V11.25H5V12.75Z"
              />
            </svg>
          </button>

          <div class="flight-details">
            <div class="date">
              <p>Mar 09,</p>
              <p>2025</p>
            </div>
            <div class="route">
              <div class="departure">
                <div class="departure-icon">
                  <img src="/dashboard-pic/plane-booking-up.png" alt="" />
                </div>
                <div class="departure-details">
                  <span class="airport-code">BKK</span>
                  <span class="time">18:00</span>
                </div>
              </div>

              <div class="route-arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.2328 16.4569C12.9328 16.7426 12.9212 17.2173 13.2069 17.5172C13.4926 17.8172 13.9673 17.8288 14.2672 17.5431L13.2328 16.4569ZM19.5172 12.5431C19.8172 12.2574 19.8288 11.7827 19.5431 11.4828C19.2574 11.1828 18.7827 11.1712 18.4828 11.4569L19.5172 12.5431ZM18.4828 12.5431C18.7827 12.8288 19.2574 12.8172 19.5431 12.5172C19.8288 12.2173 19.8172 11.7426 19.5172 11.4569L18.4828 12.5431ZM14.2672 6.4569C13.9673 6.17123 13.4926 6.18281 13.2069 6.48276C12.9212 6.78271 12.9328 7.25744 13.2328 7.5431L14.2672 6.4569ZM19 12.75C19.4142 12.75 19.75 12.4142 19.75 12C19.75 11.5858 19.4142 11.25 19 11.25V12.75ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75V11.25ZM14.2672 17.5431L19.5172 12.5431L18.4828 11.4569L13.2328 16.4569L14.2672 17.5431ZM19.5172 11.4569L14.2672 6.4569L13.2328 7.5431L18.4828 12.5431L19.5172 11.4569ZM19 11.25L5 11.25V12.75L19 12.75V11.25Z"
                    fill="#7F7F7F"
                  />
                </svg>
              </div>

              <div class="arrival">
                <div class="departure-icon">
                  <img src="/dashboard-pic/plane-booking-down.png" alt="" />
                </div>
                <div class="arrival-details">
                  <span class="airport-code">CNX</span>
                  <span class="time">18:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="controls">
          <div class="search-container">
            <div class="search-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.80524 15.7137C5.9404 14.8306 5.35381 13.7131 5.11824 12.4997C4.88072 11.2829 5.00269 10.0233 5.46924 8.87469C5.93181 7.73253 6.72153 6.75251 7.73924 6.05769C9.80409 4.64744 12.5224 4.64744 14.5872 6.05769C15.605 6.75251 16.3947 7.73253 16.8572 8.87469C17.3238 10.0233 17.4458 11.2829 17.2082 12.4997C16.9727 13.7131 16.3861 14.8306 15.5212 15.7137C14.3759 16.889 12.8044 17.5519 11.1632 17.5519C9.52213 17.5519 7.95059 16.889 6.80524 15.7137V15.7137Z"
                  stroke="#397499"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.1702 7.20292C10.7583 7.24656 10.4598 7.61586 10.5034 8.02777C10.5471 8.43968 10.9164 8.73821 11.3283 8.69457L11.1702 7.20292ZM13.0216 9.69213C13.1831 10.0736 13.6232 10.2519 14.0047 10.0904C14.3861 9.92892 14.5644 9.4888 14.4029 9.10736L13.0216 9.69213ZM16.1421 15.0869C15.849 14.7943 15.3741 14.7947 15.0815 15.0879C14.7888 15.381 14.7893 15.8559 15.0824 16.1485L16.1421 15.0869ZM18.4704 19.5305C18.7636 19.8232 19.2384 19.8228 19.5311 19.5296C19.8237 19.2364 19.8233 18.7616 19.5301 18.4689L18.4704 19.5305ZM11.3283 8.69457C12.0508 8.61801 12.7384 9.02306 13.0216 9.69213L14.4029 9.10736C13.8622 7.83005 12.5496 7.05676 11.1702 7.20292L11.3283 8.69457ZM15.0824 16.1485L18.4704 19.5305L19.5301 18.4689L16.1421 15.0869L15.0824 16.1485Z"
                  fill="#397499"
                />
              </svg>
            </div>
            <input type="text" placeholder="Search Seat" class="search-input" />
          </div>

          <div class="status-selector">
            <button class="status-button" @click="toggleStatusDropdown">
              Select Status
              <span
                class="dropdown-icon"
                :class="{ open: isStatusDropdownOpen }"
              ></span>
            </button>

            <div class="status-dropdown" v-if="isStatusDropdownOpen">
              <div class="status-option available">
                <span>Available</span>
              </div>
              <div class="status-option not-available">
                <span>Not Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="management-seat-container">
        <div class="select-seat">
          <div class="select-seat-header">Select Your Seat</div>
          <div class="select-seat-content">
            <p>Show Passenger's Check-In Status</p>
          </div>
        </div>
        <div class="type-seat">
          <div class="type reserve-seat">
            <img
              src="/management-pic/management-seat/reserve-seat-type.png"
              alt=""
            />
            <p>
              Reserved<br />
              Seat
            </p>
          </div>
          <div class="type reserve-seat">
            <img
              src="/management-pic/management-seat/passenger-seat-type.png"
              alt=""
            />
            <p>
              Passenger<br />
              Seat
            </p>
          </div>
          <div class="type reserve-seat">
            <img
              src="/management-pic/management-seat/unreserve-seat-type.png"
              alt=""
            />
            <p>Unreserved <br />Seat</p>
          </div>
        </div>
      </div>

      <div class="seat-view-container">
        <div class="seat-view">
          <div class="seat-class-types">
            <div
              v-for="classType in seatData.classTypes"
              :key="classType.id"
              :class="['class-type-btn', { active: classType.active }]"
            >
              {{ classType.name }}
            </div>
          </div>

          <div class="seat-grid">
            <div class="seat-columns">
              <div
                class="column-header"
                v-for="col in [
                  'A',
                  'B',
                  'C',
                  '',
                  'D',
                  'E',
                  'F',
                  '',
                  'G',
                  'H',
                  'I',
                ]"
                :key="'header-' + col"
                :class="{ spacer: col === '' }"
              >
                {{ col }}
              </div>
            </div>

            <div
              class="seat-row"
              v-for="rowNum in getUniqueRows()"
              :key="rowNum"
            >
              <div class="row-header">{{ rowNum }}</div>

              <div class="seat-grid-row">
                <div
                  v-for="col in [
                    'A',
                    'B',
                    'C',
                    '',
                    'D',
                    'E',
                    'F',
                    '',
                    'G',
                    'H',
                    'I',
                  ]"
                  :key="`${rowNum}-${col || 'spacer'}`"
                  class="seat-container"
                >
                  <div
                    v-if="col !== ''"
                    class="seat"
                    :class="getSeatStatus(formatSeatId(rowNum, col))"
                    :title="getSeatInfo(formatSeatId(rowNum, col))"
                  >
                    <div class="seat-icon">
                      <img
                        v-if="isSeatAvailable(formatSeatId(rowNum, col))"
                        src="/management-pic/management-seat/unreserve-seat-type.png"
                        alt="Unreserved Seat"
                      />
                      <img
                        v-else
                        src="/management-pic/management-seat/reserve-seat-type.png"
                        alt="Reserved Seat"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row-header">{{ rowNum }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- มุมปะฝั่งขวา -->
    <div class="notches right-notches">
      <div class="notch" v-for="index in 7" :key="`right-${index}`"></div>
    </div>
  </div>
</template>

<style scoped>
.management-seat {
  margin: 20px;
  padding: 20px;
  background-color: var(--vt-c-white, #ffffff);
  border-radius: 10px;
  position: relative;
  display: flex;
  box-sizing: border-box;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.management-seat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

/* ส่วนของ flight info  */
.flight-info {
  display: flex;
  align-items: center;
}

.back-button {
  border: 1px solid var(--c-navy-light);
  padding: 6px 25px;
  border-radius: 10px;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 17px;
  color: var(--c-navy-light);
}

.back-button:hover {
  background-color: var(--c-navy-light);
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-button:active {
  background-color: var(--c-navy-light);
  color: white;
  transform: scale(0.96);
  transition: transform 0.1s ease;
}

/* ส่วนของ flight details  */
.flight-details {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.date {
  font-size: 14px;
  color: var(--vt-c-gray);
  margin-bottom: 4px;
  line-height: 1.2;
}

.route {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--vt-c-gray);
  margin-bottom: 4px;
  line-height: 1.2;
}

.airport-code {
  font-size: 16px;
  font-weight: bold;
  color: var(--vt-c-navy-light);
}

.time {
  font-weight: bold;
  color: var(--c-navy-light);
}

.departure,
.arrival {
  display: flex;
  gap: 10px;
  align-items: center;
}

.departure-details,
.arrival-details {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  gap: 2px;
}
.departure-icon img,
.arrival-icon img {
  width: 24px;
  height: 24px;
}

.route-arrow {
  margin: 0 10px;
  color: #666;
}

/* ส่วนของ search  */
.controls {
  display: flex;
  gap: 15px;
}

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
  padding: 10px 10px 10px 35px;
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
  box-shadow: 0 0 5px var(--c-navy);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus::placeholder {
  color: var(--c-navy);
  opacity: 0.7;
}

/* ส่วนของ status selector */
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
  transition: background-color 0.3s ease, color 0.3s ease;
}

.status-button:hover {
  background-color: var(--c-navy-light);
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.status-button:active {
  background-color: var(--c-navy-light);
  color: white;
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

.dropdown-icon {
  margin-left: 8px;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor; /* currentColor makes it white on hover */
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.dropdown-icon.open {
  transform: rotate(-135deg);
}
.status-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  border: 1px solid var(--c-navy-light);
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: center;
  z-index: 10;
  overflow: hidden;
}

.status-option {
  padding: 7px 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--c-navy-light);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-bottom: 1px solid var(--c-navy-light);
}

.status-option:hover {
  background-color: #f5f3f3;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.status-option span {
  font-size: 0.7rem;
  font-weight: 500;
}

.status-option:last-child {
  border-bottom: none;
}

.status-option.available span {
  background-color: var(--c-dark-navy, #e0e8f0);
  color: var(--c-soft-blue, #2d4b6d);
  padding: 4px 25px;
  border-radius: 15px;
}

.status-option.not-available span {
  background-color: var(--c-soft-blue, #e0e8f0);
  color: var(--c-navy, #2d4b6d);
  padding: 4px 25px;
  border-radius: 15px;
}

/* ส่วนของ management seat content */
.management-seat-container {
  grid-template-columns: 1fr 1.5fr;
  display: grid;
  gap: 20px;
  padding: 10px 15px;
}

/* ส่วนของ select seat */
.select-seat {
  border: 1px solid #3e7ca3;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.select-seat-header {
  background-color: var(--c-primary, #3e7ca3);
  color: var(--c-white, #ffffff);
  font-weight: 500;
  padding: 10px;
  text-align: center;
}

.select-seat-content {
  background-color: var(--c-white, #ffffff);
  font-size: 14px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-seat-content p {
  color: #5a6872;
  text-align: center;
  font-weight: 400;
  margin: 0;
}

/* ส่วนของ type seat */
.type-seat {
  display: flex;
  padding: 12px;
  justify-content: space-around;
  border: 1px solid var(--c-navy-light);
  border-radius: 10px;
}

.type {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 5px;
}

.type p {
  font-size: 14px;
  color: var(--vt-c-gray);
  line-height: 1.2;
}

/* ส่วนของ seat view type */
.seat-view-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 15px;
}

.seat-view {
  border: 1px solid var(--c-navy-light);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.seat-class-types {
  display: flex;
  justify-content: center;
  gap: 45px;
  align-items: center;
  width: 100%;
  padding: 10px;
  font-weight: 500;
}

.seat-class-types div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 25px;
  gap: 5px;
  border-radius: 50px;
  border: 1px solid var(--c-navy-light);
  font-size: 14px;
}

.seat-class-types div:hover {
  background-color: var(--c-navy-light);
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

.seat-class-types div.active {
  background-color: var(--c-navy-light);
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

/* ส่วนของ seat view */

/* ==== Seat Grid Layout ==== */
.seat-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

/* ==== Column Headers ==== */
.seat-columns {
  display: grid;
  margin-top: 15px;
  grid-template-columns: repeat(11, 50px); /* 9 ที่นั่ง + 2 ช่องว่าง */
  justify-content: center;
  margin-bottom: 24px;
  gap: 8px;
}

.column-header {
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  color: var(--c-navy-light);
}

.column-header.spacer {
  visibility: hidden;
  pointer-events: none;
}

/* ==== Seat Styling ==== */
.seat {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.seat:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
/* ==== Seat Row ==== */
.seat-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  gap: 12px;
}

.row-header {
  width: 32px;
  font-weight: 500;
  text-align: center;
  color: var(--c-navy-light);
}

.seat-grid-row {
  display: grid;
  grid-template-columns: repeat(11, 50px); /* 9 ที่นั่ง + 2 ช่องว่าง */
  gap: 8px;
  justify-content: center;
}

.seat-container {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .seat {
    width: 56px;
    height: 56px;
  }

  .row-header {
    width: 32px;
    font-size: 14px;
  }

  .column-header {
    font-size: 14px;
  }
}

/* ส่วนของมุมปะ พื้นหลังสีขวา */
.notches {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.left-notches {
  left: 0;
}

.right-notches {
  right: 0;
}

.notch {
  width: 20px;
  height: 20px;
  background-color: var(--c-soft-blue, #e0e8f0);
  border-radius: 50%;
}

.left-notches .notch {
  transform: translateX(-50%);
}

.right-notches .notch {
  transform: translateX(50%);
}
</style>
