<script setup>
import { router } from '@/router';
import { pessoasStore } from "@/stores";
const pStore = pessoasStore();

const props = defineProps(['pessoa','favorito','pushTo'])
const emit = defineEmits(['editar'])


async function edit(pessoa){
    pStore.setPessoa(pessoa)
    emit('editar',pessoa)
}

async function update(){
    pStore.getAll();
}
async function remover(pessoa){
    await pStore.remover(pessoa)
    update()
}
</script>

<template>
    <div class="card">
        <div class="foto">
            <picture>
                <source media="(min-width:650px)" srcset="@/assets/imagens/image.png" alt="imagem de perfil padrão">
                <img :src="`https://demometaway.vps-kinghost.net:8485/api/${pessoa.foto.id}`" :alt="pessoa.foto.nome" style="width:auto;">
            </picture>
        </div>
        <div class="head">
            <div class="head_info">
                <div class="nome">{{ pessoa.id }} - {{ pessoa.nome }}</div>
            </div>
            <div class="head_actions">
                <div class="btn_acoes">
                    <i @click="edit(pessoa)" class="bi bi-pencil-square"></i>

                    <i @click="remover(pessoa)" class="bi bi-trash"></i>
                </div>
            </div>
        </div>
        <div class="cpf">CPF: {{ pessoa.cpf }}</div>
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