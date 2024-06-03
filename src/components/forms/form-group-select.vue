
<script setup>
const props = defineProps(["name", "errors", "dado", "options"]);
defineEmits(["change"]);
</script>

<template>
  <div class="form-group">
    <label>{{ name }}</label>

    <select class="select"
      :value="dado"
      @input="$emit('change', $event.target.value)"
    >
      <option disabled value="">Selecione</option>
      <option v-for="(item, index) in options" :key="index">{{ item }}</option>
    </select>
    <div class="invalid-feedback">{{ errors[name] }}</div>
  </div>
</template>

<style>
.select{
    height: 34px;
}
.form-group{
    display: flex;
    flex-direction: column;
}
</style>