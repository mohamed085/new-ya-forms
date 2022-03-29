<template>
    <div class="form-header en animate__animated animate__backInLeft" v-if="getLang === 'en'">
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
              <form class="d-flex" @submit.prevent="search">
                <input class="form-control" type="search" v-model="key" required placeholder="Search" aria-label="Search">
                <button class="btn" type="submit"><i class="fas fa-search"></i></button>
              </form>
            </div>

            <div class="mobile-nav">
              <ul>
                <li>
                  <router-link to="/profile">
                    <div class="profile mt-3 d-flex">
                      <b-avatar :src="avatar" size="3rem"></b-avatar>
                      <div class="dropdown-content">
                        <h5>{{ name }}</h5>
                        <p>See your profile</p>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link :to="'/setting/'+id">
                    <div class="d-flex">
                      <i class="fas fa-cog"></i>
                      <div class="dropdown-content">
                        <h6>Edit profile</h6>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="" @click="$store.dispatch('logout')">
                    <div class="d-flex">
                      <i class="fas fa-sign-out-alt"></i>
                      <div class="dropdown-content">
                        <h6>Log out</h6>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>

            <b-dropdown class="dropdown" id="dropdown-left" variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <b-avatar :src="avatar"></b-avatar>
              </template>
              <b-dropdown-item class="link" to="/profile">
                <div class="profile d-flex">
                  <b-avatar :src="avatar" size="3rem"></b-avatar>
                  <div class="dropdown-content">
                    <h5>{{ name }}</h5>
                    <p>See your profile</p>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item :to="'/setting/' + id">
                <div class="d-flex">
                  <i class="fas fa-cog"></i>
                  <div class="dropdown-content">
                    <h6>Edit profile</h6>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item to="" @click="$store.dispatch('logout')">
                <div class="d-flex">
                  <i class="fas fa-sign-out-alt"></i>
                  <div class="dropdown-content">
                    <h6>Log out</h6>
                  </div>
                </div>
              </b-dropdown-item>
            </b-dropdown>

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
    </div>

    <div class="form-header ar animate__animated animate__backInRight" v-else-if="getLang === 'ar'">
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
              <form class="d-flex" @submit="search">
                <input class="form-control" type="search" placeholder="بحث" aria-label="Search">
                <button class="btn" type="submit"><i class="fas fa-search"></i></button>
              </form>
            </div>

            <div class="mobile-nav">
              <ul>
                <li>
                  <router-link to="/profile">
                    <div class="profile mt-3 d-flex">
                      <b-avatar :src="avatar" size="3rem"></b-avatar>
                      <div class="dropdown-content">
                        <h5>{{ name }}</h5>
                        <p>انظر ملفك الشخصي</p>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link :to="'/setting/'+id">
                    <div class="d-flex">
                      <i class="fas fa-cog"></i>
                      <div class="dropdown-content">
                        <h6>تعديل الملف الشخصي</h6>
                      </div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="" @click="$store.dispatch('logout')">
                    <div class="d-flex">
                      <i class="fas fa-sign-out-alt"></i>
                      <div class="dropdown-content">
                        <h6>تسجيل خروج</h6>
                      </div>
                    </div>
                  </router-link>
                </li>

              </ul>
            </div>

            <b-dropdown class="dropdown" id="dropdown-right" right variant="link" toggle-class="text-decoration-none" no-caret>
              <template #button-content>
                <b-avatar :src="avatar"></b-avatar>
              </template>
              <b-dropdown-item class="link" to="/profile">
                <div class="profile d-flex">
                  <b-avatar :src="avatar" size="3rem"></b-avatar>
                  <div class="dropdown-content">
                    <h5>{{ name }}</h5>
                    <p>انظر ملفك الشخصي</p>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item :to="'/setting/'+id">
                <div class="d-flex">
                  <i class="fas fa-cog"></i>
                  <div class="dropdown-content">
                    <h6>تعديل الملف الشخصي</h6>
                  </div>
                </div>
              </b-dropdown-item>
              <b-dropdown-item to="" @click="$store.dispatch('logout')">
                <div class="d-flex">
                  <i class="fas fa-sign-out-alt"></i>
                  <div class="dropdown-content">
                    <h6>تسجيل خروج</h6>
                  </div>
                </div>
              </b-dropdown-item>
            </b-dropdown>

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
    </div>
</template>

<script>
import Logo from "../ui/Logo";

export default {
  name: "FormsHeader",
  components: {
    Logo
  },
  props: ['id'],
  emits: ['search-forms'],
  data() {
    return {
      name: localStorage.getItem("name"),
      key: '',
      avatar: localStorage.getItem("avatar"),
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
    async search() {
      let myHeaders = new Headers();
      let token = this.$store.getters.token;

      myHeaders.append("Token", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = `https://ya-forms-api.herokuapp.com/api/form/search/` + this.key;

      fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            this.$emit('search-forms', result);
          })
          .catch(error => console.log('error', error));


    },
  }
}
</script>

<style scoped>
.form-header, .home {
  width: 100%;
}

nav {
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
  width: 100%;
  padding: 0 10px;
}

.dropdown {
  z-index: 999;
}

.ar nav {
  direction: rtl;
}

.navbar-brand:hover {
  color: #9d55a0;
}

.btn:hover {
  color: #9d55a0;
  background-color: #fff;
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

.navbar-collapse {
  z-index: 1000;
}

.navbar-nav {
  margin: 0 auto;
}

.dropdown-content {
  margin: auto 10px auto;
}

.dropdown-content h5 ,
.dropdown-content p {
  margin: auto;
}

.ar .dropdown-content p {
  text-align: right;
}

.profile {
  border-bottom: 1px solid #bbbbbb;
  padding-bottom: 5px;
}

.mobile-nav {
  display: none;
}

.languages {
  display: flex;
  margin: auto 0;
}

.languages .lang {
  font-size: 14px;
  color: #111111;
  text-decoration: none;
  cursor: pointer;
}

.languages .lang:hover {
  color: #9d55a0;
}

.lang img {
  margin: auto 5px;
}

.lang p {
  margin: auto 0;
}

.ar .dropdown p, .ar .dropdown h6 {
  text-align: right;
  margin-right: 5px;
}

@media (max-width:1024px) {
  .dropdown {
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
}
</style>