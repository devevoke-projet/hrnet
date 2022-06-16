<template>
  <div class="card">
    <div class="post-title d-flex align-items-center">
      <div class="profile-thumb">
        <figure class="profile-thumb-middle">
          <img src="https://www.icone-png.com/png/54/53787.png" alt="" />
        </figure>
      </div>
      <div class="posted-autor">
        <h6 class="author">
          <a href="">{{ post.User.firstName }}</a>
        </h6>
        <span class="post-time"
          >le {{ dateFormat(post.createdAt) }} à
          {{ hourFormat(post.createdAt) }}</span
        >
      </div>
      <div
        v-if="post.user_id == userStore || isAdmin"
        class="post-settings-bar"
      >
        <span></span>
        <span></span>
        <span></span>
        <div class="post-settings arrow-shape">
          <ul>
            <li>
              <button
                v-if="post.user_id == userStore"
                class="dropdown-item"
                @click.prevent="modifyPost()"
              >
                Modifier
              </button>
            </li>
            <li>
              <button class="dropdown-item" @click.prevent="deletePost()">
                Supprimer
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="post-content">
      <p class="post-desc">
        {{ post.content }}
      </p>
      <div v-if="post.image" class="post-thumb-gallery">
        <figure class="post-thumb img-popup">
          <img :src="post.image" alt="" />
        </figure>
      </div>
      <!-- Like -->
      <div class="post-meta">
        <button class="post-metta-like" @click="postLike">
          <div class="heart">
            <i class="far fa-heart heart noLike icone_size"></i>
            <i class="fas fa-heart heart like icone_size"></i>
          </div>
        </button>
        <ul class="comment-share-meta">
          <li>
            <button @click.prevent="toggleComments">
              <i class="fab fa-rocketchat mr-1 icone_size"></i>
              <span class="number_comment" v-if="post.Comments.length != 0"
                >{{ post.Comments.length }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- debut -->
    <div>
      <div>
        <form method="post">
          <div class="container">
            <div>
              <p>{{ post.Comments.content }}</p>

              <article v-if="isDisplay">
                <div
                  v-bind:key="index"
                  v-for="(comment, index) in post.Comments"
                  class="comment m-2"
                >
                  <p class="container d-flex justify-content-between pl-0">
                    <span
                      >écrit par <b>{{ comment.User.firstName }} </b> le
                      {{ dateFormat(comment.createdAt) }} à
                      {{ hourFormat(comment.createdAt) }}</span
                    >
                    <button
                      v-if="comment.user_id == userStore || isAdmin"
                      @click.prevent="deleteComment(index)"
                      class="btn comment_delete"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </p>
                  <p>
                    <b> {{ comment.content }}</b>
                  </p>
                </div>
                <div class="container_up_comment">
                  <button
                    v-if="post.Comments.length"
                    v-on:click="toggleComments"
                    class="btn up_comment"
                  >
                    <i class="fas fa-chevron-circle-up"></i>
                  </button>
                </div>
              </article>
            </div>
          </div>
          <div
            class="row justify-content-around align-items-center comment_bloc"
          >
            <!-- <img
            v-if="user.image"
            :src="user.image"
            alt="image de l'utilisateur"
            class="rounded-circle m-2"
          />
          <img
            v-else
            src="https://www.icone-png.com/png/54/53787.png"
            alt="..."
        
          /> -->
            <input
              type="text"
              v-model="commentaire"
              class="form-control m-3 col-md-8"
              aria-label="commenter"
              placeholder="Ecrire un commentaire"
            />
            <div>
              <button
                type="submit"
                class="btn btn-danger p-2 btn_send_coment"
                @click.prevent="sendComment"
              >
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
          <Transition name="fade">
            <p v-if="sendComment" class="text-center text-danger alert_text">
              {{ alert }}
            </p>
          </Transition>
        </form>
      </div>
    </div>
    <!-- Fin -->
  </div>

  <!-- restructurer -->
</template>
<script>
//Import
import { instance } from "@/store";
import { mapState } from "vuex";

//Export
export default {
  name: "Post",
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isAdmin: true,
      userStore: this.$store.state.user.userId,
      id_param: this.post.id,
      commentaire: "",
      isDisplay: false,
      alert: "",
      countLikes: 0,
    };
  },
  mounted: function () {
    this.userStore = this.$store.state.user.userId;
    this.isAdmin = this.$store.state.user.isAdmin;
  },
  methods: {
    postLike() {
      switch (this.countLikes) {
        case 0:
          this.countLikes++;
          document.querySelector(".like").style = "color : #dc4734";
          break;
        case 1:
          this.countLikes--;
          document.querySelector(".like").style = "color : transparent";
      }
    },
    modifyPost() {
      this.$router.push(`/modifypost/${this.id_param}`);
    },

    toggleComments() {
      this.isDisplay = !this.isDisplay;
    },

    async sendComment() {
      if (this.commentaire !== "") {
        await this.$store.dispatch("createComment", {
          content: this.commentaire,
          post_id: this.post.id,
        });
        this.commentaire = "";
        this.alert = "";
        // Envois le nouveau commentaire
        this.$emit("comment-created");
      } else {
        this.alert = "Veuillez remplir les champs";
      }
    },

    dateFormat: function (createdDate) {
      const date = new Date(createdDate);
      const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      };
      return date.toLocaleDateString("fr-FR", options);
    },

    hourFormat(createdHour) {
      const hour = new Date(createdHour);
      const options = { hour: "numeric", minute: "numeric", second: "numeric" };
      return hour.toLocaleTimeString("fr-FR", options);
    },

    async deletePost() {
      const token = this.$store.state.user.token;
      try {
        if (confirm("Voulez-vous vraiment supprimer le post") == true) {
          instance.defaults.headers.common["Authorization"] = "Bearer " + token;
          await instance.delete(`/posts/${this.id_param}`);
          alert("La suppression du post est bien prise en compte");
          // EMIT DELETE POST
          this.$emit("post-delete", { post: this.post.id });
        }
      } catch (error) {
        alert("Vous ne pouvez pas supprimez ce post");
      }
    },

    async deleteComment(index) {
      const token = this.$store.state.user.token;
      try {
        instance.defaults.headers.common["Authorization"] = "Bearer " + token;
        if (confirm("Voulez-vous vraiment supprimer ce commentaire") == true) {
          await instance.delete(
            `/comments/delete/${this.post.Comments[index].id}`
          );
          alert("La suppression du commentaire est bien prise en compte");
          // EMIT DELETE POST
          this.$emit("comment-delete");
        }
      } catch (error) {
        alert("Vous ne pouvez pas supprimez ce commentaire");
      }
    },
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.icone_size {
  font-size: 1.8em;
}
.like {
  color: transparent;
}
.noLike {
  color: #dc4734;
  z-index: 10000;
}
.heart {
  position: absolute;
  display: flex;
  align-items: center;
}
.btn_send_coment {
  background-color: #dc4734;
}
.container_up_comment {
  display: flex;
  justify-content: center;
}
.up_comment {
  color: #dc4734;
  padding-right: 18px;
}
.comment_delete {
  color: #dc4734;
}
.like {
  /* color: blue; */
  background-color: transparent;
}
.container_commente {
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  width: 540px;
  background: white;

  padding: 32px;
}
::selection {
  color: #fff;
  background: #dc4734;
}
.post-settings li button {
  color: #333333;
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  text-transform: capitalize;
}
.post-settings li {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.post-settings-bar:hover .post-settings {
  opacity: 1;
  visibility: visible;
  -webkit-transform: translateY(20px);
  -ms-transform: translateY(20px);
  transform: translateY(20px);
}
.post-settings {
  right: 0;
  top: 100%;
  width: 200px;
  background-color: #fff;
  position: absolute;
  padding: 20px;
  z-index: 9;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  -webkit-box-shadow: 0px 1px 15px 0px rgb(51 51 51 / 20%);
  box-shadow: 0px 1px 15px 0px rgb(51 51 51 / 20%);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  -webkit-transform: translateY(30px);
  -ms-transform: translateY(30px);
  transform: translateY(30px);
}
.arrow-shape:before {
  right: 10px;
  bottom: 100%;
  content: "";
  position: absolute;
  height: 20px;
  border-bottom: 20px solid #fff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
ul {
  margin: 0;
}
li {
  list-style-type: none;
}
button {
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  background-color: transparent;
}
.post-meta {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 12px;
  margin-top: 20px;
  justify-content: space-between;
}
.post-thumb-gallery {
  border-radius: 5px;
  overflow: hidden;
}
.post-desc {
  padding-bottom: 16px;
}
.post-content {
  padding-top: 18px;
}
.post-settings-bar span {
  width: 20px;
  height: 1px;
  display: block;
  background-color: #ccc;
  margin-bottom: 4px;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}
.post-settings-bar {
  margin-left: auto;
  position: relative;
  cursor: pointer;
}
.posted-author .post-time {
  display: block;
  font-size: 14px;
  line-height: 1;
  padding-top: 10px;
}
.author {
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  text-transform: capitalize;
}
.posted-author {
  margin-left: 20px;
}
img {
  max-width: 100%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}
.profile-thumb-middle {
  width: 45px;
  height: 45px;
  display: block;
  border-radius: 50%;
  overflow: hidden;
}
.profile-thumb {
  display: inline-block;
  position: relative;
}
.card {
  border: none;
  border-radius: 0;
  padding: 30px;
  margin-bottom: 30px;
  -webkit-box-shadow: 0px 1px 15px 0px rgb(51 51 51 / 20%);
  box-shadow: 0px 1px 15px 0px rgb(51 51 51 / 20%);
}
.comment_bloc {
  flex-wrap: nowrap;
}

.number_comment {
  font-size: 1.5em;
}
@media screen and (max-width: 439px) {
  .comment_bloc {
    margin-right: 0px;
  }
}
</style>
