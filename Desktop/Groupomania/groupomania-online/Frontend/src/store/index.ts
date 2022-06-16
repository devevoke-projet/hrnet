//Import
import { createStore } from "vuex";
import axios from "axios";
// "https://groupomania-by-faradji.herokuapp.com/api/"
// https://localhost:3000/api/
// Export axios
export const instance = axios.create({
  baseURL: "https://groupomania-by-faradji.herokuapp.com/api/",
});

let userStore = localStorage.getItem("user");
const authUser = { userId: -1, token: "" };

if (!userStore) {
  var user = authUser;
} else {
  try {
    user = JSON.parse(userStore);
    instance.defaults.headers.common["Authorization"] = "Bearer " + user.token;
  } catch (ex) {
    console.log(ex);
    user = authUser;
  }
}
//Export
export default createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      image: "",
    },
    post: {},
    posts: [],
  },
  getters: {
    post(state) {
      return state.post;
    },
    posts(state) {
      return state.posts;
    },
  },

  mutations: {
    addPost: function (state, post) {
      // state.post = post;
      state.post = [post, ...state.posts];
    },
    getPosts: function (state, posts) {
      state.posts = posts;
    },
    setStatus: function (state, status) {
      state.status = status;
    },

    logUser: function (state, user) {
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },

    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },

    logout: function (state) {
      state.user = authUser;
      localStorage.removeItem("user");
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("auth/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },

    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/signup", userInfos)
          .then(function (response) {
            instance.defaults.headers.common["Authorization"] =
              "Bearer " + user.token;
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

    getUserInfos: ({ commit }) => {
      instance
        .get("/auth/profile")
        .then(function (response) {
          commit("userInfos", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createComment: ({ commit }, createComment) => {
      return new Promise((resolve, reject) => {
        instance
          .post("/comments/", createComment)
          .then(function (response) {
            commit("setStatus", response.data);
            resolve(response);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },
    getAllPosts: ({ commit }) => {
      instance
        .get("/posts/allpost")
        .then(function (response) {
          commit("getPosts", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createPost({ commit }, post) {
      return new Promise((resolve, reject) => {
        instance
          .post("posts/post", post)
          .then((response) => {
            const post = response.data;
            console.log(post, "post");
            commit("addPost", post);
            resolve(response);
          })
          .then(() => {
            instance.get("/posts/allpost").then((response) => {
              const posts = response.data;
              commit("getPosts", posts);
            });
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },
  },
});
