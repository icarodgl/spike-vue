<script setup>
import { storeToRefs } from "pinia";
import { usersStore } from "@/stores";
import { RouterLink } from "vue-router";
import { useAlertStore } from "@/stores";
import Card from "./../components/card/card.vue";
const userStore = usersStore();
const { favoritos, users, isLoading } = storeToRefs(userStore);

update();

async function createAlert(message, type) {
  const alertStore = useAlertStore();
  if (type === "error") alertStore.error(message);
}
async function update() {
  userStore.getAll();
  userStore.getfavoritos();
}
</script>

<template>
  <main class="container">
    <div class="head">
      <h1>Contatos</h1>
      <router-link to="contato/cadastro/0" class="btn btn-sm btn-success mb-2"
        ><i class="bi bi-plus-circle"></i> Novo contato</router-link
      >
    </div>

    <div class="cards">
      <Card
        v-for="user in favoritos"
        :key="user.id"
        :user="user"
        :favorito="true"
        :pushTo="'contato'"
      ></Card>
      <Card
        v-for="user in users"
        :key="user.id"
        :user="user"
        :favorito="false"
        :pushTo="'contato'"
      ></Card>
    </div>
  </main>
</template>


<style scoped>
.btn{
  height: 34px;
  margin: 10px 10px 10px 20px;
}
.container {
  display: flex;
  flex-direction: column;
}
.cards {
  display: flex;
  flex-wrap: wrap;
}
.head{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>