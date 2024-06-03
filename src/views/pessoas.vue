<script setup>
import { storeToRefs } from "pinia";
import { toRaw } from 'vue'
import { router } from '@/router';
import { pessoasStore, contatoStore } from "@/stores";
import CardPessoa from "./../components/card/card-pessoa.vue";
const pStore = pessoasStore();
const cStore = contatoStore();
let { pessoas } = storeToRefs(pStore);
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
  router.push({path:`/pessoas/cadastro/${e.id}`})
}
function addContato(e){
   router.push({path: `/contato/cadastro/${e.id}`})
  // router.push({name:'cadastroId' ,params: {id: e.id}})
  // cStore.salvarContato(e);
}
</script>

<template>
  <main class="container">
    <div class="head">
      <div class="titulo">
              <h1>Pessoas</h1>
      <router-link to="pessoas/cadastro/0" class="btn btn-sm btn-success mb-2"
        ><i class="bi bi-plus-circle"></i> Novo</router-link>

      </div>

        <div class="search input-group mb-3">
        <input type="text" v-on:keyup.enter="buscar()" v-model="busca" class="form-control" placeholder="Nome" aria-label="Nome"
          aria-describedby="basic-addon1">
          <span v-if="buscou && busca !==''"  @click="limparBusca()" class="input-group-text" id="basic-addon2"><i class="bi bi-x-lg"></i></span>
        <span v-else @click="buscar()" class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
      </div>



    </div>
    <div class="cards">
      <CardPessoa v-for="p in _pessoas" :key="p.id" :pessoa="p" @editar="editUser" :add="true" @addContato="addContato"></CardPessoa>
    </div>
  </main>
</template>


<style scoped>
.titulo{
  display: flex;
  width: 100%;
  justify-content: center;
}
.search{
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
@media (max-width: 500px) {
  .search{
  width: 300px;
  position: relative;
  left: 0px;
  top: 8px;
}

}
@media (max-width: 800px) {
  .head{
    flex-wrap: wrap;
  }
h1{
  position: relative;
}
}
</style>