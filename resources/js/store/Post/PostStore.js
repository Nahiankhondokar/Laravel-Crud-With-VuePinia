import { defineStore } from 'pinia';

export const usePostStore = defineStore("posts", {
    state : () => {
        posts : [];
        loader : false;
    }, 
    getters : {

    },
    actions : {

    }
});