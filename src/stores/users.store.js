import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore } from "@/stores";
import {useLoadStore} from "@/stores"


const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const usuarioStore = defineStore({
  id: "usuarios",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    users: [],
    favoritos: [],
    user: {},
    isLoading:false
  }),
  actions: {
    async salvarContato(user) {
      const alertStore = useAlertStore();
      const authStore = useAuthStore();
      const loadStore = useLoadStore();
      loadStore.show()
      try {
        const authStore = useAuthStore();

        const req = await fetchWrapper.get(`${baseUrl}usuario/buscar/${authStore.user.id}`)
        user.usuario = req.usuario
        await fetchWrapper.post(`${baseUrl}contato/salvar`, user);
      } catch (error) {
        alertStore.error(this.error);
      }
       loadStore.close();
    },
    getLocalById(id){
      this.user = this.users
    },
    async getFoto(_id) {
      try { 
        const resp =  await fetchWrapper.get(`${baseUrl}foto/download/${_id}`)
        return resp
      } catch (error) {
      }
    },
    async getAll() {
      const loadStore = useLoadStore();
      const alertStore = useAlertStore();
      loadStore.show();
      try {
        this.users = await fetchWrapper.post(
          `${baseUrl}usuario/pesquisar`,{
            "termo": ""
          }
        );
      } catch (error) {
        alertStore.error(this.error);
      }
       loadStore.close();
    },
    async pesquisar(termo) {
      const loadStore = useLoadStore();
       loadStore.show();;
      const alertStore = useAlertStore();
      try {
        this.usuarios = await fetchWrapper.post(`${baseUrl}usuario/pesquisar/`, {termo});
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
       loadStore.close();;
    },
    async getById(id) {
      const alertStore = useAlertStore();
      try {
        const authStore = useAuthStore();
        const users = await fetchWrapper.get(
          `${baseUrl}contato/listar/${authStore.user.id}`
        );
        this.user = users.find(u => u.id === id)
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
    },
    async remover(_user) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.delete(`${baseUrl}usuario/remover/${_user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(this.error);
      }
    },
    async update(id, params) {
      const loadStore = useLoadStore();
       loadStore.show();
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
       loadStore.close();
    },
    async delete(id) {
      const loadStore = useLoadStore();
       loadStore.show();
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
       loadStore.close();
    },
  },
});
