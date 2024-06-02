<script setup>
import { useRoute } from "vue-router";
import * as Yup from "yup";
import { Form } from "vee-validate";
import {cadastroStore} from "@/stores"
import FormGroupField from "../components/forms/form-group-field.vue";
import FormGroupMasked from "../components/forms/form-group-masked.vue";
const route = useRoute();
const cStore = cadastroStore();
const id = route.params.id;
const isNewUser = id==0; 
await cStore.get(id)
let user = cStore.user

const schema = Yup.object().shape({
  'username': Yup.string().required("Username é obrigatório"),
  'nome': Yup.string().required("Nome é obrigatório"),
  'email': Yup.string().email('Email é obrigatório').required("Email inválido"),
  'telefone': Yup.string().required("Telefone é obrigatório").min(14,'telefone inválido'),
  'cpf': Yup.string().required("CPF é obrigatório").length(14, 'CPF inváido'),
  'Data de Nascimento': Yup.string().required('Data de nascimento é obrigatório').min(10, 'Data errada')
});

async function onSubmit() {
  if(id > 0){
    await cStore.update(user)
  }else{
    await cStore.save(user)
  }
 
}
</script>

<template>
  <div class="container">
    <Form
      class="formulario"
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="basico">
        <FormGroupField
          :errors="errors"
          :dado="user.username"
          @change="(e) => (user.username = user.username = e)"
          :name="'username'"
        ></FormGroupField>
        <FormGroupField
          v-if="isNewUser"
          :errors="errors"
          :dado="user.password"
          @change="(e) => (user.password = user.password = e)"
          :name="'password'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.nome"
          @change="(e) => (user.nome = user.nome = e)"
          :name="'nome'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.email"
          @change="(e) => (user.email = user.email = e)"
          :name="'email'"
        ></FormGroupField>
        <FormGroupMasked
          :errors="errors"
          :dado="user.telefone"
          @change="(e) => (user.telefone = e)"
          :name="'telefone'"
          :mascara="'telefone'"
        ></FormGroupMasked>
        <FormGroupMasked
          :errors="errors"
          :name="'Data de Nascimento'"
          :dado="user.data"
          @change="(e) => user.data = e"
          :mascara="'data'"
        ></FormGroupMasked>
        <FormGroupMasked
          :errors="errors"
          :name="'cpf'"
          :dado="user.cpf"
          @change="(e) => (user.cpf = e)"
          :mascara="'cpf'"
        ></FormGroupMasked>
      </div>

      <button class="btn btn-primary" :disabled="isSubmitting || Object.keys(errors).length > 0">
        cadastrar 
      </button>
    </Form>
  </div>
</template>

<style scoped>
.basico,
.opcional,
.endereco {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.opcional > div,
.basico > div {
  margin: 0px 10px 5px 10px;
}
.endereco {
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
}
.endereco > div {
  width: 45%;
  margin: 0px 10px 5px 10px;
}
.formulario {
  align-items: center;
  display: flex;
  flex-direction: column;
}
@media (max-width: 800px) {
  .basico,
  .opcional,
  .endereco {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>