<script setup>
import { ref } from 'vue'
const props = defineProps(['dado'])
const emits = defineEmits(['upload'])
const img = ref(null)
let file = {file:{},base64:''};
let fileURL = props.dado;
let erro = ''
async function imageToURL(image) {
  if (image.type) {
    fileURL = URL.createObjectURL(image)
    img.value.src = fileURL
    img.value.alt = 'nova'
  }
  else {
    fileURL = ''
    img.value.src = ''
  }
}

function onFileChanged($event) {
  const target = $event.target;
  if (target && target.files) {
    file.file = target.files[0];
    const reader = new FileReader();
        reader.onloadend = () => {file.base64 = reader.result};
        reader.readAsDataURL(file.file);
    imageToURL(file.file)
  }
}
async function saveImage() {
  if (file.file?.type?.startsWith('image')) {
    emits('upload', file.file)
    erro = ''
  }
  erro = 'selecion uma imagem'
};

</script >
<template setup>
  <div class="formulario">
    <div class="image-upload form-group">
      <span v-show="erro!==''">{{erro}}</span>
      <picture>
        <img ref="img" id="prev_image" class="prev_image" :src="fileURL" alt="">
      </picture>
      <input type="file" @change="onFileChanged($event)" accept="image/*" capture />
      <button @click="saveImage">upload</button>
    </div>
  </div>
</template>
<style>
.prev_image {
  max-width: 200x;
  max-height: 200px;
}

.image-upload {
  display: flex;
  flex-direction: column;
}
</style>