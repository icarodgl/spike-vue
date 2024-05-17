import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore } from "@/stores";


const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const usersStore = defineStore({
  id: "users",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    users: [],
    favoritos: [],
    user: {},
    isLoading:false
  }),
  actions: {
    async register(user) {
      await fetchWrapper.post(`${baseUrl}/salvar`, user);
    },
    getLocalById(id){
      this.user = this.users
    },
    async getAll() {
      this.isLoading = true
      const authStore = useAuthStore();
      const alertStore = useAlertStore();
      try {
        this.users = await fetchWrapper.get(
          `${baseUrl}contato/listar/${authStore.user.id}`
        );
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false
    },
    async getfavoritos() {
      this.isLoading = true
      const alertStore = useAlertStore();
      try {
        this.favoritos = await fetchWrapper.get(`${baseUrl}favorito/pesquisar`);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(this.error);
      }
      this.isLoading = false
    },
    async favoritar(user) {
      this.isLoading = true
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.post(`${baseUrl}favorito/salvar`, user);
        await fetchWrapper.delete(`${baseUrl}contato/remover/${user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false
    },
    async desfavoritar(user) {
      this.isLoading = true
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.post(`${baseUrl}contato/salvar`, user);
        await fetchWrapper.delete(`${baseUrl}favorito/remover/${user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false
    },
    async addContato(user) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.post(`${baseUrl}contato/salvar`, user);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
    },
    async removeContato(user) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.delete(`${baseUrl}contato/remover/${user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(this.error);
      }
    },
    async getById(id) {
      const alertStore = useAlertStore();
      try {
        const authStore = useAuthStore();
        const users = await fetchWrapper.get(
          `${baseUrl}contato/listar/${authStore.user.id}`
        );
        this.user = users.find(u => u.id === id)
        console.log("uses",this.users);
        //this.user = await fetchWrapper.get(`${baseUrl}pessoa/buscar/${id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        console.log(error);
        alertStore.error(this.error);
      }
    },
    async update(id, params) {
      this.isLoading = true
      const alertStore = useAlertStore();

      await fetchWrapper.put(`${baseUrl}/${id}`, params);
      alertStore.success(this.sucesso);

      // update stored user if the logged in user updated their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params };
        localStorage.setItem("user", JSON.stringify(user));

        // update auth user in pinia state
        authStore.user = user;
      }
      this.isLoading = false
    },
    async delete(id) {
      this.isLoading = true
      // add isDeleting prop to user being deleted
      this.users.find((x) => x.id === id).isDeleting = true;

      await fetchWrapper.delete(`${baseUrl}/${id}`);

      // remove user from list after deleted
      this.users = this.users.filter((x) => x.id !== id);

      // auto logout if the logged in user deleted their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        authStore.logout();
      }
      this.isLoading = false
    },
  },
});
