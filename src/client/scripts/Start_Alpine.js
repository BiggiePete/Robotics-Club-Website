import Alpine from 'alpinejs';
import persist from '@alpinejs/persist'
window.Alpine = Alpine;
queueMicrotask(() => {
    Alpine.plugin(persist);
    Alpine.start();
});