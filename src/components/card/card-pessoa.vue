<script setup>
import { pessoasStore, fotoStore } from "@/stores";
const pStore = pessoasStore();
const poStore = fotoStore()
const props = defineProps(['pessoa', 'favorito', 'pushTo', 'add'])
const emit = defineEmits(['editar', 'addContato'])
let foto;
await updateFoto()
async function updateFoto() {
    foto = await poStore.getFoto(props.pessoa.id)
}
async function edit(pessoa) {
    pStore.setPessoa(pessoa)
    emit('editar', pessoa)
}

async function update() {
    pStore.getAll();
}
async function remover(pessoa) {
    await pStore.remover(pessoa)
    update()
}
function adicionarContato(pessoa) {
    emit('addContato', pessoa)
}
</script>

<template>
    <div class="card">
        <div class="foto">
            <picture>
                <img class="img-thumbnail" v-if="foto" :src="foto" :alt="pessoa.foto?.nome" style="width:auto;">
                <img class="img-thumbnail" v-else srcset="@/assets/imagens/image.png" alt="foto padrão"
                    style="width:auto;">
            </picture>
        </div>
        <div class="head">
            <div class="head_info">
                <div class="nome">{{ pessoa.nome }}</div>
            </div>
            <div class="head_actions">
                <div class="btn_acoes">
                    <i @click="edit(pessoa)" class="bi bi-pencil-square"></i>
                    <i @click="remover(pessoa)" class="bi bi-trash"></i>
                    <i v-if="add" @click="adicionarContato(pessoa)" class="bi bi-person-plus"></i>
                </div>
            </div>
        </div>
        <div v-if="pessoa.email" class="email">Email: {{ pessoa.email }}</div>
        <div v-if="pessoa.cpf" class="cpf">CPF: {{ pessoa.cpf }}</div>
        <div v-if="pessoa.endereco.logradouro ||pessoa.endereco.bairro || pessoa.endereco.cidade || pessoa.endereco.estado" class="endereco">
            Endereço:
            <span v-if="pessoa.endereco.logradouro">{{ pessoa.endereco.logradouro }}, </span>
            <span v-if="pessoa.endereco.numero">{{ pessoa.endereco.numero }},</span>
            <span v-if="pessoa.endereco.bairro">{{ pessoa.endereco.bairro }}</span>
            <span v-if="pessoa.endereco.cidade">, {{ pessoa.endereco.cidade }}</span>
            <span v-if="pessoa.endereco.estado">/{{ pessoa.endereco.estado }}</span>
        </div>
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
}

.bi {
    cursor: pointer;
    display: flex;
    justify-content: center;
}

.card {
    padding: 10px;
    margin: 5px;
    width: 300px;
}

.btn_acoes {
    display: flex;
    justify-content: space-around;
}

.head {
    display: flex;
    justify-content: space-between;
}

.head_actions {
    display: flex;
    position: absolute;
    top: 10px;
    right: 5px;
}
</style>