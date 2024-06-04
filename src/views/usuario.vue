<script setup>
import { storeToRefs } from "pinia";
import { router } from '@/router';
import { usuarioStore } from "@/stores";
import CardUser from "./../components/card/card-user.vue";
const uStore = usuarioStore();
const { usuarios } = storeToRefs(uStore);
let busca = ""
let buscou = false
await uStore.getAll()

async function buscar() {
  uStore.pesquisar(busca)
  buscou = true
}
async function limparBusca() {
  uStore.getAll()
  busca = ""
  buscou = false
}
function editUser(e) {
  router.push({name:'Novo Cadastro id', params:{id:e.id}})
}
</script>

<template>
  <main class="container">
    <div class="head">
      <h1>Usuários</h1>
      <router-link to="/usuario/cadastro/0" class="btn btn-sm btn-success mb-2"><i class="bi bi-plus-circle"></i> Novo</router-link>
      <div class="search input-group mb-3">
        <input type="text" v-on:keyup.enter="buscar()" v-model="busca" class="form-control" placeholder="Nome"
          aria-label="Nome" aria-describedby="basic-addon1">
        <span v-if="buscou && busca !== ''" @click="limparBusca()" class="input-group-text" id="basic-addon2"><i
            class="bi bi-x-lg"></i></span>
        <span v-else @click="buscar()" class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
      </div>

    </div>
    <div class="cards">
      <CardUser v-for="u in usuarios" :key="u.id" :user="u" @editar="editUser"></CardUser>
    </div>
  </main>
</template>


<style scoped>
.search {
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
}

.head {
  display: flex;
  flex-direction: row;
  justify-content: center;

}

.input-group-text {
  cursor: pointer
}

h1 {
  position: absolute;
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