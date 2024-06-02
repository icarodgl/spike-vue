import { defineStore } from "pinia";

import { fetchWrapper , requestFormData} from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore } from "@/stores";

const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const pessoasStore = defineStore({
  id: "pessoas",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    pessoas: [],
    pessoa: {
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
    isLoading: false,
  }),
  actions: {
    async salvar(_user) {
      this.isLoading = true;
      const alertStore = useAlertStore();
      const authStore = useAuthStore();
      try {
        await fetchWrapper.post(`${baseUrl}pessoa/salvar`, _user);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
    async remover(_user) {
      const alertStore = useAlertStore();
      this.isLoading = true;
      try {
        await fetchWrapper.delete(`${baseUrl}pessoa/remover/${_user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(this.error);
      }
    },
    async getById(_id) {
      this.isLoading = true;
      const alertStore = useAlertStore();
      try {
        const users = await fetchWrapper.get(`${baseUrl}pessoa/buscar/${_id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
    async pesquisar(_param) {
      this.isLoading = true;
      const alertStore = useAlertStore();
      try {
        this.pessoas = await fetchWrapper.post(`${baseUrl}pessoa/pesquisar/`, {
          nome: _param,
        });
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
    async getAll() {
      this.isLoading = true;
      const alertStore = useAlertStore();
      try {
        this.pessoas = await fetchWrapper.post(`${baseUrl}pessoa/pesquisar`, {
          nome: "",
        });
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
    async setPessoa(_pessoa) {
      this.pessoa = _pessoa;
    },
    async getFoto(_id) {
        const resp =  await fetchWrapper.get(`${baseUrl}foto/download/${_id}`)
        return resp
    },
    async salvarFoto(id, imagem) {
      this.isLoading = true;
      const alertStore = useAlertStore();
      try { 
        const resp = await requestFormData(`${baseUrl}foto/upload/${id}`, imagem)
        alertStore.success(this.sucesso);
        return resp
      } catch (error) {
        alertStore.error(this.error);
      }
      this.isLoading = false;
    },
},
});
