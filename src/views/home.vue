<script setup>
import { storeToRefs } from "pinia";
import { usersStore } from "@/stores";
import { RouterLink } from "vue-router";
import { useAlertStore } from '@/stores';
import Card from "./../components/card/card.vue"
const userStore = usersStore();
const { favoritos, users, isLoading} = storeToRefs(userStore);

update()

async function createAlert(message, type){
  const alertStore = useAlertStore();
  if(type === 'error')
    alertStore.error(message)
}
async function update(){
  userStore.getAll();
  userStore.getfavoritos() 
}
</script>

<template>
  <main class="container">
  <h1>Contatos</h1>
  <router-link to="/cadastro/0" class="btn btn-sm btn-success mb-2"
    >Add User</router-link
  >
  <div class="cards">
    <Card v-for="user in favoritos" :key="user.id" :user="user" :favorito="true"></Card>
    <Card v-for="user in users" :key="user.id" :user="user" :favorito="false"></Card>
  </div>
</main>
</template>


<style scoped>
.container{
  display: flex;
  flex-direction: column;
}
.cards{
  display: flex;
  flex-wrap: wrap;
}
</style>