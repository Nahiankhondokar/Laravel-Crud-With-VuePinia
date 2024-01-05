<template lang="">
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-8">
                    <div class="row">
                        <div
                            class="col-md-6 mb-3"
                            v-for="post in posts"
                            :key="post.id"
                        >
                            <div class="card" v-if="post">
                                <img
                                    class="card-img-top"
                                    :src="`images/` + post.image"
                                    alt="Card image cap"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">{{ post.title }}</h5>
                                    <p class="card-text">
                                        {{ post.description }}
                                    </p>
                                    <small>{{ post.created_at }}</small>
                                </div>
                                <button
                                    class="btn btn-sm btn-info"
                                    @click="editPostItem(post.id)"
                                >
                                    Edit
                                </button>
                                <button
                                    class="btn btn-sm btn-danger"
                                    @click="deletePostItem(post.id)"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div v-if="posts == ''">
                            <h3 class="text-center text-danger">No Data</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <form @submit.prevent="addPostItem">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input
                                type="text"
                                class="form-control"
                                id="title"
                                aria-describedby="emailHelp"
                                placeholder="Title"
                                v-model="title"
                            />
                            <small id="emailHelp" class="form-text text-muted"
                                >We'll never share your email with anyone
                                else.</small
                            >
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1"
                                >Descrption</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputPassword1"
                                placeholder="Descrption"
                                v-model="description"
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Image</label>
                            <input
                                type="file"
                                class="form-control"
                                @change="imageUpload"
                            />
                        </div>
                        <button type="submit" class="btn btn-primary">
                            {{ edit_id ? "Update" : "Save" }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePostStore } from "../../store/Post/usePostStore";

// get all state value
const { title, description, posts, edit_id } = storeToRefs(usePostStore());

// get all actions
const {
    addPostItem,
    featchPostItems,
    editPostItem,
    deletePostItem,
    imageUpload,
} = usePostStore();
featchPostItems();
</script>

<style lang=""></style>
