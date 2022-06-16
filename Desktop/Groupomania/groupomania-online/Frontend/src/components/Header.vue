<template>
  <nav
    class="container-fluid navbar navbar-expand-lg navbar-light bg-light fixed-top px-4"
  >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar-Toggle"
      aria-controls="navbarToggle"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" to="/">
      <img
        class="w-50 pl-3 logo_img"
        src="../assets/icon-left-font-monochrome-black.svg"
        alt="Logo Groupomania"
      />
    </router-link>
    <div
      v-if="this.$store.state.user.userId !== -1"
      class="collapse navbar-collapse justify-content-start justify-content-md-end"
      id="navbar-Toggle"
    >
      <!-- //affiche l'image et l'etat de la connexion -->

      <div class="onLine">
        <div class="container__picture__profil">
          <img class="image_profil" :src="user.image" alt="" />
        </div>
        <span class="mr-4">En ligne</span>
        <span class="status_connexion"></span>
      </div>

      <ul class="navbar-nav mt-2 mt-lg-0">
        <li class="nav-item">
          <router-link class="nav-link text-dark" to="/wall">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-dark"
            aria-label="Profile"
            to="/profile"
          >
            <i class="user-icon fas fa-user"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <button type="button" class="btn btn-danger btn_logout" @click="logout">
            <i class="fas fa-sign-out-alt icone_logout"></i> <span class="logout">Déconnecter</span> 
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
//Export
import { mapState } from "vuex";
export default {
  props: {
    msg: String,
  },
  methods: {
    logout() {
      console.log("déconnecter");
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
};
</script>
<style lang="scss">
@media only screen and (max-width: 700px) {
  .navbar {
    display: grid;
    grid-template-columns: 0fr 5fr;
  }
}
.image_profil {
  max-width: 100%;
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  height: 60px;
}
.container__picture__profil {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  z-index: 1000;
  overflow: hidden;
}
.onLine {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  margin-right: 3em;
  padding-left: 10px;
  background-color: rgba(128, 128, 128, 0.346);
  border-radius: 28px;
}
.status_connexion {
  // border: 1px solid black;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  margin-right: 5px;
  background-color: green;
}
nav {
  position: fixed;
  top: 0;
}
.icone_logout {
  display: none;
}

@media screen and (max-width: 991px) {
  .onLine {
    display: none;
  }
}
@media screen and (max-width: 680px) {
  .logo_img {
    width: 10em !important;

  }
  .btn_logout{
    width: 100%;
  }
  .logout {
    display: none;
  }
  .icone_logout {
  display: block;
}
}
</style>
