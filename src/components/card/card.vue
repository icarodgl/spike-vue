<script setup>
import { router } from '@/router';
import { contatoStore, fotoStore } from "@/stores";

const contatoS = contatoStore();
const pStore = fotoStore()
const props = defineProps(['user','favorito','pushTo'])

let foto;
await updateFoto()
async function updateFoto() {
    foto = await pStore.getFoto(props.user?.pessoa?.id)
}
async function favoritar(user){
  await contatoS.favoritar(user)
  update()
}
async function desfavoritar(user){
   await contatoS.desfavoritar(user)
  update()
}

async function editUser(user){
  router.push({path:`/contato/cadastro/${user.id}`})
}

async function update(){
    contatoS.getAll();
    contatoS.getfavoritos() 
}
async function remover(user){
    if (props.favorito){
       await contatoS.removeFavorito(user)
    }else{
        await contatoS.removeContato(user)
    }
    update()
}
</script>

<template>
    <div class="card">
        <div class="foto">
            <picture>
                <img class="img-thumbnail" v-if="foto" :src="foto" :alt="user.pessoa.foto?.nome" style="width:auto;">
                <img class="img-thumbnail" v-else srcset="@/assets/imagens/image.png" alt="foto padrão" style="width:auto;">
            </picture>
        </div>
        <div class="head">
            <div class="head_info">
                <div class=" tag">{{ user.id }} {{ user.tipoContato }} - {{ user.tag }}</div>
                <div class="nome">{{ user.pessoa?.nome }}</div>
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
        <div class="email">email: {{ user.email || user.pessoa.email}}</div>
        <div class="telefone">Telefone: {{ user.telefone }}</div>
        <div class="cpf">CPF: {{ user.pessoa?.cpf }}</div>
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