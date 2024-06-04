import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore as alertStore } from "@/stores";
import {useLoadStore as loadStore} from "@/stores"


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
    async salvarContato(user) {
      
      const authStore = useAuthStore();
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
    async getFoto(_id) {
      try { 
        const resp =  await fetchWrapper.get(`${baseUrl}foto/download/${_id}`)
        return resp
      } catch (error) {
      }
    },
    async getAll() {
      
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
       loadStore.show();;
      
      try {
        this.usuarios = await fetchWrapper.post(`${baseUrl}usuario/pesquisar/`, {termo});
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
       loadStore.close();;
    },
    async getById(id) {
      
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
      
      try {
        await fetchWrapper.delete(`${baseUrl}usuario/remover/${_user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        
        alertStore.error(this.error);
      }
    },    async favoritar(user) {
      this.isLoading = true;
      
      try {
        await fetchWrapper.post(`${baseUrl}favorito/salvar`, user);
        await fetchWrapper.delete(`${baseUrl}contato/remover/${user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
    async desfavoritar(user) {
      this.isLoading = true;
      
      try {
        await fetchWrapper.post(`${baseUrl}contato/salvar`, user);
        await fetchWrapper.delete(`${baseUrl}favorito/remover/${user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
  },
});
