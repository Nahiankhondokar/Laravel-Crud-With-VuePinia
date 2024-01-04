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
                this.title = null;
                this.description = null;
                this.featchPostItems();

                console.log(res.data);
            })
            .catch(er => console.log(er));
        },
        async featchPostItems(){
            this.posts = [];
            try{
                let posts = await axios.get('api/post/index');
                this.posts = posts.data;
            }catch(error){
                console.log(error);
            }finally{
                // loader
            }
        },
        editPostItem(){

        },
        deletePostItem(){

        }
    }
});