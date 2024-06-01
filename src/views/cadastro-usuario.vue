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

if(id > 0) {
  await cStore.get(id)
}
let user = cStore.user

const schema = Yup.object().shape({
  nome: Yup.string().required("campo obrigatório"),
  email: Yup.string().email().required("Email inválido"),
  tipoContato: Yup.string().required("campo obrigatório"),
  telefone: Yup.string().required("campo obrigatório"),
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
          :errors="errors"
          :dado="user.nome"
          @change="(e) => (user.nome = user.nome = e)"
          :name="'nome'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.email || user.email"
          @change="(e) => (user.email = user.email = user.email = e)"
          :name="'email'"
        ></FormGroupField>
        <FormGroupMasked
          :errors="{errors}"
          :dado="user.telefone"
          @change="(e) => (user.telefone = user.telefone = e)"
          :name="'telefone'"
          :mascara="'telefone'"
        ></FormGroupMasked>
        <FormGroupMasked
          :errors="{}"
          :name="'dataNascimento'"
          :dado="user.dataNascimento"
          @change="(e) => (user.dataNascimento = e)"
          :mascara="'data'"
        ></FormGroupMasked>
        <FormGroupMasked
          :errors="{}"
          :name="'cpf'"
          :dado="user.cpf"
          @change="(e) => (user.cpf = e)"
          :mascara="'cpf'"
        ></FormGroupMasked>
      </div>

      <button @click="onSubmit()" class="btn btn-primary" :disabled="isSubmitting">
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