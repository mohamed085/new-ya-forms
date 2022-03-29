<template>
  <div class="home animate__animated animate__fadeIn">
    <div class="nav">
      <forms-header
        :id=$store.getters.userId
        @search-forms="setForms"
    ></forms-header>
    </div>

    <main class="en animate__animated animate__backInLeft" v-if="getLang === 'en'">
      <div class="container">
        <div class="start-form">
          <div class="header d-flex justify-content-between">
            <div>
              <h4>Start your form</h4>
            </div>
          </div>
          <div class="forms">
            <Form v-if="$store.getters.isAdmin == true" add-template="true"></Form>
            <Form add-form="true"></Form>
            <Form quiz-form="true"></Form>
            <Form v-for="template in templates" :key="template.id" display-form="true" :id="template.id" :title="template.header" :img-src="template.logo"></Form>
          </div>
          <div class="recent-form mt-5">
            <div class="header d-flex justify-content-between">
              <div>
                <h4>Recent form</h4>
              </div>
            </div>
            <div class="forms">
              <main class="main-spinner" v-if="isLoading">
                <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
              </main>
              <div v-else-if="this.forms.length > 0" class="w-100 forms-links">
                <div v-for="form in forms" :key="form.id">
                  <router-link class="form-link for-big-screen" to="">
                    <div class="form-link-row row">
                      <div class="form-link-row-header col-1 d-flex align-items-center">
                        <img :src="form.logo" width="35" height="35">
                      </div>
                      <div class="form-link-row-header col-2 d-flex align-items-center">
                        {{form.header}}
                      </div>
                      <div class="form-link-row-type col-3 d-flex align-items-center">
                        {{form.description}}
                      </div>
                      <div class="form-link-row-type col-2 d-flex align-items-center">
                        {{form.form_type}}
                      </div>
                      <div class="form-link-row-date col-3 d-flex align-items-center">
                        {{form.updated_at }}
                      </div>
                      <div class="form-link-row-header col-1 d-flex align-items-center justify-content-end">
                        <router-link :to="'form-view/' + form.id" class="i fas fa-eye me-2"></router-link>
                        <router-link :to="'form-edit/' + form.id" class="i fas fa-edit me-2"></router-link>
                        <i @click="deleteForm(form.id)" class="i fas fa-trash me-2 "></i>
                      </div>
                    </div>
                  </router-link>
                  <router-link class="form-link little-data w-100" to="">
                    <div class="form-link-row">
                      <div class="row form-link-row-header">
                        <div class="col-10">
                          {{ form.header }}
                        </div>
                        <div class="form-link-row-header col-2 d-flex justify-content-end">
                          <router-link :to="'form-view/' + form.id" class="i fas fa-eye me-2"></router-link>
                          <router-link :to="'form-view/' + form.id" class="i fas fa-eye me-2"></router-link>
                          <router-link :to="'form-edit/' + form.id" class="i fas fa-edit me-2"></router-link>
                          <i @click="deleteForm(form.id)" class="i fas fa-trash me-2 "></i>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          {{ form.description }}
                        </div>
                      </div>
                      <div class="form-link-row-date row">
                        <div class="col">
                          {{form.updated_at}}
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <p v-else class="no-form">No form selected yet</p>
            </div>
          </div>
        </div>

      </div>
    </main>

    <main class="ar animate__animated animate__backInRight" v-if="getLang === 'ar'">
      <div class="container">
        <div class="start-form">
          <div class="header d-flex justify-content-between">
            <div>
              <h4>ابدأ الفورم الخاص بك</h4>
            </div>
          </div>
          <div class="forms">
            <Form v-if="$store.getters.isAdmin === 'true'" add-template="true"></Form>
            <Form add-form="true"></Form>
            <Form quiz-form="true"></Form>
            <Form v-for="template in templates" :key="template._id" display-form="true" :id="template._id" :title="template.header" :img-src="template.logo"></Form>
          </div>
          <div class="recent-form mt-5">
            <div class="header d-flex justify-content-between">
              <div>
                <h4>الفورمز الجديده</h4>
              </div>
            </div>
            <div class="forms">
              <main class="main-spinner" v-if="isLoading">
                <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
              </main>
              <div v-else-if="this.forms" class="w-100 forms-links">
                <div v-for="form in forms" :key="form.id">
                  <router-link class="form-link for-big-screen" to="">
                    <div class="form-link-row row">
                      <div class="form-link-row-header col-1 d-flex align-items-center">
                        <img :src="form.logo" width="35" height="35">
                      </div>
                      <div class="form-link-row-header col-2 d-flex align-items-center">
                        {{form.header}}
                      </div>
                      <div class="form-link-row-type col-3 d-flex align-items-center">
                        {{form.description}}
                      </div>
                      <div class="form-link-row-type col-2 d-flex align-items-center">
                        {{form.form_type}}
                      </div>
                      <div class="form-link-row-date col-3 d-flex align-items-center">
                        {{form.updated_at}}
                      </div>
                      <div class="form-link-row-header col-1 d-flex align-items-center justify-content-end">
                        <router-link :to="'form-view/' + form.id" class="i fas fa-eye me-2"></router-link>
                        <router-link :to="'form-edit/' + form.id" class="i fas fa-edit me-2"></router-link>
                        <i @click="deleteForm(form.id)" class="i fas fa-trash me-2 "></i>
                      </div>
                    </div>
                  </router-link>
                  <router-link class="form-link little-data w-100" to="">
                    <div class="form-link-row">
                      <div class="row form-link-row-header">
                        <div class="col-10">
                          {{ form.header }}
                        </div>
                        <div class="form-link-row-header col-2 d-flex justify-content-end">
                          <router-link :to="'form-view/' + form.id" class="i fas fa-eye me-2"></router-link>
                          <router-link :to="'form-edit/' + form.id" class="i fas fa-edit me-2"></router-link>
                          <i @click="deleteForm(form.id)" class="i fas fa-trash me-2 "></i>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          {{ form.description }}
                        </div>
                      </div>
                      <div class="form-link-row-date row">
                        <div class="col">
                          {{form.updated_at}}
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <p v-else class="no-form">لم يتم تحديد أي فورم حتى الآن</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import FormsHeader from "../../components/form/FormsHeader";
import Form from "../../components/form/Form";
import store from "@/store";
import router from "@/router";

export default {
  name: "Forms",
  data() {
    return {
      templates: [],
      isLoading: false,
      error: null,
      forms: [],
      msg: ''
    }
  },
  components: {
    FormsHeader,
    Form
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/')
    }
    this.loadForms();
    this.loadTemplates();
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    },
  },
  methods: {
    async loadTemplates() {
      this.isLoading = true;
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = "https://yaformelbanna.we-work.pro/api/auth/get-templates";
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      this.templates = responseData.data;
      this.isLoading = false;

    },
    async deleteForm(id) {
      this.isLoading = true;
      this.forms = [];

      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = `https://yaformelbanna.we-work.pro/api/auth/delete-form/` + id;

      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => {
            this.msg = result.msg
          })
          .catch(error => this.msg = error);

      this.isLoading = false;

      await this.loadForms();
    },
    async loadForms() {
      this.isLoading = true;

      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = "https://yaformelbanna.we-work.pro/api/auth/get-forms";
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      this.forms = responseData.data;
      this.isLoading = false;

    },
    async setForms(result) {
      this.forms = result
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald&family=Rubik:wght@500&display=swap');


.nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

main {
  margin-top: 90px;
}

.ar {
  direction: rtl;
  text-align: right;
}

.header {
  color: #111111;
  font-family: 'Rubik', sans-serif;
}

.header i {
  font-size: 150%;
  margin: auto 5px;
}

.header a {
  text-decoration: none;
  color: #111111;
}

.header h4 {
  margin: auto 0;
}

.header a:hover {
  color: #9d55a0;
}

.forms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.forms .no-form {
  font-weight: 600;
  color: #5A5C6C;
  font-size: 120%;
}

.form-link {
  color: #111111;
  text-decoration: none;
}

.form-link:hover .form-link-row {
  background: #dddddd;
}

.form-link-row {
  width: 100%;
  border-radius: 5px;
  padding: 15px 25px;
  border-bottom: 1px solid #dddddd;
}

.i {
  text-decoration: none;
  color: #8d8d8d;
  margin: auto 5px;
}

.i:hover {
  color: #7349B9;
}

.forms-links {
  margin: 10px 5px;
}

.form-link-row-header {
  font-size: 16px;
  line-height: 24px;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
}

.little-data {
  display: none;
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

@media (max-width:1024px) {
  .home {
    margin-bottom: 200px;
  }

  .header {
    padding: 10px 0;
  }

  .header h4,
  .header i {
    font-size: 100%;
    margin: auto 0;
  }

  .for-big-screen {
    display: none;
  }

  .little-data {
    display: block;
  }

  .i {
    margin: auto 2px;
  }

  .form-link-row {
    padding: 15px 10px;
  }

}
</style>