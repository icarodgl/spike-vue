<script setup>
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink to="/">home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="'/usuario/cadastro/'+authStore.user.id">Meu cadastro</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/usuario">Usuários</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/pessoas">Pessoas</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/contatos">Contatos</RouterLink>
        </li>
        <li class="nav-item"><a class="router-link-active router-link-exact-active"
            @click="authStore.logout()">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
  
</style>
