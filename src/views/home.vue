<script setup>
import { storeToRefs } from "pinia";
import { contatoStore } from "@/stores";
import { RouterLink } from "vue-router";
import Card from "./../components/card/card.vue";
const cStore = contatoStore();
const { favoritos, contatos } = storeToRefs(cStore);

update();

async function update() {
  cStore.getAll();
  cStore.getfavoritos();
}
</script>

<template>
  <main class="container">
    <div class="head">
      <h1>Contatos</h1>
      <router-link to="/pessoas" class="btn btn-sm btn-success mb-2"
        ><i class="bi bi-plus-circle"></i> Novo Contato</router-link>
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
        v-for="user in contatos"
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