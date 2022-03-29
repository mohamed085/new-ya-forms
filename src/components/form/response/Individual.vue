<template>
  <div class="individual">
    <div>
      <b-modal v-model="modalShow" title="Ya form">
        <p class="my-4">{{ error }}</p>
      </b-modal>
    </div>

    <div v-if="getLang === 'en'" class="form-view en animate__animated animate__backInLeft">
      <div v-if="submitId.length !== 0" class="section pagination-section">
        <div class="overflow-auto">
          <b-pagination-nav @input="loadResponse()" v-model="currentSubmit" :link-gen="linkGen" :number-of-pages="submitId.length" use-router></b-pagination-nav>
        </div>
      </div>

      <main class="main-spinner" v-if="isLoading">
        <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
      </main>

      <div v-else>
        <div class="d-flex justify-content-between">
          <div class="csv">
            <button @click="exportResponseAsCSV(submitId[currentSubmit - 1])" class="phone-btn">Export response as excel</button>
          </div>
          <div>
            <b-button class="phone-btn" @click="deleteResponse(submitId[currentSubmit - 1])">Delete response</b-button>
          </div>

        </div>

        <div v-if="form.image_header" class="form-image-header question-section section">
          <img :src="form.image_header">
        </div>

        <div class="form-title section question-section">
          <div class="titles">
            <p class="cannot-edited">Responses cannot be edited</p>
            <p class="title">{{ form.header }}</p>
            <p class="description">{{ form.description }}</p>
          </div>
          <div class="logo">
            <img :src="form.logo">
          </div>
        </div>

        <div v-for="question in form.questions" :key="question.id">

          <div v-if="question.type === 'question'">

            <div v-if="question.question_type === 'Phone number'" class="section question-section question">
              <p class="question-title short-answer-title">{{ question.question }} ?</p>
              <b-form-input
                  v-if="question.answers[0]"
                  class="input question-short-answer"
                  type="text"
                  placeholder="Your answer"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

            <div class="section question " v-if="question.question_type === 'Short answer'">
              <p class="question-title short-answer-title">{{ question.question }} ?</p>

              <b-form-input
                  v-if="question.answers[0]"
                  class="input question-short-answer"
                  type="text"
                  placeholder="Your answer"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

            <div class="question-title section question-section question " v-if="question.question_type === 'Paragraph'">
              <p class="paragraph-title">{{ question.question }} ?</p>
              <b-form-input
                  v-if="question.answers[0]"
                  class="input paragraph-answer"
                  type="text"
                  placeholder="Your answer"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

            <div class="question-title section question-section question " v-if="question.question_type === 'Email'">
              <p class="paragraph-title">{{ question.question }} ?</p>
              <b-form-input
                  v-if="question.answers[0]"
                  class="input paragraph-answer"
                  type="text"
                  placeholder="Your answer"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

            <div class="question-title section question-section question " v-if="question.question_type === 'Name'">
              <p class="paragraph-title">{{ question.question }} ?</p>
              <b-form-input
                  v-if="question.answers[0]"
                  class="input paragraph-answer"
                  type="text"
                  placeholder="Your answer"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

            <div class="question-title section question-section question " v-if="question.question_type === 'Number'">
              <p class="paragraph-title">{{ question.question }} ?</p>
              <b-form-input
                  v-if="question.answers[0]"
                  class="input paragraph-answer"
                  type="text"
                  placeholder="Your answer"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

            <div class="section question-section question " v-if="question.question_type === 'Multiple choice'">
              <p class="question-title multiple-choice-title">{{ question.question }} ?</p>
              <b-form-radio-group
                  v-if="question.answers[0]"
                  :options="question.options"
                  stacked
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-radio-group>
            </div>

            <div class="section question-section question " v-if="question.question_type === 'Checkboxes'">
              <p class="question-title checkboxes-title">{{ question.question }} ?</p>
              <div v-if="question.answers[0]">
                <b-form-checkbox-group
                    v-for="answer in question.answers" :key="answer.id"
                    class="checkbox-select"
                    :options="question.options"
                    stacked
                    v-model="answer.answer"
                    disabled
                ></b-form-checkbox-group>

              </div>

            </div>

            <div class="section question-section question " v-if="question.question_type === 'Dropdown'">
              <p class="question-title dropdown-title">{{ question.question }} ?</p>
              <b-form-select
                  v-if="question.answers[0]"
                  class="dropdown-select"
                  :options="question.options"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-select>


            </div>

            <div class="section question-section question " v-if="question.question_type === 'Date'">
              <p class="question-title short-answer-title">{{ question.question }} ?</p>
              <b-form-input
                  v-if="question.answers[0]"
                  class="input date-answer"
                  type="date"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

            <div class="section question-section question " v-if="question.question_type === 'Time'">
              <p class="question-title short-answer-title">{{ question.question }} ?</p>
              <b-form-input
                  v-if="question.answers[0]"
                  class="input time-answer"
                  type="time"
                  v-model="question.answers[0].answer"
                  disabled
              ></b-form-input>
            </div>

          </div>

          <div v-if="question.type === 'title'" class="section question-section question title-description">
            <p class="question-title title">{{ question.question }}</p>
            <p class="description">{{ question.description }}</p>
          </div>

          <div v-if="question.type === 'image'" class="section question-section question image">
            <p class="question-title title">{{ question.question }}</p>
            <img :src="question.description">
          </div>

          <div v-if="question.type === 'video'" class="section question-section question video">
            <p class="question-title title">{{ question.question }}</p>
            <iframe class="p-3" :src="question.description"></iframe>
          </div>

          <div v-else></div>

        </div>

        <p class="Submitted">Submitted {{ form.updated_at }}</p>

      </div>

      <div v-if="submitId.length == 0">
        <div class="section question-section no-response">
          No response yet
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Individual",
  data() {
    return {
      isLoading: false,
      currentSubmit: 1,
      submitId: [],
      form: '',
      modalShow: false,
      error: ''
    }
  },
  created() {
    this.loadFormResponses(this.$route.params.id);
  },
  methods: {
    linkGen(pageNum) {
      return `?submit=${pageNum}`
    },

    async exportResponseAsCSV(id) {
      this.isLoading = true;

      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = 'https://yaformelbanna.we-work.pro/api/auth/export-excel-for-one-response/' + id.id

      await fetch(url, requestOptions)
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
          .then(url => {
            window.open(url, '_blank');
            URL.revokeObjectURL(url);
          })
          .catch(error => {
            this.error = error
            this.modalShow = true
          })
      ;

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
      let url = `https://yaformelbanna.we-work.pro/api/auth/get-submits-for-from/` + id;

      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status) {
              this.submitId = responseData.data
            } else {
              this.error = responseData.msg
              this.modalShow = true
            }
          })
          .catch(error => {
            this.error = error
            this.modalShow = true
          })

      await this.loadResponse();
      this.isLoading = false;

    },

    async loadResponse() {
      this.isLoading = true;

      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = 'https://yaformelbanna.we-work.pro/api/auth/get-individual-responses/' + this.submitId[this.currentSubmit - 1].id
      await fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
              this.form = result.data.form
            })
            .catch(error => console.log('error', error));

      this.isLoading = false
    },

    async deleteResponse(id) {
      this.isLoading = true;
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      let url = 'https://yaformelbanna.we-work.pro/api/auth/delete-submit/' + id.id

      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status) {
              this.error = responseData.msg
              this.$router.push('/form-view/' + this.form.id)

            } else {
              this.error = responseData.msg
              this.modalShow = true
            }
          })
          .catch(error => {
            this.error = error
            this.modalShow = true
          })

      ro
      this.isLoading = false;
    },

  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang']
    },
  },
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
}

.pagination-section {
  padding: 0 8px;
  margin: 0;
  height: 40px;
}

.form-image-header {
  width: 100%;
  height: 180px;
  margin: 30px 0;
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

.form-title {
  padding: 20px 15px;
  border-top: 8px solid var(--var-main-color);
  background-color: #FFFFFF;
  display: flex;
}

.form-title .titles {
  width: 70%;
}

.form-title .cannot-edited {
  margin: 0;
  padding: 0 ;
  color: #777777;
  font-size: 12px;
}

.form-title .title {
  font-family: var(--var-font);
  font-size: 32px;
  padding-bottom: 0;
  margin-bottom: 0;
}

.form-title .description,
.title-description .description {
  font-size: 16px;
  padding: 0 5px;
  margin: 0;

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


.no-response {
  color: #777777;
  display: flex;
  justify-content: center;
}

.Submitted {
  color: rgba(0,0,0,.54);
  display: flex;
  font-size: 14px;
  font-style: italic;
  justify-content: flex-end;
  padding: 0 10px 10px 0;
}

.phone-btn {
  color: var(--var-main-color);
  background: none;
  border: 1px solid var(--var-main-color);
  border-radius: 7px;
  padding: 8px 15px;
  margin: 15px 10px 5px ;
}


.phone-btn:hover {
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
</style>