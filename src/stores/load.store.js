import { reactive } from "vue";

export const useLoadStore = reactive({
  isLoading: false,
  async show() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 60000);
  },
 async close() {
    this.isLoading = false;
  },
});
