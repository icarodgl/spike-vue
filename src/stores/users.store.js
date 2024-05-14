import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = 'https://demometaway.vps-kinghost.net:8485/api/'


export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: [],
        favoritos:[],
        user: {}
    }),
    actions: {
        async register(user) {
            await fetchWrapper.post(`${baseUrl}/salvar`, user);
        },
        async getAll() {
            this.users = { loading: true };
            const authStore = useAuthStore();
            try {
                this.users = await fetchWrapper.get(`${baseUrl}contato/listar/${authStore.user.id}`);    
            } catch (error) {
                this.users = { error };
            }
        },
        async getfavoritos() {
            try {
                this.favoritos = await fetchWrapper.get(`${baseUrl}favorito/pesquisar`);  
            } catch (error) {
                this.users = { error };
            }
        },
        async favoritar(user) {
            try {
                await fetchWrapper.post(`${baseUrl}favorito/salvar`, user);  
                await fetchWrapper.delete(`${baseUrl}contato/remover/${user.id}`);  
            } catch (error) {
                this.users = { error };
            }
        },
        async desfavoritar(user) {
            try {
                await fetchWrapper.post(`${baseUrl}contato/salvar`, user); 
                await fetchWrapper.delete(`${baseUrl}favorito/remover/${user.id}`); 
            } catch (error) {
                this.users = { error };
            }
        },
        async addContato(user) {
            try {
                await fetchWrapper.post(`${baseUrl}contato/salvar`, user);  
            } catch (error) {
                this.users = { error };
            }
  
        },
        async removeContato(user) {
            try {
                await fetchWrapper.delete(`${baseUrl}contato/remover/${user.id}`);  
            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id) {
            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});
