<template>
  <router-link v-if="addForm" class="form-content" to="/create-form">
    <div class="form-content">
      <div class="form-img">
        <i class="fas fa-plus"></i>
      </div>
      <div class="form-footer">
        <p v-if="getLang === 'en'">Blank</p>
        <p v-if="getLang === 'ar'">فارغ</p>
      </div>
    </div>
  </router-link>
  <router-link v-else-if="addTemplate" class="form-content" to="/create-template">
    <div class="form-content">
      <div class="form-img">
        <i class="fas fa-plus"></i>
      </div>
      <div class="form-footer">
        <p v-if="getLang === 'en'">Add new template</p>
        <p v-if="getLang === 'ar'">انشاء نموذج جديد</p>
      </div>

    </div>
  </router-link>
  <router-link v-else-if="quizForm" class="form-content" to="/form-quiz">
    <div class="form-content">
      <div class="form-img">
        <i class="fas fa-file"></i>
      </div>
      <div class="form-footer">
        <p v-if="getLang === 'en'">Create new quiz</p>
        <p v-if="getLang === 'ar'">إنشاء اختبار جديد</p>
      </div>

    </div>
  </router-link>
  <router-link v-else-if="displayForm" class="form-content" :to="'/template/' + id">
    <div class="form-content">
      <div class="form-img">
        <img :src="imgSrc">
      </div>
      <div class="form-footer">
        <p>{{ title }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Form",
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    imgSrc: {
      type: String,
    },
    addForm: {
      type: String,
      required: false,
    },
    quizForm: {
      type: String,
      required: false,
    },
    addTemplate: {
      type: String,
      required: false,
    },
    displayForm: {
      type: String,
      required: false,
    },
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
}
</script>

<style scoped>
a {
  color: #111111;
  text-decoration: none;
  height: 123px;
  width: 164px;
  margin: 0;
  padding: 0;
}

a:hover {
  color: #9d55a0;
  text-decoration: none;
}

a:hover .form-img {
  border: 1px solid #9d55a0;
}

a:hover .form-footer p {
  color: #9d55a0;
}

.form-content {
  height: 153px;
  width: 174px;
  margin: 10px;
}

.form-img {
  padding: 5px;
  width: 95%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dddddd;
}

.form-img i {
  font-size: 200%;
  color: #9d55a0;
}

.form-img img {
  width: 100%;
  height: 100%;
}

.form-footer p {
  font-weight: 500;
  color: #202124;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 14px;
  height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 5px 10px;
}

</style>