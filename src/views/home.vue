<script setup>
import { storeToRefs } from "pinia";
import { contatoStore, useLoadStore } from "@/stores";
import { RouterLink } from "vue-router";
import Card from "./../components/card/card.vue";
const cStore = contatoStore();
const { favoritos, contatos } = storeToRefs(cStore);
let busca = ""
let buscou = false
update();

async function update() {
  useLoadStore.show()
  await cStore.getAll();
  await cStore.getfavoritos();
  useLoadStore.close()
}
function pesquisar() {
  cStore.pesquisar(busca)
  buscou = true
}
async function limparBusca() {
  cStore.getAll()
  busca = ""
  buscou = false
}
</script>


<template>
  <main class="container">
    <div class="head">
      <div class="titulo">
        <h1>Contatos</h1>
        <router-link to="/pessoas" class="btn btn-sm btn-success mb-2"><i class="bi bi-plus-circle"></i> Novo
          Contato</router-link>
      </div>
      <div class="busca">
        <div class="search input-group mb-3">
          <input type="text" v-on:keyup.enter="pesquisar()" v-model="busca" class="form-control" placeholder="Nome"
            aria-label="Nome" aria-describedby="basic-addon1">
          <span v-if="buscou && busca !== ''" @click="limparBusca()" class="input-group-text" id="basic-addon2"><i
              class="bi bi-x-lg"></i></span>
          <span v-else @click="pesquisar()" class="input-group-text" id="basic-addon2"><i
              class="bi bi-search"></i></span>
        </div>
      </div>
    </div>
    <div class="cards">
      <div v-if="!buscou" class="cards">
        <Card v-for="user in favoritos" :key="user.id" :user="user" :favorito="true"></Card>
      </div>
      <Card v-for="user in contatos" :key="user.id" :user="user" :favorito="false"></Card>
    </div>
  </main>
</template>


<style scoped>
.titulo {
  display: flex;
  width: 100%;
  justify-content: center;
}

.busca {}

.search {
  width: 300px;
  top: 8px;
}

.btn {
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

.head {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

@media (max-width: 500px) {
  .search {
    width: 300px;
    position: relative;
    left: 0px;
    top: 8px;
  }
}

@media (max-width: 800px) {
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .head {
    flex-wrap: wrap;
  }

  h1 {
    position: relative;
  }
}
</style>