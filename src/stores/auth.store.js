import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';

//const baseUrl = `${import.meta.env.API_URL}/auth`;
const baseUrl = 'https://demometaway.vps-kinghost.net:8485/api/'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}auth/login`, { username, password });    

                // update pinia state
                this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                useAlertStore.error(error);                
            }
        },
        isAdmin(){
            return this.user?.tipos?.some(x=> x == 'ROLE_ADMIN')
        }
        ,
        logout() {
            localStorage.removeItem('user');
            this.user = null;
            router.push({name:'login'})
        }
    }
});
