<template>
  <div>
    <div class="body en" v-if="getLang === 'en'">
      <div class="backdrop"></div>
      <transition name="dialog">
        <dialog open >
          <header class="d-flex">
            <h2>Send form</h2>
            <i @click="close" class="fas fa-times"></i>
          </header>
          <section>
            <div class="send-via">
              <p>Send via</p>
              <div :class="' ' + activeShare ">
                <i @click="share" class="far fa-envelope"></i>
              </div>
              <div :class="' ' + activeLink ">
                <i @click="link" class="fas fa-link"></i>
              </div>
            </div>
            <div v-if="activeShare" class="send-content">
              <main class="main-spinner" v-if="isLoading">
                <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
              </main>
              <div v-else>
                <b-badge variant="danger" class="pt-3 pb-3 pe-5 ps-5" v-if="error">{{ this.error }}</b-badge>
                <b-badge variant="success" class="pt-3 pb-3 pe-5 ps-5" v-if="result">{{ this.result }}</b-badge>
                <b-form @submit.prevent="send">
                  <b-form-group
                      class="label"
                      id="input-group-1"
                      label="Email address:"
                      label-for="input-1"
                  >
                    <b-form-input
                        class="input"
                        id="input-1"
                        v-model="email"
                        type="email"
                        placeholder="Enter email"
                        required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                      class="label"
                      id="input-group-2"
                      label="Subject:"
                      label-for="input-2"
                  >
                    <b-form-input
                        class="input"
                        id="input-2"
                        v-model="subject"
                        type="text"
                        placeholder="Enter subject"
                        required
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group
                      class="label"
                      id="input-group-3"
                      label="Message:"
                      label-for="input-3"
                  >
                    <b-form-input
                        class="input"
                        id="input-3"
                        v-model="message"
                        type="text"
                        placeholder="Enter message"
                        required
                    ></b-form-input>
                  </b-form-group>
                  <div class="send-div-btn">
                    <b-button class="send-btn" type="submit">Send</b-button>
                  </div>
                </b-form>
              </div>
            </div>
            <div v-else-if="activeLink" class="link-content">
              <b-form-group
                  class="label"
                  id="input-group-1"
                  label="Link:"
                  label-for="input-1"
              >
                <b-form-input
                    class="input"
                    id="input-1"
                    v-model="url"
                ></b-form-input>
              </b-form-group>
            </div>
          </section>
          <menu>
            <b-button class="close-btn" @click="close">Close</b-button>
          </menu>
        </dialog>
      </transition>
    </div>

    <div class="body ar" v-else-if="getLang === 'ar'">
      <div class="backdrop"></div>
      <transition name="dialog">
        <dialog open>
          <header class="d-flex">
            <h2>ارسال الفورم</h2>
            <i @click="close" class="fas fa-times"></i>
          </header>
          <section>
            <div class="send-via">
              <p>ترسل عبر</p>
              <div :class="' ' + activeShare ">
                <i @click="share" class="far fa-envelope"></i>
              </div>
              <div :class="' ' + activeLink ">
                <i @click="link" class="fas fa-link"></i>
              </div>
            </div>
            <div v-if="activeShare" class="send-content">
              <b-form @submit.prevent="send">
                <b-form-group
                    class="label"
                    id="input-group-1"
                    label="عنوان البريد الإلكتروني:"
                    label-for="input-1"
                >
                  <b-form-input
                      class="input"
                      id="input-1"
                      v-model="email"
                      type="email"
                      placeholder="أدخل البريد الإلكتروني"
                      required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                    class="label"
                    id="input-group-2"
                    label="موضوع:"
                    label-for="input-2"
                >
                  <b-form-input
                      class="input"
                      id="input-2"
                      v-model="subject"
                      type="text"
                      placeholder="أدخل الموضوع"
                      required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                    class="label"
                    id="input-group-3"
                    label="رسالة:"
                    label-for="input-3"
                >
                  <b-form-input
                      class="input"
                      id="input-3"
                      v-model="message"
                      type="text"
                      placeholder="أدخل رسالة"
                      required
                  ></b-form-input>
                </b-form-group>
                <div class="send-div-btn">
                  <b-button type="submit" class="send-btn" @click="send">إرسال</b-button>
                </div>
              </b-form>
            </div>
            <div v-else-if="activeLink" class="link-content">
              <b-form-group
                  class="label"
                  id="input-group-1"
                  label="اللينك: "
                  label-for="input-1"
              >
                <b-form-input
                    class="input"
                    id="input-1"
                    v-model="url"
                ></b-form-input>
              </b-form-group>
            </div>
          </section>
          <menu>
            <b-button class="close-btn" @click="close">اغلاق</b-button>
          </menu>
        </dialog>
      </transition>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  name: "SendForm",
  props: ['formId', 'theme',],
  emits: ['close-send'],
  data() {
    return {
      activeShare: true,
      activeLink: false,
      email: '',
      subject: '',
      message: '',
      url: 'http://yaforms/form/' + this.formId,
      error: null,
      result: null,
      isLoading: false,
    }
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/login')
    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  methods: {
    close() {
      this.$emit('close-send', false);
    },
    share() {
      this.activeLink = false;
      this.activeShare = true;
    },
    link() {
      this.activeLink = true;
      this.activeShare = false;
    },
    async send() {
      this.isLoading = true
      let myHeaders = new Headers();
      let token = this.$store.getters.token;

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authToken", token);

      let raw = JSON.stringify({
        "message": this.message,
        "subject": this.subject,
        "email": this.email,
        "link": this.url
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };


     await fetch("https://yaformelbanna.we-work.pro/api/auth/send-form", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            if (result.status) {
              this.result = result.msg
            } else {
              this.error = result.msg
            }
          })

      this.isLoading = false
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

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 10vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: var(--var-main-color);
  color: white;
  width: 100%;
  padding: 10px 20px;
}

.ar {
  direction: rtl;
  text-align: right;
}

.ar header i {
  margin: auto auto auto 10px;
  cursor: pointer;
}

header h2 {
  font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
}

header i {
  margin: auto 10px auto auto;
  cursor: pointer;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.send-via {
  display: flex;
  border-bottom: 1px solid #dddddd;
  padding: 0;
  margin: 0;
}

.send-via p {
  margin: 20px;
  font-weight: 500;
}

.send-via div {
  padding: 0 20px;
  margin: 0 10px;
  display: flex;
  align-items: center;
}

.send-via i {
  font-size: 140%;
  cursor: pointer;
}

.send-via i:hover {
  color: var(--var-main-color);
}

.true {
  border-bottom: 3px solid var(--var-main-color);
}

.send-content,
.link-content {
  padding: 20px 30px;
}

.input {
  border: none;
  border-bottom: 1px solid #777777;
  margin: 10px 0;
}

.input:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 2px solid var(--var-main-color);
}

.send-content .send-div-btn {
  display: flex;
  justify-content: center;
}

.send-btn {
  width: 60%;
  border-radius: 10px;
  color: var(--var-main-color);
  border: 1px solid var(--var-main-color);
  background-color: #FFFFFF;
  padding: 10px 0;
}

.send-btn:hover {
  color: #FFFFFF;
  border: 1px solid var(--var-main-color);
  background-color: var(--var-main-color);
}

.close-btn {
  background-color: var(--var-main-color);
  border: none;
}

.close-btn:hover {
  background-color: #FFFFFF;
  color: var(--var-main-color);
  border: none;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 25rem);
    width: 50rem;
  }
}

</style>