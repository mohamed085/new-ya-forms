<template>
  <div class="logo d-flex">
    <img src="../../assets/images/ya_logo_lg.png">
    <h2 v-if="getLang === 'en'" class="en">Ya-Forms</h2>
    <h2 v-else-if="getLang === 'ar'" class="ar">يافورمز</h2>
  </div>

</template>

<script>
export default {
  name: "Logo",
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');

.logo h2 {
  margin: auto 3px;
  color: #2c3e50;
  padding: 0;
}

.logo h2:hover {
  color: #9d55a0;
}

.logo .en {
  font-family: 'Bebas Neue', cursive;
}

.logo .ar {
  font-family: 'Cairo', sans-serif;
}

.logo img {
  margin: auto 3px;
  width: 50px;
  height: 50px;
}

h2:hover {
  color: #9d55a0;
}

@media (max-width:1024px) {
  .logo h2 {
    font-size: 100%;
  }

  .logo img {
    width: 40px;
    height: 40px;
  }
}

</style>