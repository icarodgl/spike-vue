
<script setup>
// https://vuejs-tips.github.io/vue-the-mask/
import { Field } from 'vee-validate';
const props = defineProps(['name','validations','errors','mascara', 'dado'])
defineEmits(['change'])

const maskConfig = {
    telefone: ['(##) ####-####', '(##) #####-####'],
    cpf:  '###.###.###-##',
    cep:'########',
    data: '##/##/####',
    numero: '#####'
}
</script>


<template>
    <div class="form-group">
        <label>{{name}}</label>
        <Field 
        class="form-control" 
        type="text" 
        v-mask="maskConfig[mascara]"
        :name="name" 
        :value="dado"
        :class="{ 'is-invalid': !!errors[name] }" 
        @input="$emit('change',$event.target.value)"
        />
    <div class="invalid-feedback">{{ errors[name] }}</div>
    </div>
</template>

<style>
.hidden{
    display: none;
}
</style>