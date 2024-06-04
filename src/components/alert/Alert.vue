<script setup>
import { useAlertStore } from '@/stores';

</script>

<template>
    <div v-if="useAlertStore.isActive" class="base">
        <div class="m-3">
            <div class="alert alert-dismissable" :class="useAlertStore.alert.type">
                <button @click="useAlertStore.clear()" class="btn btn-link close"><i class="bi bi-x-square-fill"></i></button>
                {{useAlertStore.alert.message}}
            </div>
        </div>
    </div>
</template>

<style>
.alert{
    position: fixed;
    bottom: 10px;
    right: 20px;
    min-width: 300px;
    padding: 0px 0px;
    margin: 0px 0px;
}
.base{
    z-index: 999;
    position: absolute;
}
.bi-x-square-fill{
    color: rgb(0, 0, 0);
}
</style>