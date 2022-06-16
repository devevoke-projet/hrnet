<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>
<style>
#app {
  max-width: 100%;
}
body {
  background-color: #f1f1f1;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
  min-width: 300px;
}

.card {
  margin-top: 100px;

  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button {
  background: #dc3545;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #7a000c;
  text-decoration: none;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #fa011a;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>
