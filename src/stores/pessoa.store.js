import { defineStore } from "pinia";

import { fetchWrapper} from "@/helpers";
import { useAlertStore } from "@/stores";
import { useLoadStore} from "@/stores";

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
      useLoadStore.show();
      
      let resp = null;
      if (this.pessoa.id == 0){
        delete this.pessoa._id
        delete this.pessoa.foto
      }
      try {
        resp = (await fetchWrapper.post(`${baseUrl}pessoa/salvar`, this.pessoa)).object;
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
      useLoadStore.close();
      if(resp){
        this.pessoa = resp
      }
    },
    async remover(_user) {
      
      useLoadStore.show();
      try {
        await fetchWrapper.delete(`${baseUrl}pessoa/remover/${_user.id}`);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
      useLoadStore.close();
    },
    async getById(_id) {
      useLoadStore.show();
      
      try {
        const resp = (await fetchWrapper.get(`${baseUrl}pessoa/buscar/${_id}`));
        this.pessoa = resp.object
      } catch (error) {
        useAlertStore.error(this.error);
      }
      useLoadStore.close();
    },
    async pesquisar(_param) {
      useLoadStore.show();
      
      try {
        this.pessoas = await fetchWrapper.post(`${baseUrl}pessoa/pesquisar/`, {
          nome: _param,
        });
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
      useLoadStore.close();
    },
    async getAll() {
      useLoadStore.show();
      
      try {
        this.pessoas = await fetchWrapper.post(`${baseUrl}pessoa/pesquisar`, {
          nome: "",
        });
      } catch (error) {
        useAlertStore.error(this.error);
      }
      useLoadStore.close();
    },
    async setPessoa(_pessoa) {
      this.pessoa = _pessoa;
    },
  },
});
