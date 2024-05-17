<script setup>
import { useRoute } from "vue-router";
import { contatoStore } from "@/stores/user.store";
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';

let user = {}
const route = useRoute();
if (route.params.id > 0){
  user = await contatoStore.getContato();
}else{
 user = contatoStore.newContato()
}


const schema = Yup.object().shape({
    nome: Yup.string()
        .required('campo obrigatório'),
    lastName: Yup.string()
        .required('campo obrigatório'),
    username: Yup.string()
        .required('campo obrigatório'),
    password: Yup.string()
        .required('campo obrigatório')
        .min(6, 'Password must be at least 6 characters')
});
async function onSubmit(values) {

}
</script>


<template>
  <div>
    <div>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }"> 
          <div class="form-group">
          <label>Nome</label>
          <Field name="nome" type="text" class="form-control" :class="{ 'is-invalid': errors.nome }" />
          <div class="invalid-feedback">{{ errors.nome }}</div>
      </div>


      <button class="btn btn-primary" :disabled="isSubmitting">
        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
        cadastrar
    </button>
      </Form >


      {{ user }}



      
    </div>
  </div>
</template>
