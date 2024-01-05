import axios from 'axios';
import { defineStore } from 'pinia';

export const usePostStore = defineStore("posts", {
    state : () => ({
        title : null,
        description : null,
        image : null,
        edit_id : null,
        posts : [],
        loader : false,
    }), 
    getters : {

    },
    actions : {
        addPostItem(){
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('image', this.image);

            let config = {
                header : {
                    'Content-type'  : 'image/png'
                }
            }

           if(this.edit_id > 0){
            axios.post('api/post/update/'+this.edit_id, formData, config).then(res => {
                this.fromReset();
                this.featchPostItems();
            })
            .catch(er => console.log(er));
           }else {
            axios.post('api/post/store', formData, config).then(res => {
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
                console.log(this.posts);
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
        imageUpload(event){
            this.image = event.target.files[0];
        },
        fromReset() {
            this.title = null;
            this.description = null;
            this.image = null;
            this.edit_id = null;
        }
    }
});