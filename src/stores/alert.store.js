import { defineStore } from 'pinia';


export const useAlertStore = defineStore({
    id: 'alert',
    state: () => ({
        alert: null
    }),
    actions: {
        success(message) {
            this.alert = { message, type: 'alert-success' };
            setTimeout(()=>{this.alert = null},6000)
        },
        error(message) {
            this.alert = { message, type: 'alert-danger' };
            setTimeout(()=>{this.alert = null},6000)
        },
        clear() {
            this.alert = null;
        }
    },
});
