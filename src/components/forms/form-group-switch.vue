<script setup>
const props = defineProps(["name", "errors", "dado"]);
defineEmits(["change"]);
</script>

<template>
  <div class="form-group">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" @change="$emit('change', $event.target.checked)"
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