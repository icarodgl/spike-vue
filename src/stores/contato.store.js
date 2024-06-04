import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore } from "@/stores";

const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const contatoStore = defineStore({
  id: "contato",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    contatos:[],
    favoritos:[],
    contato: {
      email: "",
      pessoa: {},
      privado: true,
      tag: "",
      telefone: "",
      tipoContato: "",
      usuario: {},
    },
  }),
  actions: {
    async salvarContato(pessoa) {
      const alertStore = useAlertStore();
      const authStore = useAuthStore();
      try {
        this.isLoading = true;
        const req = await fetchWrapper.get(
          `${baseUrl}usuario/buscar/${authStore.user.id}`
        );
        this.contato.usuario = req.object.usuario;
        this.contato.pessoa = pessoa
        await fetchWrapper.post(`${baseUrl}contato/salvar`, this.contato);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },

    async getAll() {
      this.isLoading = true;
      const authStore = useAuthStore();
      const alertStore = useAlertStore();
      try {
        this.contatos = await fetchWrapper.get(`${baseUrl}contato/listar/${authStore.user.id}`);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
    async getfavoritos() {
      this.isLoading = true;
      const alertStore = useAlertStore();
      try {
        this.favoritos = await fetchWrapper.get(`${baseUrl}favorito/pesquisar`);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
    async favoritar(user) {
      this.isLoading = true;
      const alertStore = useAlertStore();
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
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.post(`${baseUrl}contato/salvar`, user);
        await fetchWrapper.delete(`${baseUrl}favorito/remover/${user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
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
    async removeFavorito(user) {
      const alertStore = useAlertStore();
      try {
        await fetchWrapper.delete(`${baseUrl}favorito/remover/${user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        const alertStore = useAlertStore();
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
  },
});
