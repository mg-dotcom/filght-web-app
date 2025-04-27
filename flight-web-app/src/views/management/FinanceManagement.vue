<template>
  <div class="finance-management main-content">
    <!-- Page Header -->
    <header class="page-header">
      <div>
        <h2>Payment</h2>
        <p>Overview of Recent Payment</p>
      </div>
      <div class="controls">
        <input
          type="text"
          placeholder="🔍 Search User"
          class="search-box"
          v-model="searchQuery"
        />
        <select class="status-filter" v-model="statusFilter">
          <option value="">Select Status</option>
          <option>Pending</option>
          <option>Success</option>
          <option>Failed</option>
        </select>
        <button class="add-btn" @click="openModal()">+ Add</button>
      </div>
    </header>

    <!-- Payment Table -->
    <section class="payment-table">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Reservation ID</th>
            <th>Route</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in filteredPayments" :key="payment.id">
            <td>{{ payment.username }}<br /><span class="small-id">#{{ payment.userId }}</span></td>
            <td>{{ payment.reservationId }}</td>
            <td>{{ payment.route }}</td>
            <td>{{ payment.date }}</td>
            <td>{{ payment.amount }}</td>
            <td>
              <span :class="['status', payment.status.toLowerCase()]">{{ payment.status }}</span>
            </td>
            <td>
              <button class="edit-btn" @click="openModal(payment)">✏️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Modal -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <h3>{{ form.id ? 'Edit Payment' : 'Add Payment' }}</h3>
        <div class="modal-grid">
          <label>
            Payment ID
            <input type="text" v-model="form.id" disabled />
          </label>
          <label>
            Reservation ID
            <select v-model="form.reservationId">
              <option disabled value="">Select</option>
              <option v-for="r in reservations" :key="r.id" :value="r.id">{{ r.id }} – {{ r.route }}</option>
            </select>
          </label>
          <label>
            User ID
            <select v-model="form.userId">
              <option disabled value="">Select</option>
              <option v-for="u in users" :key="u.id" :value="u.id">{{ u.username }} (#{{ u.id }})</option>
            </select>
          </label>
          <label>
            Payment Date
            <input type="date" v-model="form.date" />
          </label>
          <label>
            Amount
            <input type="number" v-model="form.amount" />
          </label>
          <label>
            Status
            <select v-model="form.status">
              <option>Pending</option>
              <option>Success</option>
              <option>Failed</option>
            </select>
          </label>
          <label>
            Method
            <select v-model="form.method">
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
            </select>
          </label>
        </div>
        <div class="modal-actions">
          <button class="save-btn" @click="savePayment">Save ✔</button>
          <button class="discard-btn" @click="closeModal">Discard ✖</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const name  = localStorage.getItem('adminName')  || 'Admin';
const email = localStorage.getItem('adminEmail') || 'admin@example.com';
const role  = localStorage.getItem('adminRole')  || 'Super Admin';

const searchQuery = ref('');
const statusFilter = ref('');
const showModal = ref(false);

const form = reactive({
  id: '',
  reservationId: '',
  userId: '',
  date: '',
  amount: null,
  status: 'Pending',
  method: 'Credit Card'
});

const payments = reactive([
  { id: 'PMT-001', reservationId: 'RSV-2023101', userId: 'USR001', username: 'inwza241', route: 'BKK → JKT', date: '2024-04-01', amount: 5600, status: 'Pending' },
  { id: 'PMT-002', reservationId: 'RSV-2023102', userId: 'USR002', username: 'jaturon93', route: 'DMK → CNX', date: '2024-04-04', amount: 3200, status: 'Success' }
]);
const reservations = ref([
  { id: 'RSV-2023101', route: 'BKK → JKT' },
  { id: 'RSV-2023102', route: 'DMK → CNX' }
]);
const users = ref([
  { id: 'USR001', username: 'inwza241' },
  { id: 'USR002', username: 'jaturon93' }
]);

const filteredPayments = computed(() => {
  return payments.filter(p => {
    const matchSearch = !searchQuery.value || p.username.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchStatus = !statusFilter.value || p.status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

function openModal(payment = null) {
  if (payment) {
    Object.assign(form, payment);
  } else {
    Object.assign(form, { id: `PMT-${Date.now()}`, reservationId: '', userId: '', date: '', amount: null, status: 'Pending', method: 'Credit Card' });
  }
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function savePayment() {
  const idx = payments.findIndex(p => p.id === form.id);
  const user = users.value.find(u => u.id === form.userId);
  const reservation = reservations.value.find(r => r.id === form.reservationId);
  const entry = { ...form, username: user?.username || '', route: reservation?.route || '' };
  if (idx >= 0) payments.splice(idx, 1, entry);
  else payments.push(entry);
  closeModal();
}
</script>

<style scoped>
/* ── Layout for the FinanceManagement view ── */

/* Main content container */
.main-content {
padding: 30px;
flex: 1;
} 

/* Page header */
.page-header {
display: flex;
justify-content: space-between;
align-items: flex-end;
margin-bottom: 25px;
}
.page-header h2 {
font-size: 22px;
color: #1d3a4c;
}
.page-header p {
font-size: 14px;
color: #777;
margin-top: 4px;
}

/* Controls row */
.controls {
display: flex;
gap: 10px;
}
/* Search input */
.search-box {
padding: 8px 16px;
border: none;
border-radius: 20px;
font-size: 1rem;
width: 200px;
margin-right: 10px;
}
/* Status filter dropdown */
.status-filter {
padding: 8px 12px;
border-radius: 6px;
border: 1px solid #ccc;
background: white;
}
/* “+ Add” button */
.add-btn {
background-color: #f6b52e;
color: white;
padding: 8px 20px;
font-weight: bold;
border-radius: 6px;
border: none;
cursor: pointer;
} 

/* Payment table */
.payment-table table {
width: 100%;
border-collapse: collapse;
background-color: white;
border-radius: 12px;
overflow: hidden;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}
.payment-table th,
.payment-table td {
padding: 14px 16px;
text-align: left;
font-size: 14px;
border-bottom: 1px solid #eee;
}
.payment-table th {
background-color: #f5f5f5;
font-weight: bold;
} 

/* Small ID under username */
.small-id {
font-size: 12px;
color: #888;
} 

/* Status badges */
.status {
padding: 4px 12px;
border-radius: 15px;
font-size: 12px;
font-weight: 600;
color: white;
}
.status.pending { background-color: #f6b52e; }
.status.success { background-color: #34c38f; }
.status.failed  { background-color: #e74c3c; } 

/* Edit button in table */
.edit-btn {
background: none;
border: none;
font-size: 16px;
cursor: pointer;
} 

/* Modal overlay & box */
.modal {
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background: rgba(0, 0, 0, 0.3);
display: flex;
justify-content: center;
align-items: center;
}
.modal-content {
background: white;
padding: 30px;
border-radius: 15px;
width: 350px;
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
/* Inputs inside modal */
.modal-content input,
.modal-content select {
width: 100%;
padding: 10px;
margin: 10px 0;
border-radius: 8px;
border: 1px solid #ccc;
}
/* Modal action buttons */
.modal-actions {
text-align: right;
display: flex;
gap: 10px;
justify-content: flex-end;
}
.save-btn {
background-color: #ffc107;
color: white;
border: none;
padding: 8px 16px;
border-radius: 8px;
cursor: pointer;
}
.discard-btn {
background-color: #1d3a4c;
color: white;
border: none;
padding: 8px 16px;
border-radius: 8px;
cursor: pointer;
} 

</style>
