import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCalendarDays, faArrowRightLong, faChevronLeft, faChevronRight, faSquareCaretLeft, faCalendarCheck, faBuildingCircleCheck } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCalendarDays)
library.add(faArrowRightLong)
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faSquareCaretLeft)
library.add(faCalendarCheck)
library.add(faBuildingCircleCheck)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')

// createApp(App).use(router).mount('#app')
