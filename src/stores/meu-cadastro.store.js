import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";

const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const cadastroStore = defineStore({
  id: "meucadastro",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
    user:  {
          cpf: "",
          dataNascimento: "",
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
      const alertStore = useAlertStore();
      try {
        this.user = (await fetchWrapper.get(
          `${baseUrl}usuario/buscar/${_id}`
        )).object.usuario
      } catch (error) {
        alertStore.error(this.error);
      }
    },
    async update(_user) {
      const alertStore = useAlertStore();
      delete _user.password
      try {
        await fetchWrapper.put(`${baseUrl}usuario/atualizar`, _user);
        alertStore.success(this.sucesso)
      } catch (error) {
        alertStore.error(this.error);
      }
    },

    async save(_user) {
      const alertStore = useAlertStore();
      delete _user.password
      try {
        await fetchWrapper.put(`${baseUrl}usuario/salvar`, _user);
        alertStore.success(this.sucesso)
      } catch (error) {
        alertStore.error(this.error);
      }
    },
  },
});
