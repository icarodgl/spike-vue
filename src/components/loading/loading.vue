<script setup>
import { storeToRefs } from "pinia";
import {useLoadStore} from "@/stores"
const lStore = useLoadStore()
const {isLoading} = storeToRefs(lStore);
</script>

<template>
    <div v-if="isLoading" class="loading">
    <span  class="spinner-border spinner-border-lg align-center"></span>
    </div>
</template>

<style>
.loading{
    position: absolute;
    z-index: 99;
    background-color: #ffffff1a;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
}
.spinner-border{
    color: black;
    height: 100px;
    width: 100px;
}
</style>