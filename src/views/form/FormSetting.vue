<template>
  <main class="main-spinner" v-if="isLoading">
    <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
  </main>
  <div v-else :class="'home animate__animated animate__backInRight ' + form.style_theme + ' ' + form.font_family ">

    <create-form-header
        class="hidePdf"
        :theme="form.style_theme"
        :id="form.id"
        show=false
        show-nav2=true
        show-eye=true
    >
    </create-form-header>


    <main class="main-spinner" v-if="isLoading">
      <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
    </main>

    <div class="container form-response" v-else>
      <div class="main-content en animate__animated animate__backInLeft" v-if="getLang === 'en'">
        <div class="section responseNum-section">
          <div class="responseNum-section-row1 mb-3">
            <div class="responseCount">From settings</div>
          </div>
          <div class="mt-3 mb-3 p-3">
            <b-form @submit.prevent="updateMsg">
              <h4>Send response message</h4>
              <b-form-input v-model="form.msg"></b-form-input>
              <b-button type="submit" class="btn mt-3">Save</b-button>
            </b-form>
          </div>
        </div>

      </div>


      <div class="main-content ar animate__animated animate__backInRight" v-if="getLang === 'ar'">
        <div class="section responseNum-section">
          <div class="responseNum-section-row1 mb-3">
            <div class="responseCount">اعدادات النموذج</div>
          </div>
          <div class="mt-3 mb-3 p-3">
            <b-form @submit.prevent="updateMsg">
              <b-form-input v-model="form.msg"></b-form-input>
              <b-button type="submit" class="btn mt-3">حفظ</b-button>
            </b-form>
          </div>
        </div>

      </div>
      </div>



  </div>
</template>

<script>
import CreateFormHeader from "@/components/form/CreateFormHeader";
import store from "@/store";
import router from "@/router";

export default {
  name: "FormSetting",
  components: {
    CreateFormHeader
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang']
    }
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/login')
    }
    this.loadForm(this.$route.params.id)

  },
  data() {
    return {
      form: '',
      displaySummary: true,
      displayTheme: false,
      displaySend: false,
      isLoading: false
    }
  },
  methods: {
    async loadForm(id) {
      this.isLoading = true;

      let myHeaders = new Headers();

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let url = `https://yaformelbanna.we-work.pro/api/get-form/` + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      console.log(responseData)

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      if (!responseData.status) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      this.form = responseData.data;

      this.isLoading = false;

    },

    async updateMsg() {
      this.isLoading = true;

      let id = this.$route.params.id;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let token = this.$store.getters.token;

      myHeaders.append("authToken", token);

      let raw = JSON.stringify({
        "msg": this.form.msg
      });

      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url = `https://yaformelbanna.we-work.pro/api/auth/form-setting/` + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      console.log(responseData)

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        console.log(error)
        throw error;
      }

      this.form = responseData;

      this.isLoading = false;

      await this.$router.push(`/form-view/` + id)
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

.default-font {
  --var-font: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
}

.Playful {
  --var-font: 'Style Script', cursive;
}

.Roboto-Mono {
  --var-font: 'Roboto Mono', monospace;
}

.home {
  background-color: var(--var-second-color);
  min-height: 100vh;
}

.ar {
  direction: rtl;
  text-align: right;
}

.form-response {
  width: 60%;
  padding-bottom: 60px;
}

.section {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  background-color: #FFFFFF;
  margin-bottom: 20px;
}

.responseNum-section {
  padding-bottom: 0;
  margin-bottom: 0;
}

.responseCount {
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 36px;
  color: #202124;
}

.accepting-responses {
  margin-bottom: 20px;
}

.accepting-responses p {
  margin: auto 0 auto auto;
  font-weight: 500;
}

.ar .accepting-responses p {
  margin: auto auto auto 0;
  font-weight: 500;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 0 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--var-main-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--var-main-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.no-response-section {
  margin-top: 20px;
  font-family: Roboto,Arial,sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .3px;
  line-height: 16px;
  color: #70757a;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 24px;
  text-align: center;
}

.no-response-section p {
  margin: auto 0;
}

.responseNum-section-row3 {
  display: flex;
  margin: 30px 0 0;
}

.responseNum-section-row3 .response-type {
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
}

.responseNum-section-row3 a {
  text-decoration: none;
  color: #111111;
  padding: 0 4px 10px;
  margin: 0;
}

.responseNum-section-row3 a.active,
.responseNum-section-row3 a:hover,
.responseNum-section-row3 a.router-link-active {
  border-bottom: 3px solid var(--var-main-color);
  border-radius: 3px;
}

.responseExport-section {
  display: flex;
}

.export-btn {
  background: none;
  color: var(--var-main-color);
  border: 1px solid var(--var-main-color);
  margin: 0 5px;
}

.export-btn:hover{
  background: var(--var-main-color);
  color: #FFFFFF;
  border: 1px solid var(--var-main-color);

}


.btn {
  color: var(--var-main-color);
  background-color: #FFFFFF;
  border: 1px solid var(--var-main-color);
  padding: 8px 20px;
}

.btn:hover {
  background-color: var(--var-main-color);
  color: #FFFFFF;
  border: 1px solid var(--var-main-color);
}

.ar {
  direction: rtl;
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

@media (max-width:1024px) {
  .form-response {
    width: 90%;
  }



}
</style>