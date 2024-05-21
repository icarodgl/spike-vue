<script setup>
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <nav class="main-nav">
    <RouterLink to="/">home</RouterLink>
    <RouterLink to="/cadastro">Meu cadastro</RouterLink>
    <RouterLink to="/usuario">Usuários</RouterLink>
    <RouterLink to="/pessoas">Pessoas</RouterLink>
    <RouterLink to="/contatos">Contatos</RouterLink>
    <a
      class="router-link-active router-link-exact-active"
      @click="authStore.logout()"
      >Logout</a
    >
  </nav>
</template>

<style scoped>
.main-nav{
  display: flex;
  justify-content: end;
}
</style>
