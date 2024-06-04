<script setup>
import { RouterView } from 'vue-router'
import navBar from './components/navbar/navbar.vue'
import Alert  from './components/alert/Alert.vue';
import loading from './components/loading/loading.vue'
import {useLoadStore} from "@/stores"

</script>

<template>
  <header>
      <navBar v-if="$route.name != 'login'"/>
      <Alert></Alert>
  </header>
  <Suspense>
    <main>
      <loading v-if="useLoadStore.isLoading"></loading>
      <RouterView/>
    </main>

  <template #fallback>
    <span class="spinner-border spinner-border-lg align-center"></span>
  </template>
</Suspense>
</template>
