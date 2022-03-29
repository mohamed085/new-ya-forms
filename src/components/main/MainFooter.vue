<template>
  <div class="en animate__animated animate__backInLeft" v-if="getLang === 'en'">
    <div class="footer">
      <div class="content">
        <div class="copyright">
          <p>Copyright © 2020 Ya Forms, All Rights Reserved. | Developed By : We Group Pro</p>
        </div>
        <div class="languages">
          <span @click="setLang('en')" class="lang d-flex">
            <img src="../../assets/images/en-logo.png">
            <p>English</p>
          </span>
          <span @click="setLang('ar')" class="lang d-flex">
            <img src="../../assets/images/ar-logo.png">
            <p>عربي</p>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="ar animate__animated animate__backInRight" v-else-if="getLang === 'ar'">
    <div class="footer">
      <div class="content">
        <div class="copyright">
          <p>© جميع حقوق النشر محفوظة لشركة Ya Forms | قام بالتطوير : We Group Pro</p>
        </div>
        <div class="languages">
          <span @click="setLang('en')" class="lang d-flex">
          <img src="../../assets/images/en-logo.png">
          <p>English</p>
          </span>
          <span @click="setLang('ar')" class="lang d-flex">
          <img src="../../assets/images/ar-logo.png">
          <p>عربي</p>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "MainFooter",
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  methods: {
    setLang(lang) {
      this.$store.dispatch('main/setLang', lang);
    }
  }

}
</script>

<style scoped>
.ar {
  direction: rtl;
}

.footer {
  background: #FFFFFF;
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.content {
  width: 90%;
  display: flex;
  justify-content: space-between;
}

.copyright {
  color: #777777;
}

.copyright p {
  margin: auto 0;
  font-size: 80%;
}

.languages {
  display: flex;
  margin: auto 0;
}

.languages span {
  font-size: 14px;
  color: #111111;
  text-decoration: none;
  cursor: pointer;
}

.languages span:hover {
  color: #9d55a0;
}

.lang img {
  margin: auto 5px;
}

.lang p {
  margin: auto 0;
}


@media (max-width:1024px) {
  .copyright {
    display: none;
  }

  .content {
    margin-left: auto;
  }
}

</style>