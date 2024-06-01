<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';

const schema = Yup.object().shape({
    username: Yup.string().required('Usuário é obrigatório.'),
    password: Yup.string().required('Senha é obrigatório.')
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
}
</script>

<template>
  <main>
    <div class="formulario">
      <h1>Login</h1>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <div class="form-group">
          <label>Login</label>
          <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
          <div class="form-group">
            <label>Senha</label>
            <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <div class="form-group btn-login">
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              Login <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
            </button>
          </div>
      </Form>
    </div>
  </main>
</template>

<style scoped>
.btn-login{
  display: flex;
  justify-content: flex-end;
  width: 62%;
  margin-top: 10px;
}
label{
  width: 12%;
}
h1{
  text-align: center;
}
.formulario{
  width: 33%;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 33%;
  
}
@media (max-width: 600px) {
  .formulario{
  width: 80%;
  left: 10%;
  }
}
input{
  padding: 5px;
  margin: 5px;
}

</style>