<template>
  <div class="question">
    <div class="section pagination-section"
         v-if="form.questions.length > 0">
      <div class="overflow-auto">
        <b-pagination-nav v-model="currentQuestion" :link-gen="linkGen" :number-of-pages="form.questions.length" use-router></b-pagination-nav>
      </div>
    </div>

    <div v-if="getLang === 'en'" class="form-view en animate__animated animate__backInLeft">
      <div class="form-content">
        <div class="section question-section">
          <div class="question-header">
            <p>Question {{ currentQuestion }}</p>
            <div v-if="!viewOptions" class="options">
              <span @click="displayOptions" v-if="form.questions[currentQuestion - 1].question_type === 'Multiple choice'" class="view-options">View options <i class="fas fa-chevron-down"></i></span>
              <span @click="displayOptions" v-if="form.questions[currentQuestion - 1].question_type === 'Checkboxes'" class="view-options">View options <i class="fas fa-chevron-down"></i></span>
              <span @click="displayOptions" v-if="form.questions[currentQuestion - 1].question_type === 'Dropdown'" class="view-options">View options <i class="fas fa-chevron-down"></i></span>
            </div>
            <div v-else class="options">
              <span @click="displayOptions" v-if="form.questions[currentQuestion - 1].question_type === 'Multiple choice'" class="view-options">Hide options <i class="fas fa-chevron-up"></i></span>
              <span @click="displayOptions" v-if="form.questions[currentQuestion - 1].question_type === 'Checkboxes'" class="view-options">Hide options <i class="fas fa-chevron-up"></i></span>
              <span @click="displayOptions" v-if="form.questions[currentQuestion - 1].question_type === 'Dropdown'" class="view-options">Hide options <i class="fas fa-chevron-up"></i></span>

            </div>
          </div>
          <p class="question-title">{{ form.questions[currentQuestion - 1].question }} ?</p>
          <div v-if="viewOptions" class="options-display">
            <p class="option" v-for="option in form.questions[currentQuestion - 1].options" :key="option.id">
              {{ option.value }}
            </p>
          </div>
        </div>
        <div v-if="form.questions[currentQuestion - 1].distinct_answers" class="response-content">
          <h4 class="section question-section">Answers</h4>
          <div class="section question-section" v-for="answer in form.questions[currentQuestion - 1].distinct_answers" :key="answer.id">
            {{ answer.answer }}
            <div class="section-footer">

              <b-dropdown :text="answer.this_answer_count + ' response'"
                          variant="light" class="m-2">
                <b-dropdown-item @click="getSubmitNum(related_answer.submit_id)" v-for="related_answer in answer.related_answers" :key="related_answer.id">Response: {{ related_answer.submit_id }}</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="section question-section no-response">
            No response yet
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import router from "../../../router";

export default {
  name: "Question",
  data() {
    return {
      form: {
        questions: [{
          question_type: ''
        }]
      },
      submitId: [],
      currentQuestion: 1,
      viewOptions: false,
    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang']
    },
  },
  created() {
    this.loadFormResponses(this.$route.params.id);
    this.loadFormSubmits(this.$route.params.id);
  },
  methods: {
    linkGen(pageNum) {
      return `?question=${pageNum}`
    },
    displayOptions() {
      this.viewOptions = !this.viewOptions
    },
    getSubmitNum(submitId) {
      this.submitId.forEach((value, index) => {
        if (value.id == submitId) {
          index ++;
          router.push('/form/response/' + this.$route.params.id + '/individual?submit=' + index)
        }
      })
    },
    async loadFormSubmits(id) {
      this.isLoading = true;
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let url = `https://yaformelbanna.we-work.pro/api/auth/get-submits-for-from/` + id;

      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status) {
              this.submitId = responseData.data
            } else {
              console.log(responseData.msg)
              this.error = responseData.msg
              this.modalShow = true
            }
          })
          .catch(error => {
            console.log(error)
            this.error = error
            this.modalShow = true
          })

      this.isLoading = false;

    },
    async loadFormResponses(id) {

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
          .then(responseData => {
            if (responseData.status) {
              this.form = responseData.data
            } else {
              this.error = responseData.msg
              this.modalShow = true
            }
          })
          .catch(error => {
            this.error = error
            this.modalShow = true
          })

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

.section {
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  background-color: #FFFFFF;
}

.question-section {
  margin: 20px 0;
  padding: 20px;
}

.question-title, .answers {
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 16px;
  letter-spacing: .1px;
  line-height: 24px;
  color: #202124;
  font-weight: 400;
  word-break: break-word;
  margin-bottom: 0;
}

.response-num {
  font-family: Roboto,Arial,sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .3px;
  line-height: 16px;
  color: #70757a;
  margin-top: 0;
  padding: 5px;
}

.answer {
  margin: 10px;
  font-family: Roboto, Arial, sans-serif;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: .2px;
  line-height: 20px;
  color: #202124;
  text-align: justify;
}

.pagination-section {
  padding: 0 8px;
  margin: 0;
  height: 40px;
}

.page-item.active .page-link {
  background-color: #9d55a0;
  border-color: #9d55a0;
}

.question-section {
  margin: 20px 0;
}

.question-header {
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
  color: #202124;
  min-width: 0%;
  display: flex;
  justify-content: space-between;
}

.view-options {
  color: #1a73e8;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .25px;
  line-height: 36px;
  margin: auto 10px;
  cursor: pointer;
}

.options-display {
  margin-top: 15px;
}

.option {
  margin: 5px 10px;
  padding: 0;
}

.section-footer {
  border-top: 1px solid #c4c4c4;
  padding-top: 10px;
  margin-top: 20px;
}

.no-response {
  display: flex;
  justify-content: center;
  color: #777777;
}

.ar {
  direction: rtl;
  text-align: right;
}
</style>