<template>
  <div class="content admin-page user-management">
    <div class="admin-header">
      <h2>All Users</h2>
      <div>
        <input
          type="text"
          v-model="search"
          class="search-box"
          placeholder="Search User"
        />
        <button class="add-btn" @click="showAddModal = true">+ Add</button>
      </div>
    </div>

    <div class="admin-table users">
      <div class="table-row table-head">
        <div>User ID</div>
        <div>Passport</div>
        <div>Username</div>
        <div>Status</div>
        <div>Name</div>
        <div>Email</div>
        <div>Actions</div>
      </div>
      <div
        class="table-row"
        v-for="user in sortedUsers"
        :key="user.id"
        :class="{ suspended: user.status === 'Suspended' }"
      >
        <div><span :class="{ strike: user.status === 'Suspended' }">{{ user.id }}</span></div>
        <div><span :class="{ strike: user.status === 'Suspended' }">{{ user.passport }}</span></div>
        <div><span :class="{ strike: user.status === 'Suspended' }">{{ user.username }}</span></div>
        <div>
          <span
            class="status suspended"
            v-if="user.status === 'Suspended'"
          >
            Suspended
          </span>
          <span class="status active" v-else>Active</span>
        </div>
        <div><span :class="{ strike: user.status === 'Suspended' }">{{ user.firstname }} {{ user.lastname }}</span></div>
        <div><span :class="{ strike: user.status === 'Suspended' }">{{ user.email }}</span></div>
        <div class="action-buttons">
          <router-link 
            :to="{ name: 'modify-user', params: { id: user.id } }"
            class="action-btn"
            title="Edit"
          >
            <font-awesome-icon icon="edit" />
          </router-link>
          
          <button 
            class="action-btn"
            @click="toggleSuspend(user)"
            :title="user.status === 'Suspended' ? 'Unsuspend' : 'Suspend'"
          >
            <font-awesome-icon :icon="user.status === 'Suspended' ? 'undo' : 'user-slash'" />
          </button>
          
          <button 
            class="action-btn"
            @click="deleteUser(user.id)"
            title="Delete"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div class="modal" v-if="showAddModal">
      <div class="modal-content user-form">
        <h3>Add User</h3>
        <div class="form-row">
          <input type="text" v-model="newUser.id" disabled placeholder="User ID" />
          <input type="email" v-model="newUser.email" placeholder="Email" />
          <input type="text" v-model="newUser.phone" placeholder="Phone" />
        </div>
        <div class="form-row">
          <input type="text" v-model="newUser.firstname" placeholder="First name" />
          <input type="text" v-model="newUser.middlename" placeholder="Middle name" />
          <input type="text" v-model="newUser.lastname" placeholder="Last name" />
        </div>
        <div class="form-row">
          <input type="text" v-model="newUser.username" placeholder="Username" />
          <input type="password" v-model="newUser.password" placeholder="Password" />
        </div>
        <div class="modal-actions">
          <button class="save-btn" @click="addUser">✔ Save</button>
          <button class="discard-btn" @click="showAddModal = false">✖ Discard</button>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div class="modal" v-if="showEditModal">
      <div class="modal-content user-form">
        <h3>Edit User</h3>
        <div class="form-row">
          <input type="text" v-model="editUser.firstname" />
          <input type="text" v-model="editUser.middlename" />
          <input type="text" v-model="editUser.lastname" />
        </div>
        <div class="form-row">
          <input type="email" v-model="editUser.email" />
          <input type="text" v-model="editUser.phone" />
          <input type="text" v-model="editUser.passport" />
        </div>
        <div class="form-row">
          <input type="text" v-model="editUser.username" />
          <input type="password" v-model="editUser.password" />
        </div>
        <div class="modal-actions">
          <button class="save-btn" @click="saveEdit">Save</button>
          <button class="discard-btn" @click="showEditModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

// State
const search = ref('');
const showAddModal = ref(false);
const showEditModal = ref(false);
const users = reactive([
  { id: 1, firstname: 'Alice', middlename: 'B.', lastname: 'Brown', email: 'alice@example.com', phone: '0812345678', passport: 'A12345678', username: 'alicebrown', password: 'secret123', status: 'Active' },
  { id: 2, firstname: 'Bob', middlename: '', lastname: 'Smith', email: 'bob@example.com', phone: '0823456789', passport: 'B98765432', username: 'bobsmith', password: 'password456', status: 'Inactive' }
]);

const newUser = reactive({ firstname: '', middlename: '', lastname: '', email: '', phone: '', passport: '', username: '', password: '', status: 'Active' });
let editUser = reactive(null);

// Computed
const filteredUsers = computed(() =>
  users.filter(u =>
    (`${u.firstname} ${u.lastname}`.toLowerCase().includes(search.value.toLowerCase()) ||
     u.email.toLowerCase().includes(search.value.toLowerCase()) ||
     u.username.toLowerCase().includes(search.value.toLowerCase()))
  )
);
const sortedUsers = computed(() => {
  const active = filteredUsers.value.filter(u => u.status !== 'Suspended');
  const suspended = filteredUsers.value.filter(u => u.status === 'Suspended');
  return [...active, ...suspended];
});

// Methods
function addUser() {
  if (!newUser.firstname || !newUser.email) return alert('Please fill required fields');
  users.push({ ...newUser, id: Date.now() });
  Object.assign(newUser, { firstname: '', middlename: '', lastname: '', email: '', phone: '', passport: '', username: '', password: '', status: 'Active' });
  showAddModal.value = false;
}
function openEditModal(user) {
  editUser = reactive({ ...user });
  showEditModal.value = true;
}
function saveEdit() {
  const idx = users.findIndex(u => u.id === editUser.id);
  if (idx !== -1) users.splice(idx, 1, editUser);
  showEditModal.value = false;
}
function toggleSuspend(user) {
  user.status = user.status === 'Suspended' ? 'Active' : 'Suspended';
}
function deleteUser(id) {
  if (confirm('Confirm delete?')) users.splice(users.findIndex(u => u.id === id), 1);
}
</script>

<style scoped>
/* Extracted from layout.css for user-management */
.content.admin-page.user-management {
  padding: 40px;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.search-box {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  width: 200px;
  margin-right: 10px;
}
.add-btn {
  padding: 8px 16px;
  background-color: #1d3a4c;
  color: white;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
}
.admin-table.users {
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  padding: 0;
  overflow: hidden;
}
.table-row {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 1.2fr 1fr 1.5fr 2fr 1fr;
  padding: 10px 20px;
  align-items: center;
  border-bottom: 1px dashed #ccc;
}
.table-head {
  font-weight: bold;
  background-color: #f5f5f5;
}
.strike {
  text-decoration: line-through;
  opacity: 0.6;
}
.status.active {
  background-color: #3f8efc;
  color: white;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 12px;
}
.status.suspended {
  background-color: #c0c0c0;
  color: white;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 12px;
}
.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}
.action-buttons i {
  cursor: pointer;
  font-size: 16px;
}
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
  
  .modal-content input,
  .modal-content select {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
.modal-content.user-form {
  width: 600px;
  background: white;
  border-radius: 12px;
  padding: 30px 40px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  font-family: "Inter", sans-serif;
}

.modal-content.user-form h3 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.form-row input {
  flex: 1;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
/* Save / Discard button look */
.save-btn,
.discard-btn {
padding: 10px 25px;
font-size: 14px;
border: none;
border-radius: 6px;
font-weight: bold;
cursor: pointer;
}

.save-btn {
background-color: #f6b52e;
color: white;
}

.discard-btn {
background-color: #1d3a4c;
color: white;
}
.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #1d3a4c;
  font-size: 16px;
  padding: 5px 8px;
  border-radius: 4px;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}

.action-btn:hover {
  color: #f6b52e;
  background: rgba(0,0,0,0.05);
}

/* Make router-link look like a button */
.action-buttons a {
  text-decoration: none;
}
</style>
