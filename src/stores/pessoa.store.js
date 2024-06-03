import { defineStore } from "pinia";

import { fetchWrapper, requestFormData } from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore } from "@/stores";
import { useLoadStore } from "@/stores";

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
    }),
  actions: {
    setPessoa(_pessoa){
      this.pessoa = _pessoa
    },
    novaPessoa(){
      this.pessoa = {
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
      };
      return this.pessoa
    },
    async salvar() {
      const loadStore = useLoadStore();
      loadStore.show();
      const alertStore = useAlertStore();
      let resp = null;
      if (this.pessoa.id == 0){
        delete this.pessoa._id
        delete this.pessoa.foto
      }
      try {
        resp = (await fetchWrapper.post(`${baseUrl}pessoa/salvar`, this.pessoa)).object;
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      loadStore.close();
      if(resp){
        this.pessoa = resp
      }
    },
    async remover(_user) {
      const alertStore = useAlertStore();
      const loadStore = useLoadStore();
      loadStore.show();
      try {
        await fetchWrapper.delete(`${baseUrl}pessoa/remover/${_user.id}`);
        alertStore.success(this.sucesso);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(this.error);
      }
      loadStore.close();
    },
    async getById(_id) {
      const loadStore = useLoadStore();
      loadStore.show();
      const alertStore = useAlertStore();
      try {
        const resp = (await fetchWrapper.get(`${baseUrl}pessoa/buscar/${_id}`));
        this.pessoa = resp.object
      } catch (error) {
        alertStore.error(this.error);
      }
      loadStore.close();
    },
    async pesquisar(_param) {
      const loadStore = useLoadStore();
      loadStore.show();
      const alertStore = useAlertStore();
      try {
        this.pessoas = await fetchWrapper.post(`${baseUrl}pessoa/pesquisar/`, {
          nome: _param,
        });
        alertStore.success(this.sucesso);
      } catch (error) {
        alertStore.error(this.error);
      }
      loadStore.close();
    },
    async getAll() {
      const loadStore = useLoadStore();
      loadStore.show();
      const alertStore = useAlertStore();
      try {
        this.pessoas = await fetchWrapper.post(`${baseUrl}pessoa/pesquisar`, {
          nome: "",
        });
      } catch (error) {
        alertStore.error(this.error);
      }
      loadStore.close();
    },
    async setPessoa(_pessoa) {
      this.pessoa = _pessoa;
    },
    async getFoto(_id) {
      if(_id && _id > 0){
      const resp = await fetchWrapper.get(`${baseUrl}foto/download/${_id}`);
      return resp;
    }
    },
    async salvarFoto(imagem) {
      const loadStore = useLoadStore();
      loadStore.show();
      const alertStore = useAlertStore();
      try {
        const resp = await requestFormData(
          `${baseUrl}foto/upload/${this.pessoa.id}`,
          imagem
        );
        alertStore.success(this.sucesso);
        return resp;
      } catch (error) {
        alertStore.error(this.error);
      }
      loadStore.close();
    },
  },
});
