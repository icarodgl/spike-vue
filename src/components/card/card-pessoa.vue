<script setup>
import { pessoasStore } from "@/stores";
const pStore = pessoasStore();

const props = defineProps(['pessoa','favorito','pushTo'])
const emit = defineEmits(['editar'])
let foto;
await  updateFoto()
async function updateFoto(){
 foto = await pStore.getFoto(props.pessoa.id)


}
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
                <img v-if="foto" :src="foto":alt="pessoa.foto?.nome" style="width:auto;">
                <img v-else srcset="@/assets/imagens/image.png" alt="foto padrão" style="width:auto;">
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
picture > img{
    max-width: 200px;
    max-height: 200px
}
.foto{
    display: flex;
  justify-content: center;
  align-content: center;
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
  top: 10px;
  right: 5px;
}
</style>