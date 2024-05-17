import { reactive } from 'vue'

export const contatoStore = reactive({
  contato: {},
  loading: false,
  async setContato(user){
    localStorage.setItem('contato', JSON.stringify(user));
  },
  async getContato(){
    return localStorage.getItem('contato')
  },
  newContato (){
    return this.contato = {
      id:0,
      pessoa:{
        id:0,
        nome:"",
        cpf:"",
        endereco:{
          id:0,
          logradouro:"",
          numero:0,
          cep:"",
          bairro:"",
          cidade:"",
          estado:"",
          pais:""
        },
          foto:{
            id:"",
            name:"",
            type:""
          }
        },
        tag:"",
        email:"",
        telefone:"",
        tipoContato:"",
        privado:true,
        usuario:{
          id:0,
          nome:"",
          dataNascimento:"",
          cpf:"",
          email:"",
          telefone:"",
          username:"",
          password:""}
        }
  }
})