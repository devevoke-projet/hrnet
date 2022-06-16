<template>
  <div>
    <div class="card card-small">
      <div class="share-box-inner">
        <div class="profile-thumb">
          <figure class="profile-thumb-middle">
            <img
              v-if="user.image"
              :src="user.image"
              alt="image de l'utilisateur"
              class="picture_profile"
            />
            <img
              v-else
              src="https://www.icone-png.com/png/54/53787.png"
              alt="..."
              class="picture_profile"
            />
          </figure>
        </div>

        <form class="share-text-box w-100" method="post">
          <textarea
            v-on:input="staticText"
            aria-label="contenue"
            class="share-text-field"
            v-model="content"
            placeholder="Quoi de neuf ?"
            rows="2"
            cols="60"
          >
          </textarea>
          <div class="btn_container">
            <button
              name="post"
              type="submit"
              class="btn-share"
              @click.prevent="createPost"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
            <button
              class="btn-share btn-image"
              name="image"
              @click.prevent="$refs.fileInput.click()"
            >
              <i class="fas fa-camera"></i>
            </button>
            <input
              aria-label="choisir une image"
              style="display: none"
              ref="fileInput"
              name="inputFile"
              id="inputFile"
              type="file"
              class="button"
              @change="onFileSelected"
            />
          </div>
        </form>
      </div>
      <transition class="text-center text-danger alert" name="fade">
        <p v-if="alert">{{ alert }}</p>
      </transition>
      <div class="view-picture" v-if="addPicturePost">
        <img :src="addPicturePost" alt="" class="picture_post" />
      </div>
    </div>
  </div>
</template>

<script>
//Import
import { mapState } from "vuex";

//Export
export default {
  name: "Create",
  data() {
    return {
      id: this.id,
      title: "",
      content: "",
      image: "",
      alert: null,
      visible: false,
      filesPicture: null,
      addPicturePost: null,
    };
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },

  methods: {
    //recuperer l'image selectionner
    onFileSelected(e) {
      this.filesPicture = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.filesPicture);
      reader.onload = (e) => {
        this.addPicturePost = e.target.result;
        const picturePost = e.target.result;
        localStorage.setItem("images", JSON.stringify(picturePost));
      };
      console.log(this.addPicturePost, "test");
    },
    createPost() {
      const formData = new FormData();
      formData.append("content", this.content);
      formData.append("title", this.title);
      if (this.filesPicture !== null) {
        formData.append("image", this.filesPicture);
      }
      //Verifie les champs est compléter
      if (this.content !== "") {
        this.$store.dispatch("createPost", formData);
        localStorage.removeItem("content");
        localStorage.removeItem("images");
        // Met a jour les champs a zero
        (this.title = ""),
          (this.content = ""),
          (this.filesPicture = ""),
          (this.addPicturePost = "");

        this.alert = "";
      } else {
        this.alert = "Veuillez remplir les champs";
      }
    },
    staticText(e) {
      const postContent = e.target.value;
      localStorage.setItem("content", JSON.stringify(postContent));
    },
  },
  mounted() {
    const localStorePost = localStorage.getItem("content");
    const localStorePostImage = localStorage.getItem("images");
    const parsePostImage = JSON.parse(localStorePostImage);
    const parsePost = JSON.parse(localStorePost);
    this.addPicturePost = parsePostImage;
    this.content = parsePost;
    this.$store.dispatch("getUserInfos");
  },
};
</script>

<style scoped lang="scss">
.btn_container {
  display: flex;
}
.picture_post {
  max-width: 100%;
  border-radius: 8px;
}
.view-picture {
  height: 10em;
  display: flex;
  justify-content: center;
  overflow: hidden;
}
.card-small {
  padding: 16px;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.card {
  border: none;
  border-radius: 0;
  padding: 30px;
  margin-bottom: 30px;
  -webkit-box-shadow: 0px 1px 15px 0px rgb(51 51 51 / 20%);
  box-shadow: 0px 1px 15px 0px rgb(51 51 51 / 20%);
}
.share-box-inner {
  display: flex;
  align-items: center;
}
.picture_profile {
  max-width: 100%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  height: 45px;
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
.share-text-box {
  position: relative;
  padding-left: 15px;
  .share-text-field {
    width: 100%;
    border: none;
    display: block;
    height: 44px;
    padding: 13px 90px 13px 20px;
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    background-color: #f1f1f1;
    -webkit-box-shadow: inset 0px 1px 10px 0px rgb(85 85 85 / 20%);
    box-shadow: inset 0px 1px 10px 0px rgb(85 85 85 / 20%);
    -webkit-transition: all 0.4s ease;
    -o-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }
  .btn-share {
    top: 50%;
    right: 3px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    line-height: 1;
    padding: 11px 25px;
    margin-right: 2px;
    border-radius: 0px 40px 40px 0px;
    background-color: #dc4734;
    position: absolute;
    text-transform: uppercase;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .btn-image {
    margin-right: 5em;
    border-radius: 40px 0px 0px 40px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.post {
  border-radius: 10px 10px 10px;
  box-shadow: 30px;
  border: 1px solid rgb(255, 223, 223);
}

.input-text {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px 15px 15px 15px;
  padding: 0px;
}
.boutton {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 10em;
}

@media screen and (max-width: 439px) {
  .profile-thumb {
    display: none;
  }
  .card {
    width: 100%;
  }
  .btn_container {
    padding-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
  }
  .btn-share {
    top: 77% !important;
    right: 22px !important;
    position: inherit !important;
    transform: none !important;
  }
  .btn-image {
    margin-right: 0 !important;
  }
  .share-text-field {
    padding-right: 0px !important;
  }
  .view-picture {
    margin-top: 10px;
  }
}
</style>
