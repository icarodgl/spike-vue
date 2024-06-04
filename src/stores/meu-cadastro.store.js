import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";
import moment from "moment";

const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const cadastroStore = defineStore({
  id: "meucadastro",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    user: {
      cpf: "",
      dataNascimento: "",
      data: "",
      email: "",
      id: 0,
      nome: "",
      password: "",
      telefone: "",
      username: "",
    },
  }),
  actions: {
    async get(_id) {
      
      if (_id == 0){
         this.user = newUser
          return
        }
      try {
        let resp = (await fetchWrapper.get(`${baseUrl}usuario/buscar/${_id}`))
          .object.usuario;
        resp.data = inputDateTransform(resp.dataNascimento);
        this.user = resp;
      } catch (error) {
        useAlertStore.error(error);
      }
    },
    async update(_user) {
      
      delete _user.password;
      _user.dataNascimento = outDateTransform(_user.data);
      try {
        await fetchWrapper.put(`${baseUrl}usuario/atualizar`, _user);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },

    async save(_user) {
      
      if(_user.id == 0) delete _user.id
      _user.dataNascimento = outDateTransform(_user.data);
      const newUser = {
        tipos: ["ROLE_USER"],
        usuario:_user
      };
      try {
        await fetchWrapper.post(`${baseUrl}usuario/salvar`, newUser);
        useAlertStore.success(this.sucesso);
      } catch (error) {
        useAlertStore.error(this.error);
      }
    },
  },
});

function inputDateTransform(date) {
  return moment(date).format("DD/MM/yyyy");
}
function outDateTransform(date) {
  const d = date.split("/");
  date = `${d[2]}-${d[1]}-${d[0]}`;
  return date;
}

const newUser = {
  cpf: "",
  dataNascimento: "",
  data: "",
  email: "",
  id: 0,
  nome: "",
  password: "",
  telefone: "",
  username: "",
}