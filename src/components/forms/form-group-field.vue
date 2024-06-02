
<script setup>
import { Field } from 'vee-validate';
const props = defineProps(['name','validations','errors', 'dado'])
defineEmits(['change'])

let isPass = true
function showPass(){
    isPass = !isPass
}

</script>


<template>
    <div class="form-group">
        <label>{{name}}</label>
        <div class="grupo">
        <Field 
        class="form-control"  
        :type="name=='password' && isPass? 'password': 'text'"
        :name="name" 
        :value="dado"
        :class="{ 'is-invalid': !!errors[name], 'is-password': name==='password' }" 
        @input="$emit('change',$event.target.value)"
        />
        <!-- <i v-if="name=='password' && isPass" @click="showPass()" class="bi bi-eye"></i>
        <i v-if="name=='password' && !isPass" @click="showPass()" class="bi bi-eye-slash"></i> -->
    </div>
    <div class="invalid-feedback">{{ errors[name] }}</div>
    </div>
</template>

<style>
/* .is-password{
    width: 90%;
} */
.grupo{
    display: flex;
    align-items: center;
}
.bi-eye, .bi-eye-slash{
    cursor: pointer;
    margin: 0px 20px;
}
</style>