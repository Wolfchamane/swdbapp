import '../../styles/main.sass';
import { createApp } from 'vue';
import AppWrapper from '@/components/app-wrapper.vue';

window.addEventListener('DOMContentLoaded', () => {
    const app = createApp(AppWrapper);

    app.mount('#app');
});
