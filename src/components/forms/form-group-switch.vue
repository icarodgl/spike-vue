<script setup>
const props = defineProps(["name", "errors", "dado"]);
defineEmits(["change"]);
</script>

<template>
  <div class="form-group">
    <div class="form-check form-switch">
      <input class="form-check-input" :value="dado" type="checkbox" @input="$emit('change', $event.target.value)"
        role="switch" id="flexSwitchCheckDefault">
      <label class="form-check-label" for="flexSwitchCheckDefault">{{ name }}</label>
    </div>
    <div class="invalid-feedback">{{ (errors[name]|| '') }}</div>
  </div>
</template>

<style>


.form-group {
  display: flex;
  flex-direction: column;
}
</style>