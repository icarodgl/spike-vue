import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore, useAlertStore, useLoadStore } from "@/stores";

const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const contatoStore = defineStore({
  id: "contato",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    contatos: [],
    favoritos: [],
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
      const authStore = useAuthStore();
      try {
        useLoadStore.show();
        const req = await fetchWrapper.get(
          `${baseUrl}usuario/buscar/${authStore.user.id}`
        );
        this.contato.usuario = req.object.usuario;
        this.contato.pessoa = pessoa;
        await fetchWrapper.post(`${baseUrl}contato/salvar`, this.contato);
        useAlertStore.error(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
      useLoadStore.close();
    },

    async getAll() {
      const authStore = useAuthStore();

      try {
        this.contatos = await fetchWrapper.get(
          `${baseUrl}contato/listar/${authStore.user.id}`
        );
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
    async getfavoritos() {
      try {
        this.favoritos = await fetchWrapper.get(`${baseUrl}favorito/pesquisar`);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
    async favoritar(user) {
      try {
        await fetchWrapper.post(`${baseUrl}favorito/salvar`, user);
        await fetchWrapper.delete(`${baseUrl}contato/remover/${user.id}`);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
    async desfavoritar(user) {
      try {
        await fetchWrapper.post(`${baseUrl}contato/salvar`, user);
        await fetchWrapper.delete(`${baseUrl}favorito/remover/${user.id}`);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
    async updateContato(contato) {
      try {
        await fetchWrapper.post(`${baseUrl}contato/salvar`, contato);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
    async removeFavorito(user) {
      try {
        await fetchWrapper.delete(`${baseUrl}favorito/remover/${user.id}`);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
    async removeContato(user) {
      try {
        await fetchWrapper.delete(`${baseUrl}contato/remover/${user.id}`);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
  },
});
