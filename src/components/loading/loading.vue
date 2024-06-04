<script setup>
</script>

<template>
    <div class="loading">
        <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
</template>

<style>
.loading {
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    background-color: var(--color-background);
}

.spinner-border {
    color: rgb(255, 255, 255);
    height: 100px;
    width: 100px;
    position: absolute;
    top: 100px;
}
</style>