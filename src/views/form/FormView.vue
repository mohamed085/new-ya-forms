<template>
  <main class="main-spinner" v-if="isLoading">
    <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
  </main>
  <div v-else :class="'home animate__animated animate__fadeIn ' + form.style_theme + ' ' + form.font_family ">

    <div>
      <create-form-header
          @show-send="showSend"
          :theme="form.style_theme"
          :id="form.id"
          show="true"
          show-nav2=true
          show-eye=true
          show-send-icon=true
      >
      </create-form-header>

      <send-form
          @close-send="closeSend"
          v-if="displaySend"
          :formId="form.id"
          :theme="form.style_theme"
      ></send-form>

      <div class="main-content en animate__animated animate__backInLeft" v-if="getLang === 'en'">
        <main class="main-spinner" v-if="isLoading">
          <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
        </main>

        <div v-else class="container">

          <div class="create-form">

            <div class="form-image-header" v-if="form.image_header">
              <img :src="form.image_header">
            </div>

            <div class="form-header">
              <div class="form-title">
                <b-form-input class="input-title" type="text" v-model="form.header" placeholder="Untitled form" readonly></b-form-input>
                <b-form-input class="input-description" type="text" v-model="form.description" placeholder="Form description" readonly></b-form-input>
              </div>
              <div class="form-logo">
                <img :src="form.logo">
              </div>
            </div>

            <div v-for="question in form.questions" :key="question.id" :class="'form-question ' + question.focus ">

              <div v-if="question.type === 'question'" class="question-type">

                <div class="form-question-row-1">
                  <b-form-input class="input-question" type="text" v-model="question.question" placeholder="Question" readonly></b-form-input>
                  <b-form-select class="select-answer" v-model="question.question_type" value="question.questionType">
                    <b-form-select-option :value="question.question_type">{{ question.question_type }}</b-form-select-option>
                  </b-form-select>
                </div>

                <div v-if="question.question_type == 'null'" class="form-question-row-2"></div>

                <div v-else-if="question.question_type == 'Short answer'" class="form-question-row-2 short-answer-row">
                  <b-form-input
                      type="text"
                      class="input-answer"
                      placeholder="Short answer text"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else-if="question.question_type == 'Phone number'" class="form-question-row-2 short-answer-row">
                  <b-form-input
                      type="text"
                      class="input-answer"
                      placeholder="Short phone number"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else-if="question.question_type == 'Paragraph'" class="form-question-row-2 paragraph-row">
                  <b-form-textarea
                      type="text"
                      class="input-paragraph"
                      placeholder="Paragraph text"
                      disabled
                  ></b-form-textarea>
                </div>

                <div v-else-if="question.question_type == 'Multiple choice'" class="form-question-row-2 choice-row">
                  <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                    <i class="far fa-circle"></i>
                    <b-form-input class="multiple-choice-input" type="text" v-model="option.value" disabled></b-form-input>
                    <i class="fas fa-times close"></i>
                  </div>
                </div>

                <div v-else-if="question.question_type == 'Checkboxes'" class="form-question-row-2 choice-row">
                  <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                    <i class="far fa-square"></i>
                    <b-form-input class="multiple-choice-input" type="text" v-model="option.value" disabled></b-form-input>
                    <i class="fas fa-times close"></i>
                  </div>
                </div>

                <div v-else-if="question.question_type == 'Dropdown'" class="form-question-row-2 choice-row">
                  <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                    <b-form-input class="multiple-choice-input" type="text" v-model="option.value" disabled></b-form-input>
                    <i class="fas fa-times close"></i>
                  </div>
                </div>

                <div v-else-if="question.question_type == 'Date'" class="form-question-row-2 date-row">
                  <b-form-input
                      type="date"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else-if="question.question_type == 'Time'" class="form-question-row-2 time-row">
                  <b-form-input
                      type="time"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else class="form-question-row-2"></div>

              </div>

              <div v-if="question.type === 'title'" class="question-type">
                <p class="form-question-row-1 question-title">{{ question.question }}</p>
                <p class="form-question-row-2 mb-3">{{ question.description }}</p>
              </div>

              <div v-if="question.type === 'image'" class="section question image">
                <p class="form-question-row-1 question-title">{{ question.question }}</p>
                <img :src="'https://yaformelbanna.we-work.pro/images/question_images/' + question.description">
              </div>

              <div v-if="question.type === 'video'" class="section question video">
                <p class="form-question-row-1 question-title">{{ question.question }}</p>
                <iframe class="form-question-row-2 mb-3" :src="question.description"></iframe>
              </div>

              <div v-else></div>

            </div>

            <div class="d-flex justify-content-between mb-5">
              <div class="social d-flex">
                <div v-for="socialMedia in form.social_media" :key="socialMedia.id">
                  <div class="me-1 ms-1" v-if="socialMedia.type === 'Facebook'">
                    <a target="_blank" :href="socialMedia.url"><i style="color: var(--var-main-color)" class="fab fa-facebook"></i></a>
                  </div>
                  <div class="me-1 ms-1" v-if="socialMedia.type === 'Twitter'">
                    <a target="_blank" :href="socialMedia.url"><i style="color: var(--var-main-color)" class="fab fa-twitter"></i></a>
                  </div>
                  <div class="me-1 ms-1" v-if="socialMedia.type === 'Instagram'">
                    <a target="_blank" :href="socialMedia.url"><i style="color: var(--var-main-color)" class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
              <div class="d-flex created fs-6">Created by <p class="me-1 ms-1 fw-bold"> {{ form.user.name }}</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div class="main-content ar animate__animated animate__backInRight" v-if="getLang === 'ar'">

        <main class="main-spinner" v-if="isLoading">
          <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
        </main>

        <div v-else class="container">

          <div class="create-form">

            <div class="form-image-header" v-if="form.image_header">
              <img :src="form.image_header">
            </div>

            <div class="form-header">
              <div class="form-title">
                <b-form-input class="input-title" type="text" v-model="form.header" placeholder="Untitled form" readonly></b-form-input>
                <b-form-input class="input-description" type="text" v-model="form.description" placeholder="Form description" readonly></b-form-input>
              </div>
              <div class="form-logo">
                <img :src="form.logo">
              </div>
            </div>

            <div v-for="question in form.questions" :key="question.id" :class="'form-question ' + question.focus ">

              <div v-if="question.type === 'question'" class="question-type">

                <div class="form-question-row-1">
                  <b-form-input class="input-question" type="text" v-model="question.question" placeholder="Question" readonly></b-form-input>
                  <b-form-select class="select-answer" v-model="question.question_type" value="question.questionType">
                    <b-form-select-option :value="question.question_type">{{ question.question_type }}</b-form-select-option>
                  </b-form-select>
                </div>

                <div v-if="question.question_type == 'null'" class="form-question-row-2"></div>

                <div v-else-if="question.question_type == 'Short answer'" class="form-question-row-2 short-answer-row">
                  <b-form-input
                      type="text"
                      class="input-answer"
                      placeholder="Short answer text"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else-if="question.question_type == 'Phone number'" class="form-question-row-2 short-answer-row">
                  <b-form-input
                      type="text"
                      class="input-answer"
                      placeholder="Short phone number"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else-if="question.question_type == 'Paragraph'" class="form-question-row-2 paragraph-row">
                  <b-form-textarea
                      type="text"
                      class="input-paragraph"
                      placeholder="Paragraph text"
                      disabled
                  ></b-form-textarea>
                </div>

                <div v-else-if="question.question_type == 'Multiple choice'" class="form-question-row-2 choice-row">
                  <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                    <i class="far fa-circle"></i>
                    <b-form-input class="multiple-choice-input" type="text" v-model="option.value" disabled></b-form-input>
                    <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                  </div>
                </div>

                <div v-else-if="question.question_type == 'Checkboxes'" class="form-question-row-2 choice-row">
                  <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                    <i class="far fa-square"></i>
                    <b-form-input class="multiple-choice-input" type="text" v-model="option.value" disabled></b-form-input>
                    <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                  </div>
                </div>

                <div v-else-if="question.question_type == 'Dropdown'" class="form-question-row-2 choice-row">
                  <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                    <b-form-input class="multiple-choice-input" type="text" v-model="option.value" disabled></b-form-input>
                    <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                  </div>
                </div>

                <div v-else-if="question.question_type == 'Date'" class="form-question-row-2 date-row">
                  <b-form-input
                      type="date"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else-if="question.question_type == 'Time'" class="form-question-row-2 time-row">
                  <b-form-input
                      type="time"
                      disabled
                  ></b-form-input>
                </div>

                <div v-else class="form-question-row-2"></div>

              </div>

              <div v-if="question.type === 'title'" class="question-type">
                <p class="form-question-row-1 question-title">{{ question.question }}</p>
                <p class="form-question-row-2 mb-3">{{ question.description }}</p>
              </div>

              <div v-if="question.type === 'image'" class="section question image">
                <p class="form-question-row-1 question-title">{{ question.question }}</p>
                <img :src="'https://yaformelbanna.we-work.pro/images/question_images/' + question.description">
              </div>

              <div v-if="question.type === 'video'" class="section question video">
                <p class="form-question-row-1 question-title">{{ question.question }}</p>
                <iframe class="form-question-row-2 mb-3" :src="question.description"></iframe>
              </div>

              <div v-else></div>

            </div>

            <div class="d-flex justify-content-between mb-5">
              <div class="social d-flex">
                <div v-for="socialMedia in form.social_media" :key="socialMedia.id">
                  <div class="me-1 ms-1" v-if="socialMedia.type === 'Facebook'">
                    <a target="_blank" :href="socialMedia.url"><i style="color: var(--var-main-color)" class="fab fa-facebook"></i></a>
                  </div>
                  <div class="me-1 ms-1" v-if="socialMedia.type === 'Twitter'">
                    <a target="_blank" :href="socialMedia.url"><i style="color: var(--var-main-color)" class="fab fa-twitter"></i></a>
                  </div>
                  <div class="me-1 ms-1" v-if="socialMedia.type === 'Instagram'">
                    <a target="_blank" :href="socialMedia.url"><i style="color: var(--var-main-color)" class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
              <div class="d-flex created fs-6">بواسطة <p class="me-1 ms-1 fw-bold"> {{ form.user.name }}</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import CreateFormHeader from "../../components/form/CreateFormHeader";
import SendForm from "./SendForm";
import store from "@/store";
import router from "@/router";
export default {
  name: "FormView",
  components: {
    SendForm,
    CreateFormHeader
  },
  data() {
    return {
      form: [],
      currentQuestion: '1',
      isLoading: false,
      displayTheme: false,
      displaySend: false,
    }
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/login')
    }
    this.loadForm(this.$route.params.id)
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
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

      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      let url = `https://yaformelbanna.we-work.pro/api/get-form/` + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.status) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      this.form = responseData.data;

      this.isLoading = false;

    },
    async addForm() {
      this.isLoading = true;

      let id = this.$route.params.id;

      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("Token", token);

      let raw = JSON.stringify({
        "formType": this.form.formType,
        "imageHeader": this.form.imageHeader,
        "header": this.form.header,
        "description": this.form.description,
        "isTemplate": this.form.isTemplate,
        "logo": this.form.logo,
        "styleTheme": this.form.styleTheme,
        "fontFamily": this.form.fontFamily,
        "questions": this.form.questions,

      });

      let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let url = `https://ya-forms-api.herokuapp.com/API/form/` + id;

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      console.log(responseData)

      this.form = responseData;

      this.isLoading = false;

      await this.$router.push('/forms')

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

.select-form-type .container {
  padding: 40px;
}

.select-form-type-header {
  padding: 20px;
  margin: 5px 0;
}

.select-form-type-header h1 {
  font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #2B3245;
  margin: 0;
  line-height: 1.15;
}

.select-form-type-header p {
  font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #8D8FA8;
  margin: 0 10px;
  letter-spacing: 0.001px;
  line-height: 1.15;
}

.select-form-type-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.select-form-type-content .classic-form,
.select-form-type-content .card-form {
  margin: 15px 30px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 250px;
  padding: 55px 10px 0;
  background-color: rgb(53,149,246);
}

.select-form-type-content .classic-form {
  background-color: #BC77BF;
}

.classic-footer, .card-form-footer  {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image img {
  border-radius: 15px;
  width: calc(100% - 20px);
  max-height: 500px;
  margin: 0 10px 10px;
}

.question-title {
  font-size: 16px;
  letter-spacing: .1px;
  line-height: 24px;
  color: #202124;
  font-weight: 400;
  word-break: break-word;
  font-family: var(--var-font);
}


.classic-footer h3,
.card-form-footer h3 {
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 4px;
  padding: 0;
  transition: .3s;
  font-size: 18px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  line-height: 1.15;
  cursor: pointer;
}

.classic-footer p,
.card-form-footer p {
  text-align: center;
  color: #8D8FA8;
  font-size: 16px;
  margin-top: 2px;
  line-height: 1.15;
}

.select-form-type-classic:hover .classic-form,
.select-form-type-card:hover .card-form {
  margin-top: 0;
  border: 3px solid #9d55a0;
}

.select-form-type-classic:hover .classic-footer h3,
.select-form-type-classic:hover .classic-footer p,
.select-form-type-card:hover .card-form-footer h3,
.select-form-type-card:hover .card-form-footer p {
  color: #9d55a0;
}

.select-form-type .ar {
  direction: rtl;
  text-align: right;
}


.home {
  background-color: var(--var-second-color);
  min-height: 100vh;
}

.ar {
  direction: rtl;
  text-align: right;
}

.mobile-add {
  display: none;
}

.hidden {
  display: none;
}

.main-content .container {
  width: 70%;
  display: flex;
}

.create-form {
  width: 92%;
  margin-right: 2%;
}

.ar .create-form {
  margin-left: 2%;
  margin-right: 0;
}

.form-image-header {
  display: flex;
  justify-content: center;
  margin: 10px 0 20px;
  max-height: 200px;
}

.form-image-header img {
  width: 100%;
  max-height: 100%;
  border-radius: 15px;
}


.right-elements {
  width: 5%;
  display: flex;
  flex-direction: column;
}

.right-elements .top {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
}

.right-elements .top  i {
  font-size: 130%;
}

.add-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-logo-btn {
  font-size: 12px;
  color: #111111;
  margin: 0;
  border: none;
  background: none;
}

.add-logo-btn:hover {
  color: var(--var-main-color);
}

.right-elements .bottom {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
}

.right-elements .bottom i {
  font-size: 120%;
  margin: 10px 0px;
}

.right-elements .bottom i:hover {
  color: var(--var-main-color);
  cursor: pointer;
}

.form-header {
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  border-top: 8px solid var(--var-main-color);
  margin-bottom: 20px;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
}

.form-title {
  width: 79%;
  margin-right: 1%;
}

.form-logo {
  width: 220px;
  max-height: 120px;
}

.input-title:focus,
.input-description:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.input-title {
  padding: 0 20px 0 5px;
  border: 0;
  font-size: 28px;
  font-weight: 600;
  color: #111111;
  margin: 10px;
  font-family: var(--var-font);
  width: 80%;
}

.input-title::placeholder {
  color: #111111;
}

.input-title:focus {
  border-bottom: 3px solid var(--var-main-color);
}

.input-description {
  border: 0;
  font-size: 14px;
  color: #111111;
  margin: 10px;
  width: 90%;
}

.input-description:focus {
  border-bottom: 1px solid var(--var-main-color);
}

.form-logo img {
  border-radius: 15px;
  width: 100%;
  height: 100%;
}

.form-question {
  padding: 25px 0 0;
  background-color: #FFFFFF;
  border-radius: 15px;
  margin-bottom: 20px;
  border-right: 1px solid #c4c4c4;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
}

.true {
  border-left: 8px solid var(--var-main-color);
}

.form-question-row-1 {
  display: flex;
  margin-bottom: 10px;
  padding: 10px 20px;
}

.form-question-row-2 {
  margin-bottom: 10px;
  padding: 0 20px;
}

.input-question {
  border: none;
  border-bottom: 3px solid #dddddd;
  margin-right: 20px;
  font-family: var(--var-font);
  font-size: 20px;
}

.ar .input-question {
  margin-left: 20px;
  margin-right: 0;
}

.input-question:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px solid var(--var-main-color);
}

.select-answer {
  width: 45%;
}

.input-answer {
  border: none;
  margin: 10px 0;
  width: 60%;
  border-bottom: 3px dotted #dddddd;
}

.input-answer:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px dotted var(--var-main-color);
}

.input-paragraph {
  border: none;
  margin: 10px 0;
  width: 80%;
  border-bottom: 3px dotted #dddddd;
}

.input-paragraph:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px dotted var(--var-main-color);
}

.multiple-choice-row {
  display: flex;
}

.multiple-choice-row i {
  margin: auto 10px;
}

.multiple-choice-row .close {
  cursor: pointer;
}

.multiple-choice-row .close:hover {
  color: var(--var-main-color);
}

.multiple-choice-input {
  border: none;
  border-bottom: 3px solid #dddddd;
  width: 70%;
  color: #111111;
}

.multiple-choice-input:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px solid var(--var-main-color);
}

.choice-row h6 {
  margin: 10px;
  cursor: pointer;
}

.choice-row h6:hover {
  color: var(--var-main-color);
}

.choice-row ul {
  list-style-type: lower-alpha;
}

.date-row input,
.time-row input {
  width: 150px;
}

.question-footer {
  padding: 10px 15px;
  border-top: 1px solid #c4c4c4;
  display: flex;
}

.hidden-class {
  width: 70%;
}

.question-footer-content {
  width: 30%;
  display: flex;
  justify-content: center;
}

.question-footer i {
  font-size: 120%;
  margin: 10px;
  cursor: pointer;
}

.question-footer i:hover {
  color: var(--var-main-color);
}

.ar .required {
  margin-right: 20px;
  padding-right: 20px;
  border-right: 2px solid #c4c4c4;
}

.en .required {
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid #c4c4c4;
}

.required p {
  margin: auto 0;
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

.else-type-content {
  padding: 5px 20px;
}

.else-type-header {
  display: flex;
}

.else-type-header-input {
  width: 80%;
  margin: auto 20px auto 0 ;
  border: none;
  border-bottom: 3px solid #dddddd;
  font-family: var(--var-font);
  font-size: 20px;
}

.else-type-header-input:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px solid var(--var-main-color);
}

.else-type-header-icons {
  margin: auto 0 auto auto;
}

.else-type-header-icons i {
  font-size: 120%;
  margin: auto 10px;
  cursor: pointer;
}

.else-type-header-icons i:hover {
  color: var(--var-main-color);
}

.title-description-input {
  margin: 10px 5px 20px;
  border: none;
  border-bottom: 1px solid #dddddd;
  font-size: 16px;
}

.title-description-input:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid var(--var-main-color);
}

.image-type-content {
  display: flex;
  justify-content: center;
  padding: 20px 10px 30px;
  max-height: 400px;
}

.image-type-content img {
  width: 100%;
  max-height: 100%;
  border-radius: 15px;
}

.image-header {
  margin: 20px 0;
  padding: 0 10px 20px;
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
}

.btn-image-header {
  border: 1px solid #c1c1c1;
  padding: 5px 10px;
  color: #1a73e8;
  width: 160px;
  margin: 10px;
  cursor: pointer;
}

.btn-image-header i {
  margin: auto 0;
  font-size: 120%;
}

.btn-image-header p {
  margin: auto 5px;
}

.btn-remove-image-header {
  border: 1px solid #c1c1c1;
  padding: 5px 10px;
  width: 200px;
  margin: 10px;
}

.btn-remove-image-header p {
  margin: auto 5px;
}

.btn-remove-image-header .fa-image {
  margin: auto 0;
  font-size: 120%;
  color: var(--var-main-color);
}

.btn-remove-image-header .fa-times {
  margin: auto 5px auto auto;
}

.btn-remove-image-header .fa-times:hover {
  color: var(--var-main-color);
}

.video-url input {
  width: 75%;
}

.video-url button {
  margin: auto 0 auto auto;
  color: var(--var-main-color);
  border: 1px solid var(--var-main-color);
  background-color: #FFFFFF;
}

.video-url button:hover {
  color: #FFFFFF;
  background-color: var(--var-main-color);
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.theme-color {
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
  margin: 20px 0;
  padding: 0 10px 20px;
}

.theme-color-content {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}

.theme-color-content i {
  font-size: 180%;
  margin: 5px;
  cursor: pointer;
}

.theme-color-content i:hover {
  font-size: 190%;
}

.color-1 {
  color: #9d55a0;
}

.color-2 {
  color: #db4437;
}

.color-3 {
  color: #673ab7;
}

.color-4 {
  color: #3f51b5;
}

.color-5 {
  color: #4285f4;
}

.color-6 {
  color: #03a9f4;
}

.color-7 {
  color: #ff5722;
}

.color-8 {
  color: #ff9800;
}

.color-9 {
  color: #009688;
}

.color-10 {
  color: #4caf50;
}

.color-11 {
  color: #607d8b;
}

.color-12 {
  color: #9e9e9e;
}


.btn {
  color: var(--var-main-color);
  background-color: #FFFFFF;
  border: 1px solid var(--var-main-color);
  padding: 8px 20px;
  margin: auto 20px;
}

.btn:hover {
  background-color: var(--var-main-color);
  color: #FFFFFF;
  border: 1px solid var(--var-main-color);
}

.select-form-type-content {
  margin-bottom: 20px;
}

.footer {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  margin-top: 40px;
}

.header-size {
  color: #70757a;
  margin: 0 10px;
  font-size: 12px;
  font-weight: 600;
}

@media (max-width:1024px) {
  .main-content .container {
    width: 98%;
  }

  .create-form {
    width: 95%;
  }

  .right-elements {
    display: none;
  }

  .mobile-add {
    display: block;
    width: 100%;
    background: #FFFFFF;
    padding: 10px;
    border-top: 1px solid #c4c4c4;
    z-index: 1000;
  }

  .mobile-add-content {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .mobile-add-content i {
    color: #111111;
    margin: auto 5px;
    cursor: pointer;
  }

  .mobile-add-content i:hover {
    color: var(--var-main-color);
  }


  .form-header, .form-title, .form-logo {
    margin: 0;
    padding: 0;
  }

  .form-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  .form-title, .form-logo {
    width: 95%;
  }

  .form-title input {
    margin: 0 0 5px 5px;
    width: 95%;
  }

  .form-logo img {
    width: 100px;
    height: 100px;
    margin: 0 10px;
  }

  .form-question-row-1 {
    display: flex;
    flex-direction: column;
  }

  .select-answer {
    margin: 5px 10px;
    width: 90%;
  }

  .hidden-class {
    display: none;
  }

  .question-footer {
    justify-content: center;
  }

  .question-footer-content {
    width: 90%;
  }

  .else-type-header-input {
    width: 98%;
  }

  .theme {
    top: -19px;
  }

  .video-url input {
    width: 60%;
  }
}
</style>