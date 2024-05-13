<script setup>
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/stores';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>

<template>
    <h1>Contatos</h1>
    <router-link to="/users/add" class="btn btn-sm btn-success mb-2">Add User</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 10%">Id</th>
                <th style="width: 10%">Tag</th>
                <th style="width: 10%">Nome</th>
                <th style="width: 10%">cpf</th>
                <th style="width: 10%">email</th>
                <th style="width: 10%">Telefone</th>
                <th style="width: 10%">tipo de Contato</th>
                <th style="width: 10%">privado</th>
                <th style="width: 10%">Editar</th>
                <th style="width: 10%">Deletar</th>
                <th style="width: 10%">Favoritar</th>

            </tr>
        </thead>
        <tbody>
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
                      <router-link :to="`/users/edit/${user.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                    </td>
                    <td> 
                      <button @click="usersStore.delete(user.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="user.isDeleting">
                      <span v-if="user.isDeleting" class="spinner-border spinner-border-sm"></span>
                      <span v-else>Delete</span>
                  </button></td>
                  <td>
                    <i v-if="user.favorito" class="bi bi-star-fill"></i>
                    <i  v-else class="bi bi-star"></i>
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
                    <div class="text-danger">Error loading users: {{users.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
</template>
