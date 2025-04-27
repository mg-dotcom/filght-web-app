import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Font Awesome Setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faArrowLeft, 
  faCheck,
  faUser,
  faLock,
  faUserTag,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faFlag,
  faCalendarAlt,
  faEdit,
  faUndo,
  faUserSlash,
  faTrash,
  faPlus,
  faTimes,
  faRefresh
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to library
library.add(
  faArrowLeft, 
  faCheck,
  faUser,
  faLock,
  faUserTag,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faFlag,
  faCalendarAlt,
  faRefresh,
  faEdit,
  faUndo,
  faUserSlash,
  faTrash,
  faPlus,
  faTimes
)

const app = createApp(App)

// Register component
app.component('font-awesome-icon', FontAwesomeIcon) // Note lowercase for consistency

app.use(createPinia())
app.use(router)

app.mount('#app')