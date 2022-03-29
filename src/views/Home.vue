<template>
  <div class="home animate__animated animate__fadeIn">

    <div class="en animate__animated animate__backInLeft" v-if="getLang === 'en'">

      <nav class="nav">
        <div class="nav-content">
          <div class="languages d-flex">
            <span @click="setLang('en')" class="lang d-flex">
            <img class="me-2 mb-auto mt-auto" src="../assets/images/en-logo.png">
            <p class="me-3 mb-auto mt-auto">English</p>
          </span>
            <span @click="setLang('ar')" class="lang d-flex">
            <img class="me-2 mb-auto mt-auto" src="../assets/images/ar-logo.png">
            <p class="me-3 mb-auto mt-auto">عربي</p>
          </span>
          </div>
        </div>
      </nav>

      <div class="main-content">
        <p class="line-1 anim-typewriter">Welcome to Ya Forms.</p>
        <router-link v-if="$store.getters.isAuthenticated" to="/forms" ><button>Forms</button></router-link>
        <router-link v-if="!$store.getters.isAuthenticated" to="/register"><button>Register</button></router-link>
        <router-link v-if="!$store.getters.isAuthenticated" to="/login" ><button>Log in</button></router-link>
        <router-link to="/contact-us" ><button>Contact Us</button></router-link>
        <router-link v-if="$store.getters.isAuthenticated" to="#" ><button @click="$store.dispatch('logout')">Log out</button></router-link>
      </div>

    </div>

    <div class="ar animate__animated animate__backInRight" v-else-if="getLang === 'ar'">

      <nav class="nav">
        <div class="nav-content">
          <div class="languages d-flex">
            <span @click="setLang('en')" class="lang d-flex">
            <img class="me-2 mb-auto mt-auto" src="../assets/images/en-logo.png">
            <p class="me-3 mb-auto mt-auto">English</p>
          </span>
            <span @click="setLang('ar')" class="lang d-flex">
            <img class="me-2 mb-auto mt-auto" src="../assets/images/ar-logo.png">
            <p class="me-3 mb-auto mt-auto">عربي</p>
          </span>
          </div>
        </div>
      </nav>

      <div class="main-content">
        <p class="line-1 anim-typewriter">مرحبا بكم في يافورمز</p>
        <router-link v-if="$store.getters.isAuthenticated" to="/forms" ><button>فورمز</button></router-link>
        <router-link v-if="!$store.getters.isAuthenticated" to="/register"><button>تسجيل</button></router-link>
        <router-link v-if="!$store.getters.isAuthenticated" to="/login" ><button>تسجيل الدخول</button></router-link>
        <router-link to="/contact-us" ><button>اتصل بنا</button></router-link>
        <router-link v-if="$store.getters.isAuthenticated" to="#" ><button @click="$store.dispatch('logout')">تسجيل الخروج</button></router-link>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {

    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  methods: {
    setLang(lang) {
      this.$store.dispatch('main/setLang', lang);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');

.home {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  background-image: url("../assets/images/mainback.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.nav {
  background-color: rgba(255, 255, 255, 0.767);
  padding: 20px;
  width: 100%;
  position: fixed;
  top: 0;
}

.nav-content {
  width: 80%;
  display: flex;
  justify-content: center;
}

.nav-content span {
  padding: 0 20px;
  cursor: pointer;
  text-decoration: none;
  color: #111;
  font-weight: 500;
}

.nav-content span:hover {
  color: #9d55a0;
}

.main-content {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.main-content .line-1 {
  font-family: 'Bebas Neue', cursive;
  height: 70px;
  font-weight: bolder;
  padding-left: 10px;
  border-left: solid 10px rgb(255, 204, 110);
  font-size: 300%;
  color: #9d55a0;
  text-shadow: #e8d4e9 0 0 3px;
  animation: type 3s steps(36);
  overflow: hidden;
  white-space: nowrap;

}

.main-content a {
  width: 30%;
}

.main-content button {
  font-size: 25px;
  width: 100%;
  padding: 15px 20px;
  margin: 30px 0 0;
  color: white;
  background-color: #9d55a0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 2px grey;
  transform: scale(1);
  font-family: 'Bebas Neue', cursive;
}

.main-content button:hover {
  background: none;
  box-shadow: 0 0 2px grey;
  color: #9d55a0;
}

.ar .nav{
  direction: rtl;
}

.ar .main-content .line-1 {
  display: inline-block;
  direction: rtl;
  padding-right: 10px;
  border-right: solid 10px rgb(255, 204, 110);
  padding-left: 0;
  border-left: none;
  font-family: 'Cairo', sans-serif;
  text-align: right;
  transform: translateY(0%);
}

.ar .main-content button {
  font-family: 'Cairo', sans-serif;
}

.ar .anim-typewriter{
  animation: typewriter 2s steps(44) 1s 1 normal both,
  blinkTextCursor 300ms steps(44) infinite normal;
}

@keyframes typewriter{
  from{width: 0;}
  to{width: 80%;}
}
@keyframes blinkTextCursor{
  from{border-right-color: rgb(255, 204, 110);}
  to{border-right-color: transparent;}
}


@keyframes type {
  0% {
    width: 0;
  }
  20% {
    width: 0;
  }
  80% {
    width: 20ch;
  }
  100% {
    width: 20ch;
  }
}

@media (max-width:1024px)  {
  .main-content {
    width: 95%;
  }

  .main-content .line-1 {
    height: 40px;
    font-size: 200%;
    padding: 0;
  }

  .main-content button {
    font-size: 15px;
  }
}
</style>