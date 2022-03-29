<template>
  <div class="animate__animated animate__fadeIn">
    <main class="en animate__animated animate__backInLeft" v-if="getLang === 'en'">
      <router-link to="/" class="img">
        <img src="../../assets/images/ya_logo_lg.png">
      </router-link>
      <div class="main" v-if="isLoading">
        <h2 class="loading">Loading...</h2>
        <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
      </div>
      <div class="main" v-if="!isLoading">
        <h2 class="login">Login now</h2>
        <div class="valid" v-if="error">
          {{ errorMsgEn }}
        </div>
        <form @submit.prevent="login">
          <div class="input">
            <span><i class="fas fa-at"></i></span>
            <input v-model.trim="user.email" type="email" placeholder="Email address" >
          </div>
          <div class="input">
            <span><i class="fas fa-unlock-alt"></i></span>
            <input v-model.trim="user.password" type="password" placeholder="Password">
          </div>
          <button class="submit" type="submit">Log in</button>
        </form>
        <router-link class="forgetPassword" to="/forgot-password">Forgot your password?</router-link>
      </div>
    </main>

    <main class="ar animate__animated animate__backInRight" v-if="getLang === 'ar'">
      <router-link to="/" class="img">
        <img src="../../assets/images/ya_logo_lg.png">
      </router-link>
      <div class="main" v-if="isLoading">
        <h2 class="loading">جار التحميل ...</h2>
        <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
      </div>
      <div class="main" v-if="!isLoading">
        <h2 class="login">تسجيل الدخول الان</h2>
        <div class="valid" v-if="error">
          {{ errorMsgAr }}
        </div>
        <form @submit.prevent="login">
          <div class="input">
            <span><i class="fas fa-at"></i></span>
            <input v-model.trim="user.email" type="email" placeholder="البريد الالكتروني">
          </div>
          <div class="input">
            <span><i class="fas fa-unlock-alt"></i></span>
            <input v-model.trim="user.password" type="password" placeholder="الرقم السري">
          </div>
          <button class="submit" type="submit">تسجيل الدخول</button>
        </form>
        <router-link class="forgetPassword" to="/forgot-password">هل نسيت كلمة المرور ؟</router-link>
      </div>
    </main>

    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";
import Footer from "@/components/auth/Footer";

export default {
  name: "Login",
  components: {
    Footer
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isLoading: false,
      error: false,
      errorMsgAr: '',
      errorMsgEn: '',
    }
  },
  created() {
    if (store.getters.isAuthenticated) {
      router.push('/')
    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  methods: {
    async login() {
      this.error = false
      this.isLoading = true;

      try {
        await  this.$store.dispatch('login', {
          email: this.user.email,
          password: this.user.password
        })

        await router.push('/')

      } catch (e) {
        this.error = true
        this.errorMsgAr = "اسم المستخدم او الرقم السري غير صحيح من فضلك تاكد من البيانات.";
        this.errorMsgEn = "The username or password is incorrect, please check the data.";
      }

      this.isLoading = false
    }
  }}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

.ar {
  direction: rtl;
}


.valid {
  border: 1px solid #ff6b6b;
  background: #ff6b6b;
  border-radius: 5px;
  color: #FFFFFF;
  padding: 10px 30px;
}

main {
  margin: 20px 0 80px;
  width: 100%;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.img {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.img img {
  height: 250px;
  width: 250px;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.loading {
  color: #9d55a0;
  font-family: 'Bebas Neue', cursive;
}

.ar .loading {
  font-family: 'Cairo', sans-serif;
}

.login {
  color: #9d55a0;
  font-family: 'Oswald', sans-serif;
  font-size: 34px;
}

.ar .login {
  font-family: 'Cairo', sans-serif;
  font-size: 34px;
}

.input {
  border-bottom: solid 1px #9c6d9e2a;
  width: 50%;
}

.input span {
  color: #9d55a0;
}

.input input {
  margin: 10px;
  width: 80%;
  padding: 8px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-clip: padding-box;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  text-rendering: auto;
}

.submit {
  padding: 10px 20px;
  cursor: pointer;
  color: #e8d4e9;
  display: block;
  background-color: #9d55a0;
  box-shadow: 0 0 2px grey;
  font-weight: 400;
  border: 1px solid transparent;
  line-height: 1.5;
  border-radius: .25rem;
  margin: 20px;
}

.submit:hover {
  color: #9d55a0;
  background-color: #e8d4e9;
}

.forgetPassword {
  cursor: pointer;
  font-weight: 400;
  color: #007bff;
  padding: .25rem .5rem;
  line-height: 1.5;
}

.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  margin-top: 20px;
}



@media (max-width:1024px)  {

  main .img img{
    width: 200px;
    height: 200px;
  }

  form {
    width: 100%;
  }

  .input {
    width: 70%;
  }

}

</style>