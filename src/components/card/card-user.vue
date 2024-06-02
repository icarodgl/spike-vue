<script setup>
import { router } from '@/router';
import { usuarioStore } from "@/stores";

const usersS = usuarioStore();

const props = defineProps(['user','favorito','pushTo'])

async function editUser(user){
  router.push(`${props.pushTo}/usuario/cadastro/${user.id}`)
}


async function update(){
    usersS.getAll();
    usersS.getfavoritos() 
}
async function remover(user){
    if (props.favorito){
       await usersS.removeFavorito(user)
    }else{
        await usersS.removeContato(user)
    }
    update()
}
</script>

<template>
    <div class="card">
        <div class="head">
            <div class="head_info">
                <div class=" tag">{{ user.id }}</div>
                <div class="nome">{{ user.nome }}</div>
            </div>
            <div class="head_actions">
                <div class="btn_acoes">
                    <i @click="editUser(user)" class="bi bi-pencil-square"></i>

                    <i @click="remover(user)" class="bi bi-trash"></i>

                    <i v-if="favorito" @click="desfavoritar(user)" class="bi bi-star-fill"></i>
                    <i v-else @click="favoritar(user)" class="bi bi-star"></i>
                </div>
                <div class="privado">
                    <i v-if="user.privado" class="bi bi-lock-fill"></i>
                    <i v-else class="bi bi-lock"></i>
                </div>
            </div>
        </div>
        <div class="email">email: {{ user.email || user.email}}</div>
        <div class="telefone">Telefone: {{ user.telefone }}</div>
        <div class="cpf">CPF: {{ user.cpf }}</div>
    </div>
</template>

<style scoped>
picture>img {
    max-width: 200px;
    max-height: 200px
}

.foto {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
    margin-top: 15px;
}
.bi {
    cursor: pointer;
    display: flex;
    justify-content: center;
  }
.card{
    padding: 10px;
    margin: 5px;
    min-width: 300px;
    max-width: 20vw;
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
    position: absolute;
    top: 5px;
    right: 2px;
}
</style>