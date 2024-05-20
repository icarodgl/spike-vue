<script setup>
import { useRoute } from "vue-router";
import { contatoStore } from "@/stores/user.store";
import * as Yup from "yup";
import { Form } from "vee-validate";
import {usersStore} from "@/stores"
import FormGroupField from "./../components/forms/form-group-field.vue";
import FormGroupMasked from "./../components/forms/form-group-masked.vue";

const userStore = usersStore();

let user = contatoStore.newContato();
const route = useRoute();
if (route.params.id > 0) {
  user = await contatoStore.getContato();
}

const schema = Yup.object().shape({
  nome: Yup.string().required("campo obrigatório"),
  email: Yup.string().email().required("campo obrigatório"),
  tipoContato: Yup.string().required("campo obrigatório"),
  telefone: Yup.number().required("campo obrigatório"),
  tag: Yup.string().required("campo obrigatório"),
  // .min(6, "Password must be at least 6 characters"),
});
async function onSubmit() {
  console.log(user);
  await userStore.salvarContato(user)
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
          :dado="user.pessoa.nome"
          @change="(e) => (user.pessoa.nome = e)"
          :name="'nome'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.email || user.pessoa.email"
          @change="(e) => (user.pessoa.email = user.email = e)"
          :name="'email'"
        ></FormGroupField>
        <FormGroupMasked
          :errors="errors"
          :dado="user.telefone"
          @change="(e) => (user.telefone = e)"
          :name="'telefone'"
          :mascara="'telefone'"
        ></FormGroupMasked>
        <FormGroupField
          :errors="errors"
          :dado="user.tipoContato"
          @change="(e) => (user.tipoContato = e)"
          :name="'tipoContato'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.tag"
          @change="(e) => (user.tag = e)"
          :name="'tag'"
        ></FormGroupField>
      </div>
      <div class="opcional">
        <FormGroupMasked
          :errors="{}"
          :name="'cpf'"
          :dado="user.pessoa.cpf"
          @change="(e) => (user.pessoa.cpf = e)"
          :mascara="'cpf'"
        ></FormGroupMasked>
        <!-- <FormGroupMasked
          :errors="{}"
          :name="'dataNascimento'"
          :dado="user.pessoa.dataNascimento"
          @change="(e) => (user.pessoa.dataNascimento = e)"
          :mascara="'data'"
        ></FormGroupMasked> -->
      </div>
      <div class="endereco">
        <FormGroupField
          :errors="errors"
          :dado="user.pessoa.endereco.bairro"
          @change="(e) => (user.pessoa.endereco.bairro = e)"
          :name="'bairro'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.pessoa.endereco.cep"
          @change="(e) => (user.pessoa.endereco.cep = e)"
          :name="'cep'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.pessoa.endereco.cidade"
          @change="(e) => (user.pessoa.endereco.cidade = e)"
          :name="'cidade'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.pessoa.endereco.estado"
          @change="(e) => (user.pessoa.endereco.estado = e)"
          :name="'estado'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.pessoa.endereco.logradouro"
          @change="(e) => (user.pessoa.endereco.logradouro = e)"
          :name="'logradouro'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.pessoa.endereco.numero"
          @change="(e) => (user.pessoa.endereco.numero = e)"
          :name="'numero'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.pessoa.endereco.pais"
          @change="(e) => (user.pessoa.endereco.pais = e)"
          :name="'pais'"
        ></FormGroupField>
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