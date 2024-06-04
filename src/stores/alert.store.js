import { reactive } from "vue";

export const useAlertStore = reactive({
    alert: { message:'', type: 'alert-success' },
    isActive: false,
    success(message) {
        this.alert = { message, type: 'alert-success' };
        this.isActive = true;
        setTimeout(()=>{this.isActive = false},5000)
    },
    error(message) {
        this.alert = { message, type: 'alert-danger' };
        this.isActive = true;
        setTimeout(()=>{this.isActive = false},5000)
    },
    clear() {
        this.isActive = false;
    }
});
