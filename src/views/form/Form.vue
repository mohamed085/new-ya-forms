<template>
  <main class="main-spinner" v-if="isLoading">
    <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
  </main>

  <div v-else-if="!formSend">

    <div v-if="!form.accept_response" :class="'home animate__animated animate__fadeIn ' + form.style_theme + ' ' + form.font_family ">
      <div class="form-view en animate__animated animate__backInLeft">
        <div v-if="form.image_header" class="form-image-header section">
          <img :src="form.image_header">
        </div>

        <div class="form-title section">
          <div class="titles">
            <p class="title">{{ form.header }}</p>
            <p class="description">{{ form.description }}</p>
          </div>
          <div class="logo">
            <img :src="form.logo">
          </div>
        </div>

        <div class="section question">
          This form is closed now
        </div>

      </div>

    </div>

    <div v-else :class="'home animate__animated animate__fadeIn ' + form.style_theme + ' ' + form.font_family ">

      <div v-if="form.form_type === 'classic form'" class="form-view en animate__animated animate__backInLeft">

        <div v-if="form.image_header" class="form-image-header section">
          <img :src="form.image_header">
        </div>

        <div class="form-title section">
          <div class="titles">
            <p class="title">{{ form.header }}</p>
            <p class="description">{{ form.description }}</p>
          </div>
          <div class="logo">
            <img :src="form.logo">
          </div>
        </div>

        <b-form @submit.prevent="submit">
          <div class="form-content">

            <div v-for="question in form.questions" :key="question.id">

              <div v-if="question.type === 'question'">

                <div class="section question " v-if="question.question_type === 'Short answer'">
                  <p class="question-title short-answer-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input question-short-answer"
                      type="text"
                      v-model="question.response"
                      placeholder="Your answer"
                      :required="question.required"
                  ></b-form-input>
                </div>

                <div class="section question " v-if="question.question_type === 'Name'">
                  <p class="question-title short-answer-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input question-short-answer"
                      type="text"
                      v-model="question.response"
                      placeholder="Your answer"
                      :required="question.required"
                  ></b-form-input>
                </div>

                <div class="section question " v-if="question.question_type === 'Email'">
                  <p class="question-title short-answer-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input question-short-answer"
                      type="email"
                      v-model="question.response"
                      placeholder="Your answer"
                      :required="question.required"
                  ></b-form-input>
                </div>

                <div class="section question " v-if="question.question_type === 'Number'">
                  <p class="question-title short-answer-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input question-short-answer"
                      type="number"
                      v-model="question.response"
                      placeholder="Your answer"
                      :required="question.required"
                  ></b-form-input>
                </div>

                <div class="question-title section question " v-if="question.question_type === 'Paragraph'">
                  <p class="paragraph-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input paragraph-answer"
                      type="text"
                      v-model="question.response"
                      :required="question.required"
                      placeholder="Your answer"
                  ></b-form-input>
                </div>

                <div class="section question " v-if="question.question_type === 'Multiple choice'">
                  <p class="question-title multiple-choice-title">{{ question.question }} ?</p>
                  <b-form-radio-group
                      :options="question.options"
                      v-model="question.response"
                      :required="question.required"
                      stacked
                  ></b-form-radio-group>
                </div>

                <div class="section question " v-if="question.question_type === 'Phone number'">
                  <p class="question-title multiple-choice-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input paragraph-answer"
                      type="text"
                      v-model="question.response"
                      :required="question.required"
                      stacked
                  ></b-form-input>
                </div>

                <div class="section question " v-if="question.question_type === 'Checkboxes'">
                  <p class="question-title checkboxes-title">{{ question.question }} ?</p>
                  <b-form-checkbox-group
                      class="checkbox-select"
                      :options="question.options"
                      v-model="question.response"
                      stacked
                  ></b-form-checkbox-group>

                </div>

                <div class="section question " v-if="question.question_type === 'Dropdown'">
                  <p class="question-title dropdown-title">{{ question.question }} ?</p>
                  <b-form-select
                      v-model="question.response"
                      class="dropdown-select"
                      :required="question.required"
                      :options="question.options"
                  ></b-form-select>
                </div>

                <div class="section question " v-if="question.question_type === 'Date'">
                  <p class="question-title short-answer-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input date-answer"
                      v-model="question.response"
                      :required="question.required"
                      type="date"
                  ></b-form-input>
                </div>

                <div class="section question " v-if="question.question_type === 'Time'">
                  <p class="question-title short-answer-title">{{ question.question }} ?</p>
                  <b-form-input
                      class="input time-answer"
                      v-model="question.response"
                      :required="question.required"
                      type="time"
                  ></b-form-input>
                </div>

              </div>

              <div v-if="question.type === 'title'" class="section question title-description">
                <p class="question-title title">{{ question.question }}</p>
                <p class="description">{{ question.description }}</p>
              </div>

              <div v-if="question.type === 'image'" class="section question image">
                <p class="question-title title">{{ question.question }}</p>
                <img :src="'https://yaformelbanna.we-work.pro/images/question_images/' + question.description">
              </div>

              <div v-if="question.type === 'video'" class="section question video">
                <p class="question-title title">{{ question.question }}</p>
                <iframe class="p-3" :src="question.description"></iframe>
              </div>

              <div v-else></div>

            </div>

          </div>

          <div class="d-flex justify-content-between">
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


          <b-button type="submit" class="submit">Submit form</b-button>

        </b-form>

      </div>

      <div class="form-view en animate__animated animate__backInLeft" v-if="form.form_type === 'card form'">

        <div v-if="form.image_header" class="form-image-header section">
          <img :src="form.image_header">
        </div>

        <div class="form-title section">
          <div class="titles">
            <p class="title">{{ form.header }}</p>
            <p class="description">{{ form.description }}</p>
          </div>
          <div class="logo">
            <img :src="form.logo">
          </div>
        </div>

        <b-form @submit.prevent="submit">
          <div class="section question">
            <p class="question-title short-answer-title">{{ form.questions[currentQuestion - 1].question }} ?</p>

            <div v-if="form.questions[currentQuestion - 1].type === 'question'">

              <b-form-input
                  v-if="form.questions[currentQuestion - 1].question_type === 'Short answer'"
                  v-model="form.questions[currentQuestion - 1].response"
                  class="input question-short-answer"
                  :required="form.questions[currentQuestion - 1].required"
                  type="text"
                  placeholder="Your answer"
              ></b-form-input>

              <b-form-input
                  v-if="form.questions[currentQuestion - 1].question_type === 'Name'"
                  v-model="form.questions[currentQuestion - 1].response"
                  class="input question-short-answer"
                  :required="form.questions[currentQuestion - 1].required"
                  type="text"
                  placeholder="Your answer"
              ></b-form-input>

              <b-form-input
                  v-if="form.questions[currentQuestion - 1].question_type === 'Email'"
                  v-model="form.questions[currentQuestion - 1].response"
                  class="input question-short-answer"
                  :required="form.questions[currentQuestion - 1].required"
                  type="text"
                  placeholder="Your answer"
              ></b-form-input>

              <b-form-input
                  v-if="form.questions[currentQuestion - 1].question_type === 'Number'"
                  v-model="form.questions[currentQuestion - 1].response"
                  class="input question-short-answer"
                  :required="form.questions[currentQuestion - 1].required"
                  type="number"
                  placeholder="Your answer"
              ></b-form-input>

              <b-form-input
                  v-if="form.questions[currentQuestion - 1].question_type === 'Phone number'"
                  v-model="form.questions[currentQuestion - 1].response"
                  class="input question-short-answer"
                  :required="form.questions[currentQuestion - 1].required"
                  type="text"
                  placeholder="Your answer"
              ></b-form-input>

              <b-form-input
                  v-if="form.questions[currentQuestion - 1].question_type === 'Paragraph'"
                  class="input paragraph-answer"
                  type="text"
                  :required="form.questions[currentQuestion - 1].required"
                  v-model="form.questions[currentQuestion - 1].response"
                  placeholder="Your answer"
              ></b-form-input>

              <b-form-radio-group
                  v-if="form.questions[currentQuestion - 1].question_type === 'Multiple choice'"
                  :required="form.questions[currentQuestion - 1].required"
                  v-model="form.questions[currentQuestion - 1].response"
                  :options="form.questions[currentQuestion - 1].options"
                  stacked
              ></b-form-radio-group>

              <b-form-checkbox-group
                  v-if="form.questions[currentQuestion - 1].question_type === 'Checkboxes'"
                  class="checkbox-select"
                  v-model="form.questions[currentQuestion - 1].response"
                  :options="form.questions[currentQuestion - 1].options"
                  stacked
              ></b-form-checkbox-group>

              <b-form-select
                  v-if="form.questions[currentQuestion - 1].question_type === 'Dropdown'"
                  class="dropdown-select"
                  v-model="form.questions[currentQuestion - 1].response"
                  :required="form.questions[currentQuestion - 1].questions[currentQuestion - 1].required"
                  :options="form.questions[currentQuestion - 1].options"
              ></b-form-select>

              <b-form-input
                  v-if="form.questions[currentQuestion - 1].question_type === 'Date'"
                  v-model="form.questions[currentQuestion - 1].response"
                  :required="form.questions[currentQuestion - 1].required"
                  class="input date-answer"
                  type="date"
              ></b-form-input>

              <b-form-input
                  :required="form.questions[currentQuestion - 1].required"
                  v-model="form.questions[currentQuestion - 1].response"
                  v-if="form.questions[currentQuestion - 1].question_type === 'Time'"
                  class="input date-answer"
                  type="time"
              ></b-form-input>

            </div>

            <div v-if="form.questions[currentQuestion - 1].type === 'title'" class="title-description">
              <p class="description">{{ form.questions[currentQuestion - 1].description }}</p>
            </div>

            <div v-if="form.questions[currentQuestion - 1].type === 'image'" class="image">
              <img :src="'https://yaformelbanna.we-work.pro/images/question_images/' + form.questions[currentQuestion - 1].description">
            </div>

            <div v-if="form.questions[currentQuestion - 1].type === 'video'" class="video">
              <iframe class="p-3" :src="form.questions[currentQuestion - 1].description"></iframe>
            </div>

            <div v-else></div>

          </div>

          <b-pagination-nav @change="checkFormComplete" v-model="currentQuestion" :link-gen="linkGen" :number-of-pages="form.questions.length" use-router></b-pagination-nav>

          <b-button v-if="formComplete" type="submit" class="submit mb-2">Submit form</b-button>

          <div class="d-flex justify-content-between">
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

        </b-form>

      </div>

    </div>
  </div>

  <div v-else>
    <div :class="'home animate__animated animate__fadeIn ' + form.style_theme + ' ' + form.font_family ">
      <div class="form-view en animate__animated animate__backInLeft">

        <div class="form-title section">
          <div class="titles">
            <p class="title">{{ form.header }}</p>
            <p class="description">{{ form.description }}</p>
          </div>
          <div class="logo">
            <img :src="form.logo">
          </div>
        </div>

        <div class="section question">
          <div v-if="form.is_quiz">
            {{ score }}
          </div>
          <div v-else>
            {{ form.msg }}
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  name: "FormView",
  data() {
    return {
      form: '',
      currentQuestion: '1',
      isLoading: false,
      formComplete: false,
      formSend: false,
      sendMessage: '',
      score: '',
    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    },
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/')
    }
    this.loadForm(this.$route.params.id)
  },
  methods: {
    checkFormComplete() {
      if (this.$route.query.question == this.form.questions.length) {
        this.formComplete = true
      }
    },
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

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch!');
        throw error;
      }

      this.form = responseData.data;

      this.isLoading = false;

    },
    linkGen(pageNum) {
      return `?question=${pageNum}`
    },
    async submit() {
      this.isLoading = true;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let answers = [];

      this.form.questions.forEach(question => {
        if (question.response) {
          answers.push({question_id: question.id, answer: question.response})
        }
      });

      let raw = JSON.stringify({
        "form_id": this.$route.params.id,
        "answers": answers
      });


      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://yaformelbanna.we-work.pro/api/submit-answer", requestOptions)
          .then(response => response.json())
          .then(result => {
            if (this.form.is_quiz) {
              this.score = result.msg
            }
            if (result.status) {
              this.sendMessage = result.msg
              this.formSend = true
            }
          })
          .catch(error => console.log('error', error));

      this.isLoading = false;

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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--var-second-color);
}

.section {
  margin: 20px 0;
  border-radius: 15px;
  border: 1px solid #c4c4c4;
}

.input, .dropdown-select {
  border: none;
  border-bottom: 2px dotted #dddddd;
}

.input:focus, .dropdown-select:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 2px solid var(--var-main-color);
}

.question {
  padding: 30px 20px;
  background-color: #FFFFFF;
}

.form-view {
  width: 60%;
  min-height: 100vh;
  padding: 20px;
}

.form-image-header {
  width: 100%;
  height: 180px;
}

.form-image-header img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}

.form-title {
  padding: 20px 15px;
  border-top: 8px solid var(--var-main-color);
  background-color: #FFFFFF;
  display: flex;
}

.form-title .titles {
  width: 70%;
}

.form-title .title {
  font-family: var(--var-font);
  font-size: 32px;
}

.form-title .description,
.title-description .description {
  font-size: 16px;
  padding: 0 10px;
}

.form-title .logo {
  width: 28%;
  margin-right: 2%;
  max-height: 100px;
}

.form-title .logo img {
  width: 100%;
  max-height: 100%;
  border-radius: 15px;
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

.question-short-answer {
  width: 240px;
}

.dropdown-select, .date-answer, .time-answer {
  width: 250px;
}

.image img {
  border-radius: 15px;
  width: 100%;
  max-height: 500px;
}

.submit {
  color: var(--var-main-color);
  background-color: #FFFFFF;
  border: 1px solid var(--var-main-color);
  border-radius: 8px;
  padding: 8px 20px;
}

.submit:hover {
  background-color: var(--var-main-color);
  color: #FFFFFF;
  border: 1px solid var(--var-main-color);
}

.ar {
  direction: rtl;
  text-align: right;
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
@media (max-width:1024px) {
  .form-view {
    width: 95%;
  }

  .form-title {
    display: flex;
    flex-direction: column;
  }

  .form-title .titles {
    width: 98%;
  }

  .form-title .logo {
    margin: 0 20px;
  }
}
</style>