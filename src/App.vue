<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tryLogin')
    console.log("App -- isAuthenticated = " , this.$store.getters.isAuthenticated)
  }
}
</script>


<style>

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

input {
  border: none;
}

input:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.pagination > li > a {
  background-color: white;
  color: #333333;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.pagination > li > a:focus,
.pagination > li > a:hover,
.pagination > li > span:focus,
.pagination > li > span:hover {
  color: var(--var-main-color);
  background-color: #eee;
  border-color: #ddd;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.pagination > .active > a {
  color: white;
  background-color: var(--var-main-color) !Important;
  border: solid 1px var(--var-main-color) !Important;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.pagination > .active > a:hover {
  background-color: var(--var-main-color) !Important;
  border: solid 1px var(--var-main-color);
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
