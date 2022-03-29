<template>
  <div>
    <input type="file" accept="image/" class="hidden" ref="file" @change="change">
    <div class="avatar">
      <b-avatar class="avatar" :src="src" size="15rem"></b-avatar>
      <div class="div-btn">
        <button type="reset" class="btn" @click="browse">
          <i class="fas fa-camera"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  data() {
    return {
      src: this.defaultSrc,
      file: ''
    }
  },
  props: {
    defaultSrc: {
      type: String,
      default: 'https://placekitten.com/300/300'
    },
    value: File
  },
  methods: {
    browse() {
      this.$refs.file.click();
    },
    change(e) {
      this.file = e.target.files[0];
      this.$emit('input', this.file);
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        this.src = e.target.result;
      }

    }
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.btn {
  border: none;
}

.avatar {
  position: relative;
  display: inline-block;
}

.div-btn {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.div-btn i {
  color: #FFFFFF;
  font-size: 150%;
}

.btn:focus {
  outline: none;
}



</style>