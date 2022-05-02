import Alpine from 'alpinejs';
import persist from '@alpinejs/persist'
import collapse from '@alpinejs/collapse'
window.Alpine = Alpine;
queueMicrotask(() => {
    Alpine.plugin(persist);
    Alpine.plugin(collapse);
    Alpine.start();
});