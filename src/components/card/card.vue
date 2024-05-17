<script setup>
import { router } from '@/router';
import { contatoStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";
import { usersStore } from "@/stores";

const usersS = usersStore();

defineProps(['user','favorito'])

async function favoritar(user){
  await usersS.favoritar(user)
  update()
}
async function desfavoritar(user){
   await usersS.desfavoritar(user)
  update()
}

async function editUser(user){
  contatoStore.setContato(user)
  router.push(`/cadastro/${user.id}`)
}

async function novoContato(){
  contatoStore.newContato()
  router.push('/cadastro/0')
}

async function update(){
    usersS.getAll();
    usersS.getfavoritos() 
}
</script>

<template>
    <div class="card">
        <div class="head">
            <div class="head_info">
                <div class=" tag">{{ user.id }} {{ user.tipoContato }} - {{ user.tag }}</div>
                <div class="nome">{{ user.pessoa?.nome }}</div>
            </div>
            <div class="head_actions">
                <div class="btn_acoes">
                    <i @click="editUser(user)" class="bi bi-pencil-square"></i>
                    <i @click="usersStore.removeContato(user)" class="bi bi-trash"></i>

                    <i v-if="favorito" @click="desfavoritar(user)" class="bi bi-star-fill"></i>
                    <i v-else @click="favoritar(user)" class="bi bi-star"></i>
                </div>
                <div class="privado">
                    <i v-if="user.privado" class="bi bi-lock-fill"></i>
                    <i v-else class="bi bi-lock"></i>
                </div>
            </div>
        </div>
        <div class="email">email: {{ user.email }}</div>
        <div class="telefone">Telefone: {{ user.telefone }}</div>
        <div class="cpf">CPF: {{ user.pessoa?.cpf }}</div>
    </div>
</template>

<style scoped>
.bi {
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
.card{
    padding: 10px;
    margin: 5px;
    min-width: 300px;
}
.btn_acoes{
    display: flex;
    justify-content: space-around;
  }
.head{
    display: flex;
    justify-content: space-between;
}
.head_actions{
    display: flex;
}
</style>