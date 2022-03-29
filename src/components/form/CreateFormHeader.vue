<template>
  <div>
    <div class="create-form-header en animate__animated animate__backInLeft" v-if="getLang === 'en'">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link to="/forms" class="navbar-brand">
            <logo></logo>
          </router-link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav">
              <router-link v-if="showEye" :to="'/form/' + id" class="link" >
                <i class="far fa-eye"></i>
              </router-link>
              <p class="link" v-if="showThemeIcon" @click="them">
                <i class="fas fa-palette"></i>
              </p>
              <p class="send" v-if="showSendIcon" @click="send">
                <i class="fas fa-share-alt"></i>
                Send
              </p>
            </div>

            <div class="languages">
            <span @click="setLang('en')" class="lang d-flex">
            <img src="../../assets/images/en-logo.png">
            <p>English</p>
          </span>
              <span @click="setLang('ar')" class="lang d-flex">
            <img src="../../assets/images/ar-logo.png">
            <p>عربي</p>
          </span>
            </div>

          </div>

        </div>
      </nav>

      <div class="mobile-nav-1">
        <router-link v-if="showEye" :to="'/form/' + id" class="link" >
          <i class="far fa-eye"></i>
        </router-link>
        <p class="link" v-if="showThemeIcon" @click="them">
          <i class="fas fa-palette"></i>
        </p>
        <p class="send" v-if="showSendIcon" @click="send">
          <i class="fas fa-share-alt"></i>
          Send
        </p>
      </div>

      <div class="nav-2" v-if="showNav2">
        <router-link :to="'/form-view/' + id" exact>Questions</router-link>
        <router-link :to="'/form/response/' + id">Responses <span v-if="responseNum" class="responseNum">{{ responseNum }}</span></router-link>
        <router-link :to="'/form/setting/' + id">Setting</router-link>
      </div>

      <div class="nav-2" v-if="showNav3">
        <router-link :to="'/form-edit/' + id">Questions</router-link>
      </div>
    </div>

    <div class="create-form-header ar animate__animated animate__backInRight" v-if="getLang === 'ar'">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link to="/forms" class="navbar-brand">
            <logo></logo>
          </router-link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContentAr" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContentAr">
            <div class="navbar-nav">
              <router-link v-if="showEye" :to="'/form/' + id" class="link" >
                <i class="far fa-eye"></i>
              </router-link>
              <p class="link" v-if="showThemeIcon" @click="them">
                <i class="fas fa-palette"></i>
              </p>
              <p class="send" v-if="showSendIcon" @click="send">
                <i class="fas fa-share-alt"></i>
                إرسال
              </p>
            </div>

            <div class="languages">
            <span @click="setLang('en')" class="lang d-flex">
            <img src="../../assets/images/en-logo.png">
            <p>English</p>
          </span>
              <span @click="setLang('ar')" class="lang d-flex">
            <img src="../../assets/images/ar-logo.png">
            <p>عربي</p>
          </span>
            </div>

          </div>
        </div>
      </nav>

      <div class="mobile-nav-1">
        <router-link v-if="showEye" :to="'/form/' + id" class="link" >
          <i class="far fa-eye"></i>
        </router-link>
        <p class="link" @click="them">
          <i class="fas fa-palette"></i>
        </p>
        <p class="send" v-if="showSendIcon" @click="send">
          <i class="fas fa-share-alt"></i>
          ارسال
        </p>
      </div>

      <div class="nav-2" v-if="showNav2">
        <router-link :to="'/form-view/' + id" exact>الاسئلة</router-link>
        <router-link :to="'/form/response/' + id">الردود <span v-if="responseNum" class="responseNum">{{ responseNum }}</span></router-link>
        <router-link :to="'/form/setting/' + id">الاعدادات</router-link>
      </div>

      <div class="nav-2" v-if="showNav3">
        <router-link :to="'/form-edit' + id">الاسئلة</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../ui/Logo";
export default {
  name: "CreateFormHeader",
  components: {
    Logo
  },
  props: ['id', 'en', 'ar', 'theme', 'show', 'responseNum', 'showNav2', 'showNav3', 'showEye', 'showSendIcon', 'showThemeIcon'],
  emits: ['show-theme', 'show-send'],
  data() {
    return {
      showTheme: false,
      showSend: '',
      themeStyle: 'default'
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
    },
    search() {

    },
    them() {
      this.showTheme = !this.showTheme;
      this.$emit('show-theme', this.showTheme);
    },
    send() {
      this.showSend = !this.showSend;
      this.$emit('show-send', this.showSend);
    }
  }
}
</script>

<style scoped>
.default {
  --var-main-color: #9d55a0;
  --var-second-color: #dddddd;
}
.theme-1 {
  --var-main-color: #db4437;
  --var-second-color: #fae3e1;
}
.theme-2 {
  --var-main-color: #673ab7;
  --var-second-color: #c2c0c6;
}

.theme-3 {
  --var-main-color: #3f51b5;
  --var-second-color: #c2c0c6;
}

.theme-4 {
  --var-main-color: #4285f4;
  --var-second-color: #c2c0c6;
}

.theme-5 {
  --var-main-color: #03a9f4;
  --var-second-color: #d5ebf5;
}

.theme-6 {
  --var-main-color: #ff5722;
  --var-second-color: #ffeee0;
}

.theme-7 {
  --var-main-color: #ff9800;
  --var-second-color: #ffdcab;
}

.theme-8 {
  --var-main-color: #009688;
  --var-second-color: #cefcf9;
}

.theme-9 {
  --var-main-color: #4caf50;
  --var-second-color: #9fb89f;
}

.theme-10 {
  --var-main-color: #607d8b;
  --var-second-color: #ddd;
}

.theme-11 {
  --var-main-color: #9e9e9e;
  --var-second-color: #ddd;
}

.create-form-header {
  background-color: #FFFFFF !important;
  z-index: 1000;
}

nav {
  width: 100%;
  padding: 0 10px;
}

.btn:hover {
  color: var(--var-main-color);
  background-color: #fff;
}

.navbar-brand:hover {
  color: var(--var-main-color);
}

form {
  border: 1px solid #bbbbbb;
  border-radius: 20px;
  padding: 3px 10px;
  margin: 0 auto;
}

form input {
  border: none;
}
.dropdown {
  z-index: 999;
}

.navbar-nav {
  margin: 0 auto 0 80px;
}

.navbar-nav .link {
  color: #111111;
  text-decoration: none;
  margin: auto 10px;
}

.navbar-nav i:hover {
  color: var(--var-main-color);
  cursor: pointer;
}

.send {
  color: #FFFFFF;
  margin: auto 10px;
  background-color: var(--var-main-color);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.send i {
  margin: 0 5px 0 0;
}

.send:hover {
  color: var(--var-main-color);
  background-color: #dddddd;
  text-decoration: none;
}

.dropdown-content {
  margin: auto 0 auto 10px;
}

.dropdown-content h5 ,
.dropdown-content p {
  margin: auto 0;
}

.profile {
  border-bottom: 1px solid #bbbbbb;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.mobile-nav {
  display: none;
}

.languages span {
  font-size: 14px;
  color: #111111;
  text-decoration: none;
  cursor: pointer;
}

.languages span:hover {
  color: var(--var-main-color);
}

.lang img {
  margin: auto 5px;
}

.lang p {
  margin: auto 0;
}

.languages {
  display: flex;
  margin: auto 0;
}

.languages a {
  font-size: 14px;
  color: #111111;
  text-decoration: none;
}

.languages a:hover {
  color: var(--var-main-color);
}

.lang img {
  margin: auto 5px;
}

.lang p {
  margin: auto 0;
}

.mobile-nav-1 {
  display: none;
}

.nav-2 {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
}

.nav-2 a {
  color: #111111;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  margin: 0 10px;
  padding-bottom: 5px;
}


.nav-2 a.active,
.nav-2 a:hover,
.nav-2 a.router-link-active {
  text-decoration: none;
  color: var(--var-main-color);
  border-bottom: 4px solid var(--var-main-color);
}

.ar nav {
  direction: rtl;
  text-align: right;
}

.ar .dropdown p, .ar .dropdown h6, .ar .mobile-nav p, .ar .mobile-nav h6 {
  text-align: right;
  margin-right: 5px;
}

.ar .nav-2 {
  direction: rtl;
  text-align: right;
}

.responseNum {
  color: #FFFFFF;
  background-color: var(--var-main-color);
  padding: 3px 7px;
  border-radius: 50%;
  margin: 0 5px;
}

@media (max-width:1024px) {
  .dropdown {
    display: none;
  }

  .navbar-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }

  .mobile-nav li {
    list-style: none;
  }

  .mobile-nav a {
    color: #111111;
    text-decoration: none;
  }

  .mobile-nav a:hover {
    background-color: #dddddd;
  }

  .mobile-nav-1 {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    align-items: center;
  }


  .mobile-nav-1 .link {
    color: #111111;
    text-decoration: none;
    margin: auto 10px;
  }

  .mobile-nav-1 i:hover {
    color: var(--var-main-color);
    cursor: pointer;
  }

  .mobile-nav-1 .send {
    color: #FFFFFF;
    margin: auto 10px;
    background-color: var(--var-main-color);
    padding: 5px 10px;
    border-radius: 5px;
  }

  .mobile-nav-1 .send i {
    margin: 0 5px 0 0;
  }

  .mobile-nav-1 .send:hover {
    color: var(--var-main-color);
    background-color: #dddddd;
    text-decoration: none;
  }
}
</style>