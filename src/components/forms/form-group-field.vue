
<script setup>
import { Field } from 'vee-validate';
const props = defineProps(['name','validations','errors', 'dado'])
defineEmits(['change'])


</script>


<template>
    <div class="form-group">
        <label>{{name}}</label>
        <Field 
        class="form-control" 
        type="text"
        :name="name" 
        :value="dado"
        :class="{ 'is-invalid': errors[name] }" 
        @input="$emit('change',$event.target.value)"
        />
    <div class="invalid-feedback">{{ errors.nome }}</div>
    </div>
</template>

<style>

</style>