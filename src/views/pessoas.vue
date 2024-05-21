<script setup>
import { storeToRefs } from "pinia";
import { toRaw } from 'vue'
import { router } from '@/router';
import { pessoasStore } from "@/stores";
import CardPessoa from "./../components/card/card-pessoa.vue";
const pStore = pessoasStore();
const { pessoas } = storeToRefs(pStore);
let _pessoas = toRaw(pessoas)
let busca = ""
let buscou = false
await pStore.getAll()

async function buscar(){
  pStore.pesquisar(busca)
  buscou = true
}
async function limparBusca(){
  pStore.getAll()
  busca = ""
  buscou = false
}
function editUser(e) {
  pStore.setPessoa(e)
  router.push(`/pessoas/cadastro/${e.id}`)
}
</script>

<template>
  <main class="container">
    <div class="head">
      <h1>Pessoas</h1>
      <div class="search input-group mb-3">
        <input type="text" v-on:keyup.enter="buscar()" v-model="busca" class="form-control" placeholder="Nome" aria-label="Nome"
          aria-describedby="basic-addon1">
          <span v-if="buscou && busca !==''"  @click="limparBusca()" class="input-group-text" id="basic-addon2"><i class="bi bi-x-lg"></i></span>
        <span v-else @click="buscar()" class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
      </div>

    </div>
    <div class="cards">
      <CardPessoa v-for="p in _pessoas" :key="p.id" :pessoa="p" @editar="editUser"></CardPessoa>
    </div>
  </main>
</template>


<style scoped>
.search{
  width: 300px;
  position: relative;
  left: 30%;
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
  justify-content: center;
}

.head {
  display: flex;
  flex-direction: row;
  justify-content: center;
  
}
.input-group-text{
  cursor: pointer
}
@media (max-width: 600px) {
  .search{
  width: 300px;
  position: relative;
  left: 10%;
  top: 8px;
}
}
</style>