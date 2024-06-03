<script setup>
import * as Yup from "yup";
import { Form } from "vee-validate";
import { storeToRefs } from 'pinia'
import { pessoasStore } from "@/stores"
import FormGroupField from "@/components/forms/form-group-field.vue";
import FormGroupMasked from "@/components/forms/form-group-masked.vue";
import FormGroupSelect from "@/components/forms/form-group-select.vue";
import FormGroupSwitch from "@/components/forms/form-group-switch.vue"
import CardPessoa from "@/components/card/card-pessoa.vue";
import { router } from '@/router';
import { useRoute } from 'vue-router';
import { contatoStore } from "@/stores";

const route = useRoute();
const pStore = pessoasStore()
const cStore = contatoStore()
const { pessoa } = storeToRefs(pStore);
const { contato } = storeToRefs(cStore);
let foto;
const tipoContatoOptions = ['CELULAR', 'EMAIL', 'TELEFONE']

const schema = Yup.object().shape({
  nome: Yup.string().required("campo obrigatório"),
  email: Yup.string().email().required("Email inválido"),
});

if (route.params.id == '0') {
  pStore.novaPessoa()
} else {
  pStore.getById(route.params.id)
}
async function onSubmit() {
  await cStore.salvarContato(pStore.pessoa)
}


</script>

<template>
  <div class="container">
    <RouterLink to="/pessoas" class="voltar"><i class="bi bi-arrow-left"></i>Voltar</RouterLink>
    <div class="contato">
      <CardPessoa class="contato_card" :pessoa="pessoa"></CardPessoa>
    </div>
    <Form class="formulario" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <div class="basico">
        <FormGroupSwitch :errors="errors" :dado="contato.privado" @change="(e) => (contato.privado = contato.privado = e)" :name="'Privado'"
        ></FormGroupSwitch>

        <FormGroupField :errors="errors" :dado="contato.tag" @change="(e) => (contato.tag = contato.tag = e)" :name="'Tag'">
        </FormGroupField>
        <FormGroupSelect :errors="errors" :dado="contato.tipoContato" :options="tipoContatoOptions"
          @change="(e) => (contato.tipoContato = contato.tipoContato = e)" :name="'Tipo de Contato'">
        </FormGroupSelect>
        <FormGroupField :errors="errors" :dado="contato.email" @change="(e) => (contato.email = e)"
          :name="'email'"></FormGroupField>
        <FormGroupMasked :errors="errors" :dado="contato.telefone" @change="(e) => (contato.telefone = e)" :name="'telefone'"
          :mascara="'telefone'"></FormGroupMasked>
      </div>

      <button @click="onSubmit()" class="btn btn-primary" :disabled="isSubmitting">
        cadastrar
      </button>
    </Form>
  </div>
</template>

<style scoped>
.contato_card :deep(.head_actions) {
  display: none;
}

.voltar {
  cursor: pointer;
}

.bi-arrow-left {
  margin-right: 5px
}

.contato {
  justify-content: center;
  display: flex;

}

.contato_card {
  width: 300px;

}

.formulario {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.basico {
  display: flex;
  flex-direction: column;
  width: 30%;
}

@media (max-width: 800px) {

  .basico {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>