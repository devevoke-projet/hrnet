<template>
  <div id="wall" class="wall">
    <CreatePost />
    <article v-if="allPosts.length == 0" class="row justify-content-center">
      <p><b>Désolé il n'y a aucune publication pour le moment...</b></p>
    </article>
    <Post
      v-for="post in allPosts"
      v-bind:key="post.id"
      :post="post"
      @comment-created="loadPosts"
      @post-delete="loadPosts"
      @comment-delete="loadPosts"
      @post-modify="loadPosts"
    />
  </div>
</template>

<script>
//Import
import CreatePost from "../components/CreatePost.vue";
import Post from "../components/Post.vue";
import { mapState } from "vuex";
// import { instance } from "@/store";

//Export
export default {
  name: "Wall",
  components: {
    CreatePost,
    Post,
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
        image: "",
      },
    };
  },
  computed: {
    ...mapState({
      allPosts: "posts",
    }),
  },
  methods: {
    loadPosts() {
      this.$store.dispatch("getAllPosts");
    },

  },
  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    // Chargement du post dans le dom
    this.loadPosts();
  },
};
</script>
<style lang="scss">
.wall {
  min-height: 100%;
  padding: 5rem 0 2rem 0;
}
.block-post {
  background-color: white;
  width: 75%;
  margin: auto;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  & h3 {
    color: grey;
    margin: 0.25rem 0;
    font-size: 0.75rem;
  }
  & .like-section {
    & div {
      display: inline-block;
      margin: 0 0.5rem;
      & i {
        margin: 0 0.2rem;
      }
      & a {
        text-decoration: none;
        color: grey;
      }
    }
    font-weight: 700;
    color: grey;
  }
}
</style>
