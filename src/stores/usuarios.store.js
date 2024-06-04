import { defineStore } from "pinia";

import { fetchWrapper, requestFormData } from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore as alertStore } from "@/stores";

const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const usuarioStore = defineStore({
  id: "usuarios",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    usuarios: [],
    usuario: {
      id: 0,
      nome: "",
      cpf: "",
      endereco: {
        id: 0,
        logradouro: "",
        numero: "",
        cep: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "",
      },
      foto: {
        id: "",
        name: "",
        type: "",
      },
    },
  }),
  actions: {
    async salvar(_user) {
      const authStore = useAuthStore();
      try {
        await fetchWrapper.post(`${baseUrl}usuario/salvar`, _user);
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
    },
    async getById(_id) {
      try {
        const users = await fetchWrapper.get(`${baseUrl}usuario/buscar/${_id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
    },
    async pesquisar(_param) {
      try {
        this.usuarios = await fetchWrapper.post(
          `${baseUrl}usuario/pesquisar/`,
          {
            termo: _param,
          }
        );
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
    },
    async getAll() {
      try {
        this.usuarios = await fetchWrapper.post(`${baseUrl}usuario/pesquisar`, {
          termo: "",
        });
      } catch (error) {
        alertStore.error(this.error);
      }
    },
    async setPessoa(_pessoa) {
      this.usuario = _pessoa;
    },
  },
});
