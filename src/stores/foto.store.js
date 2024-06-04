import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";
import { useAlertStore } from "@/stores";
import {useLoadStore} from "@/stores"


const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const fotoStore = defineStore({
  id: "foto",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
  }),
  actions: {
    async getFoto(_id) {
      const alertStore = useAlertStore();
        const resp =  await fetchWrapper.get(`${baseUrl}foto/download/${_id}`)
        alertStore.success(this.sucesso);
        return resp
    },
    async salvarFoto(id, imagem) {
      const alertStore = useAlertStore();
      try { 
        const resp = await requestFormData(`${baseUrl}foto/upload/${id}`, imagem)
        alertStore.success(this.sucesso);
        return resp
      } catch (error) {
        alertStore.error(this.error);
      }
    },
  },
});
