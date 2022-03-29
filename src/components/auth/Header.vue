<template>
  <div class="en animate__animated animate__backInLeft" v-if="getLang === 'en'">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid d-flex">
        <router-link to="/" class="navbar-brand">
          <logo></logo>
        </router-link>
        <div>
          <div class="navbar-nav">
            <router-link to="/"><i class="fas fa-home me-1"></i>Home</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <div class="ar animate__animated animate__backInRight" v-else-if="getLang === 'ar'">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid d-flex">
        <router-link to="/" class="navbar-brand">
          <logo></logo>
        </router-link>
        <div>
          <div class="navbar-nav">
            <router-link to="/"><i class="fas fa-home"></i>الصفحة الرئيسية</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from "../ui/Logo";
export default {
  name: "Header",
  components: {
    Logo
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },

}
</script>

<style scoped>
.en, .ar{
  width: 100%;
}

.ar {
  direction: rtl;
}

.left-content a {
  text-decoration: none;
}

nav {
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
  padding: 3px 10px;
  background-color: #FFFFFF;
}

.navbar-nav {
  margin: 0 auto 0 0;
}

.navbar-nav a {
  text-decoration: none;
  margin: auto 0;
  font-size: 14px;
  color: white;
  background-color: #9c6d9e;
  cursor: pointer;
  font-weight: 300;
  text-align: center;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 5px 10px;
}

.navbar-nav a:hover {
  background-color: #ddd;
  color: #9c6d9e;
}

.navbar-nav a i {
  margin-right: 5px;
}

.ar i {
  margin-right: 0;
  margin-left: 5px;
}
@media (max-width:1024px) {
  .navbar-nav a {
    font-size: 70%;
    margin: auto 0;
  }
}

</style>