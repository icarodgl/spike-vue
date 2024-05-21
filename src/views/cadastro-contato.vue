<script setup>
import { useRoute } from "vue-router";
import { contatoStore } from "@/stores/user.store";
import * as Yup from "yup";
import { Form } from "vee-validate";
import {pessoasStore} from "@/stores"
import FormGroupField from "../components/forms/form-group-field.vue";
import FormGroupMasked from "../components/forms/form-group-masked.vue";
import SelectItem from "../components/forms/form-group-select.vue"
const pStore = pessoasStore();

let user = contatoStore.newContato();
const route = useRoute();

const schema = Yup.object().shape({
  nome: Yup.string().required("campo obrigatório"),
  email: Yup.string().email().required("Email inválido"),
  tipoContato: Yup.string().required("campo obrigatório"),
  telefone: Yup.string().required("campo obrigatório"),
});

async function onSubmit() {
  await pStore.salvarContato(user)
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
          @change="(e) => (user.pessoa.nome = user.usuario.nome = e)"
          :name="'nome'"
        ></FormGroupField>
        <FormGroupField
          :errors="errors"
          :dado="user.email || user.pessoa.email"
          @change="(e) => (user.pessoa.email = user.usuario.email = user.email = e)"
          :name="'email'"
        ></FormGroupField>
        <FormGroupMasked
          :errors="errors"
          :dado="user.telefone"
          @change="(e) => (user.telefone = user.usuario.telefone = e)"
          :name="'telefone'"
          :mascara="'telefone'"
        ></FormGroupMasked>
        <SelectItem
          :errors="errors"
          :dado="user.tipoContato"
          :options="['TELEFONE','EMAIL','CELULAR']"
          @change="(e) => (user.tipoContato = e)"
          :name="'tipoContato'"
        ></SelectItem>
        <SelectItem
          :errors="errors"
          :dado="user.tag"
          :options="['PESSOAL','RABALHO']"
          @change="(e) => (user.tag = e)"
          :name="'tag'"
        ></SelectItem>
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