<script setup>
import { storeToRefs } from "pinia";

import { useUsersStore } from "@/stores";

const usersStore = useUsersStore();
let { users, favoritos } = storeToRefs(usersStore);

update()

async function update(){
  usersStore.getAll();
  usersStore.getfavoritos()
}

async function favoritar(user){
  await usersStore.favoritar(user)
  update()
}
async function desfavoritar(user){
   await usersStore.desfavoritar(user)
  update()
}
</script>

<template>
  <h1>Contatos</h1>
  <router-link to="/users/add" class="btn btn-sm btn-success mb-2"
    >Add User</router-link
  >
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Tag</th>
        <th>Nome</th>
        <th>cpf</th>
        <th>email</th>
        <th>Telefone</th>
        <th>tipo de Contato</th>
        <th>privado</th>
        <th>Editar</th>
        <th>Deletar</th>
        <th>Favoritar</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="favoritos.length">
        <tr v-for="user in favoritos" :key="user.id" >
          <td>{{ user.id }}</td>
          <td>{{ user.tag }}</td>
          <td>{{ user.pessoa.nome }}</td>
          <td>{{ user.pessoa.cpf }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.telefone }}</td>
          <td>{{ user.tipoContato }}</td>
          <td>{{ user.privado }}</td>
          <td>
            <router-link
              :to="`/users/edit/${user.id}`"
              class="btn btn-sm btn-primary mr-1"
              >Edit</router-link
            >
          </td>
          <td>
            <button
              @click="usersStore.removeContato(user)"
              class="btn btn-sm btn-danger btn-delete-user"
              :disabled="user.isDeleting"
            >
              <span
                v-if="user.isDeleting"
                class="spinner-border spinner-border-sm"
              ></span>
              <span v-else>Delete</span>
            </button>
          </td>
          <td>
            <i @click="desfavoritar(user)" class="bi bi-star-fill"></i>
          </td>
        </tr>
      </template>
      <template v-if="users.length">
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.tag }}</td>
          <td>{{ user.pessoa.nome }}</td>
          <td>{{ user.pessoa.cpf }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.telefone }}</td>
          <td>{{ user.tipoContato }}</td>
          <td>{{ user.privado }}</td>
          <td>
            <router-link
              :to="`/users/edit/${user.id}`"
              class="btn btn-sm btn-primary mr-1"
              >Edit</router-link
            >
          </td>
          <td>
            <button
              @click="usersStore.removeContato(user)"
              class="btn btn-sm btn-danger btn-delete-user"
              :disabled="user.isDeleting"
            >
              <span
                v-if="user.isDeleting"
                class="spinner-border spinner-border-sm"
              ></span>
              <span v-else>Delete</span>
            </button>
          </td>
          <td>
            <i @click="favoritar(user)" class="bi bi-star"></i>
          </td>
        </tr>
      </template>
      <tr v-if="users.loading">
        <td colspan="4" class="text-center">
          <span class="spinner-border spinner-border-lg align-center"></span>
        </td>
      </tr>
      <tr v-if="users.error">
        <td colspan="4">
          <div class="text-danger">Error loading users: {{ users.error }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.bi {
  cursor: pointer;
  display: flex;
  justify-content: center;
}
</style>