import { createApp } from 'vue';
import { reactive } from 'vue';
import router from './router';
import App from './App.vue';
import Ripple from 'primevue/ripple';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import store from './store/index';

import Sidebar from 'primevue/sidebar';

import CodeHighlight from './AppCodeHighlight';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
import './assets/layout/layout.scss';
import './assets/layout/flags/flags.css';

router.beforeEach(function(to, from, next) {
    window.scrollTo(0, 0);
    next();
});

const app = createApp(App);

app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });
app.config.globalProperties.$primevue = reactive({ ripple: true });

app.use(ToastService);
app.use(router);
app.use(store);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('code', CodeHighlight);



app.component('Sidebar', Sidebar);
app.component('Toast', Toast);

app.mount('#app');

app.config.globalProperties.$filters = {
    formatCurrency(value) {
        return '$'+value.toFixed(2);
    }
}

app.config.globalProperties.$messages = {
    showSuccess(msg, self) {
        self.$toast.add({severity:'success', summary: 'Success', detail: msg, life: 3000});
    },

    showError(msg, self) {
        self.$toast.add({severity:'error', summary: 'Error', detail: msg, life: 3000});
    }
}