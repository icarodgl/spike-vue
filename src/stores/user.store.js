import { reactive } from "vue";
import { boolean } from "yup";

export const contatoStore = reactive({
  contato: {},
  loading: false,
  async setContato(user) {
    localStorage.setItem("contato", JSON.stringify(user));
  },
  async getContato() {
    this.contato = JSON.parse(localStorage.getItem("contato"));
    return this.contato
  },
  newContato() {
    return (this.contato = {
      id: 0,
      email: "",
      tipoContato: "",
      telefone: "",
      tag: "",
      privado: boolean,
      pessoa: {
        id: 0,
        nome: "",
        cpf: "",
        endereco: {
          bairro: "",
          cep: "",
          cidade: "",
          estado: "",
          id: 0,
          logradouro: "",
          numero: 0,
          pais: "",
        },
        foto: {
          id: "",
          name: "",
          type: "",
        },
      },
      usuario: {
        cpf: "",
        dataNascimento: "",
        email: "",
        id: 0,
        nome: "",
        password: "",
        telefone: "",
        username: "",
      },
    }
  );
  },
});
