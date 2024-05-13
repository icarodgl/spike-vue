<script setup>
import { RouterView } from 'vue-router'
import navBar from './components/navbar/navbar.vue'
</script>

<template>
  <header>
      <navBar v-if="$route.name != 'login'"/>
  </header>
  <RouterView />
</template>
