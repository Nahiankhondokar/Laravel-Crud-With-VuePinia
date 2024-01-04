import axios from 'axios';
import { defineStore } from 'pinia';

export const usePostStore = defineStore("posts", {
    state : () => ({
        title : null,
        description : null,
        posts : [],
        loader : false,
    }), 
    getters : {

    },
    actions : {
        addPostItem(){
            let formData = {
                title : this.title,
                description : this.description
            }

            axios.post('api/post/store', formData).then(res => {
                console.log(res.data);
            })
            .catch(er => console.log(er));
        },
        featchPostItems(){
            
        },
        editPostItem(){

        },
        deletePostItem(){

        }
    }
});