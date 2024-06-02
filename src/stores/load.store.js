import { defineStore } from 'pinia';


export const useLoadStore = defineStore({
    id: 'loading',
    state: () => ({
        isLoading: false
    }),
    actions: {
        show() {
            this.isLoading = true
            setTimeout(()=>{this.isLoading = false},60000)
        },
        close() {
            this.isLoading = false
        }
    },
});
