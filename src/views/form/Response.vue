<template>
  <main class="main-spinner" v-if="isLoading">
    <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
  </main>
  <div v-else :class="'home animate__animated animate__backInRight ' + form.style_theme + ' ' + form.font_family ">

    <create-form-header class="hidePdf"
                        :theme="form.style_theme"
                        :id="form.id"
                        show=false
                        :responseNum="form.response_count"
                        show-nav2=true
                        show-eye=true
    >
    </create-form-header>

    <send-form
        @close-send="closeSend"
        v-if="displaySend"
        :formId="form.id"
        :theme="form.style_theme"
    ></send-form>

    <div class="container form-response">

      <h3>{{message}}</h3>
      <div v-if="getLang === 'en'" class="en animate__animated animate__backInLeft">

        <div class="hidePdf section responseNum-section">
          <div class="responseNum-section-row1">
            <div class="responseCount">
              {{ form.response_count }} responses
            </div>
          </div>
          <div class="responseNum-section-row2">
            <div class="accepting-responses d-flex">
              <p>Accepting responses</p>
              <label class="switch mt-auto mb-auto">
                <input @click="changeAcceptingResponsesStatus" type="checkbox" v-model="form.accept_response">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div v-if="form.response_count !== 0" class="responseExport-section d-flex justify-content-between">
            <div>
              <b-button class="export-btn" @click="exportAsPDF">Export as pdf</b-button>
              <b-button class="export-btn" @click="exportResponseAsCSV">Export as excel</b-button>
              <b-button class="export-btn" @click="exportNumbersASVCF">Export numbers as VCF</b-button>
            </div>
          </div>
          <div v-if="form.response_count !== 0" class="responseNum-section-row3">
            <div class="response-type">
              <router-link exact :to="'/form/response/' + $route.params.id  ">Summary</router-link>
            </div>
            <div class="response-type">
              <router-link :to="'/form/response/' + $route.params.id + '/question' ">Question</router-link>
            </div>
            <div class="response-type">
              <router-link :to="'/form/response/' + $route.params.id + '/individual' ">Individual</router-link>
            </div>
          </div>
        </div>

        <div v-if="form.response_count !== 0" class="response-content">

          <router-view></router-view>

        </div>

        <div v-if="form.response_count === 0" >
          <div class="section no-response-section">
            <p>Waiting for responses</p>
          </div>
        </div>
      </div>

      <div v-if="getLang === 'ar'" class="ar animate__animated animate__backInRight">

        <div class="hidePdf section responseNum-section">
          <div class="responseNum-section-row1">
            <div class="responseCount">
              {{ form.response_count }} ردود
            </div>
          </div>
          <div class="responseNum-section-row2">
            <div class="accepting-responses d-flex">
              <p>قبول الردود</p>
              <label class="switch mt-auto mb-auto">
                <input type="checkbox" v-model="form.accept_response">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div v-if="form.response_count !== 0" class="responseExport-section d-flex justify-content-between">
            <div>
              <b-button class="export-btn" @click="exportAsPDF">تصدير في ملف pdf</b-button>
              <b-button class="export-btn" @click="exportResponseAsCSV">تصدير في ملف excel</b-button>
              <b-button class="export-btn" @click="exportNumbersASVCF">تصدير جهات الاتصال في ملف ال VCF</b-button>
            </div>
          </div>
          <div v-if="form.response_count !== 0" class="responseNum-section-row3">
            <div class="response-type">
              <router-link exact :to="'/form/response/' + form._id  ">ملخص</router-link>
            </div>
            <div class="response-type">
              <router-link :to="'/form/response/' + form._id + '/question' ">الأسئلة</router-link>
            </div>
            <div class="response-type">
              <router-link :to="'/form/response/' + form._id + '/individual' ">الفورمز</router-link>
            </div>
          </div>
        </div>

        <div v-if="form.response_count !== 0" class="response-content">

          <router-view></router-view>

        </div>


        <div v-if="form.response_count === 0" >
          <div class="section no-response-section">
            <p>في انتظار الردود</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CreateFormHeader from "../../components/form/CreateFormHeader";
import store from "@/store";
import router from "@/router";
import SendForm from "./SendForm";
export default {
  name: "Response",
  components: {
    SendForm,
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
      message: '',
      displaySummary: true,
      displayTheme: false,
      displaySend: false,
      isLoading: false
    }
  },
  methods: {
    showSend() {
      this.displaySend = true;
    },
    closeSend() {
      this.displaySend = false;
    },
    async loadForm(id) {
      this.isLoading = true;
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let url = `https://yaformelbanna.we-work.pro/api/auth/get-summary-responses/` + id;


      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(result => {
            this.form = result.data
          })
          .catch(error => console.log('error', error));

      this.isLoading = false;

    },
    async changeAcceptingResponsesStatus() {
      this.isLoading = true;
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "accept_response": !this.form.accept_response
      });

      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let url = `https://yaformelbanna.we-work.pro/api/auth/accept-response/` + this.form.id

      fetch(url, requestOptions)
          .then(response => response.text())
          .then(result => this.message = result.msg)
          .catch(error => console.log('error', error));

      this.isLoading = false;

    },
    async exportResponseAsCSV() {

      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = 'https://yaformelbanna.we-work.pro/api/auth/export-excel/' + this.$route.params.id

      await fetch(url, requestOptions)
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
          .then(url => {
            window.open(url, '_blank');
            URL.revokeObjectURL(url);
          });
    },
    async exportAsPDF() {
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = 'https://yaformelbanna.we-work.pro/api/auth/show-pdf/' + this.$route.params.id
      await fetch(url, requestOptions)
          .then(response => response.text())
          .then(result => {
            let w = window.open('about:blank');
            w.document.open();
            w.document.write(result);
            w.document.close();

          })
          .catch(error => console.log('error', error));

    },
    async exportNumbersASVCF() {
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = 'https://yaformelbanna.we-work.pro/api/auth/export-vcf/' + this.$route.params.id

      await fetch(url, requestOptions)
          .then(response => response.blob())
          .then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = "contacts " + Date.now() + ".vcf";
            document.body.appendChild(a);
            a.click();
            a.remove();
          });


    }

  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Style+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

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