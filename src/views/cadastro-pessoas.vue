<script setup>
import * as Yup from "yup";
import { Form } from "vee-validate";
import { pessoasStore } from "@/stores"
import FormGroupField from "./../components/forms/form-group-field.vue";
import FormGroupMasked from "./../components/forms/form-group-masked.vue";
import ImageUpload from "./../components/forms/image-upload.vue" 

const pStore = pessoasStore()
let pessoa = pStore.pessoa
let foto;

await updateFoto()
async function updateFoto() {
  if(pessoa.id){
        foto = await pStore.getFoto(pessoa.id)
  }
}
const schema = Yup.object().shape({
  nome: Yup.string().required("campo obrigatório"),
  email: Yup.string().email().required("Email inválido"),
});

async function onSubmit() {
  const resp = await pStore.salvar(pessoa)
}
async function salarImagem(image){
  let formData = new FormData();
  formData.append('foto', image);
  console.log(formData);
  pStore.salvarFoto(pessoa.id, formData)
}
</script>

<template>
  <div class="container">
    <RouterLink to="/pessoas" class="voltar"><i class="bi bi-arrow-left"></i>Voltar</RouterLink>
    <ImageUpload :dado="foto" @upload="salarImagem"></ImageUpload>
    <Form class="formulario" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <div class="basico">
        <FormGroupField :errors="errors" :dado="pessoa.nome" @change="(e) => (pessoa.nome = e)" :name="'nome'">
        </FormGroupField>
        <FormGroupMasked :errors="{}" :name="'cpf'" :dado="pessoa.cpf" @change="(e) => (pessoa.cpf = e)"
          :mascara="'cpf'"></FormGroupMasked>
      </div>
      <div class="endereco">
        <FormGroupField :errors="errors" :dado="pessoa.endereco?.bairro" @change="(e) => (pessoa.endereco.bairro = e)"
          :name="'bairro'"></FormGroupField>
        <FormGroupMasked :errors="errors" :dado="pessoa.endereco?.cep" @change="(e) => (pessoa.endereco.cep = e)"
          :name="'cep'" :mascara="'cep'"></FormGroupMasked>
        <FormGroupField :errors="errors" :dado="pessoa.endereco?.cidade" @change="(e) => (pessoa.endereco.cidade = e)"
          :name="'cidade'"></FormGroupField>
        <FormGroupField :errors="errors" :dado="pessoa.endereco?.estado" @change="(e) => (pessoa.endereco.estado = e)"
          :name="'estado'"></FormGroupField>
        <FormGroupField :errors="errors" :dado="pessoa.endereco?.logradouro"
          @change="(e) => (pessoa.endereco.logradouro = e)" :name="'logradouro'"></FormGroupField>
        <FormGroupMasked :errors="{}" :mascara="'numero'" :dado="pessoa.endereco?.numero" @change="(e) => (pessoa.endereco.numero = e)"
          :name="'numero'"></FormGroupMasked>
        <FormGroupField :errors="errors" :dado="pessoa.endereco?.pais" @change="(e) => (pessoa.endereco.pais = e)"
          :name="'pais'"></FormGroupField>
      </div>

      <button @click="onSubmit()" class="btn btn-primary" :disabled="isSubmitting">
        cadastrar
      </button>
    </Form>
  </div>
</template>

<style scoped>

.voltar {
  cursor: pointer;
}

.bi-arrow-left {
  margin-right: 5px
}

.basico,
.opcional,
.endereco {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.opcional>div,
.basico>div {
  margin: 0px 10px 5px 10px;
}

.endereco {
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
}

.endereco>div {
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