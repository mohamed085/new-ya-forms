<template>
  <div class="summary">
    <div v-if="getLang === 'en'" class="form-view en animate__animated animate__backInLeft">
      <div class="form-content">

        <div v-for="question in questions" :key="question.id">
          <div v-if="question.type === 'question'">
            <div class="section question-section" v-if="question.question_type === 'Short answer'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Name'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Email'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Number'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Paragraph'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Date'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Time'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Phone number'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.distinct_answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.this_answer_count > 1"> - Repeated {{ answer.this_answer_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Multiple choice'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <v-chart class="chart" :option="question.option" />
            </div>

            <div class="section question-section" v-if="question.question_type === 'Checkboxes'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <v-chart class="chart" :option="question.option" />
            </div>

            <div class="section question-section" v-if="question.question_type === 'Dropdown'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} responses</p>
              <v-chart class="chart" :option="question.option" />
            </div>
          </div>

      </div>
    </div>
    </div>

    <div v-if="getLang === 'ar'" class="form-view en animate__animated animate__backInRight">
      <div class="form-content">

        <div v-for="question in questions" :key="question.id">
          <div v-if="question.type === 'question'">
            <div class="section question-section" v-if="question.question_type === 'Short answer'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Name'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Email'">
              <p class="question-title">{{ question.question }} ?</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Number'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Paragraph'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Date'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Time'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Phone number'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <p class="answers">Answers</p>
              <p class="answer short-answer" v-for="answer in question.answers" :key="answer.answer">
                {{ answer.answer }} <span style="color: var(--var-main-color)" v-if="answer.repeat_count > 1"> - تكرار {{ answer.repeat_count }}</span>
              </p>
            </div>

            <div class="section question-section" v-if="question.question_type === 'Multiple choice'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <v-chart class="chart" :option="question.option" />
            </div>

            <div class="section question-section" v-if="question.question_type === 'Checkboxes'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <v-chart class="chart" :option="question.option" />
            </div>

            <div class="section question-section" v-if="question.question_type === 'Dropdown'">
              <p class="question-title">{{ question.question }} ؟</p>
              <p class="response-num">{{ question.question_response_count }} ردود</p>
              <v-chart class="chart" :option="question.option" />
            </div>



          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "Summary",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "dark"
  },
  data() {
    return {
      questions: [],
      isLoading: false
    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang']
    },
  },
  created() {
    this.loadFormResponses(this.$route.params.id);
  },
  methods: {
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
          .then(result => {
            result.data.questions.forEach(question => {
              if (question.question_type === "Short answer" || question.question_type === "Paragraph" ||
                  question.question_type === "Time" || question.question_type === "Date" ||
                    question.question_type === "Phone number" || question.question_type === "Number" ||
                  question.question_type === "Name" || question.question_type === "Email") {

                this.questions.push(question)
              }

              if (question.question_type === "Multiple choice" || question.question_type === "Dropdown" ||
                  question.question_type === "Checkboxes") {

                let values = [];
                let data = [];

                question.options.forEach(option => {
                  values.push(option.value)
                  data.push({value: 0, name: option.value})
                })

                question.distinct_answers.forEach(answer => {
                  data.forEach(value => {
                    if (value.name == answer.answer) {
                      value.value = answer.this_answer_count
                    }
                  })
                })

                let newQuestion = {
                  id: question.id,
                  question: question.question,
                  description: question.description,
                  question_type: question.question_type,
                  question_responses_count: question.question_responses_count,
                  type: question.type,
                  required: question.required,
                  option: {
                    title: {
                      text: question.question,
                      left: "center"
                    },
                    tooltip: {
                      trigger: "item",
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                      orient: "vertical",
                      left: "left",
                      data: values
                    },
                    series: [
                      {
                        name: question.question,
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: data,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                          }
                        }
                      }
                    ]
                  },

                }

                this.questions.push(newQuestion)
              }
            })

            console.log(this.questions)
          })
          .catch(error => console.log('error', error));

      this.isLoading = false;

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

.chart {
  width: 95%;
  height: 400px;
  margin: 10px auto;
}

.ar {
  direction: rtl;
  text-align: right;
}
</style>