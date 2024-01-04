import axios from 'axios';
import { defineStore } from 'pinia';

export const usePostStore = defineStore("posts", {
    state : () => ({
        title : null,
        description : null,
        edit_id : null,
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

           if(this.edit_id > 0){
            axios.post('api/post/update/'+this.edit_id, formData).then(res => {
                this.fromReset();
                this.featchPostItems();
            })
            .catch(er => console.log(er));
           }else {
            axios.post('api/post/store', formData).then(res => {
                this.fromReset();
                this.featchPostItems();
            })
            .catch(er => console.log(er));
           }
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
        editPostItem(id){
            let post = this.posts.find(editPost => editPost.id == id);
            this.title = post.title;
            this.description = post.description;
            this.edit_id = post.id

        },
        deletePostItem(id){
            axios.get('api/post/delete/'+id).then(res => {
                this.featchPostItems();
            })
        },
        fromReset() {
            this.title = null;
            this.description = null;
            this.edit_id = null
        }
    }
});