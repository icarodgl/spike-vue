import { defineStore } from "pinia";
import { fetchWrapper,requestFormData } from "@/helpers";
import { useAlertStore } from "@/stores";
import { useLoadStore } from "@/stores";

const baseUrl = "https://demometaway.vps-kinghost.net:8485/api/";

export const fotoStore = defineStore({
  id: "foto",
  state: () => ({
    sucesso: "Operação realizada com sucesso.",
    error: "Registro não pode ser atualizado.",
  }),
  actions: {
    async getFoto(_id) {
      const resp = await fetchWrapper.get(`${baseUrl}foto/download/${_id}`);
      useAlertStore.success(this.sucesso);
      return resp;
    },
    async salvarFoto(id, imagem) {
      useLoadStore.show();
      try {
        const resp = await requestFormData(
          `${baseUrl}foto/upload/${id}`,
          imagem
        );
        useAlertStore.success(this.sucesso);
        return resp;
      } catch (error) {
        console.log(error);
        useAlertStore.error(this.error);
      }finally
      {
        useLoadStore.close();
      }
      
    },
  },
});
