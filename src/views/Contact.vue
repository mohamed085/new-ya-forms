<template>
  <div class="home animate__animated animate__fadeIn">
    <div class="nav">
      <Header></Header>
    </div>

    <main class="en animate__animated animate__backInLeft" v-if="getLang === 'en'">
      <div class="container">
        <div class="contact-content">
          <h2 class="mt-3">Contact Us</h2>
          <div class="contact">
            <div class="contact-form">
              <h3>Contact Form</h3>
              <div class="container">
                <b-form @submit.prevent="sendMail">
                  <b-form-input
                      class="mt-4"
                      v-model="contact.mail"
                      placeholder="Email address"
                      required
                  ></b-form-input>
                  <b-form-input
                      class="mt-4"
                      v-model="contact.subject"
                      placeholder="Subject"
                      required
                  ></b-form-input>
                  <b-form-input
                      class="mt-4"
                      v-model="contact.message"
                      placeholder="Message"
                      required
                  ></b-form-input>
                  <b-button type="submit" class="mt-4 btn">Submit Message</b-button>
                </b-form>
              </div>
            </div>
            <div class="contact-data">
              <div class="container">
                <div class="data">
                  <div class="d-flex">
                    <i class="fas fa-map-marker-alt"></i>
                    <h5>Location :</h5>
                  </div>
                  <p>{{ location }}</p>
                </div>
                <div class="data">
                  <div class="d-flex">
                    <i class="fas fa-phone-alt"></i>
                    <h5>Phone: </h5>
                  </div>
                  <p>{{ phone }}</p>
                </div>
                <div class="data">
                  <div class="d-flex">
                    <i class="far fa-envelope"></i>
                    <h5>Email: </h5>
                  </div>
                  <p>{{ email }}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <main class="ar animate__animated animate__backInRight" v-else-if="getLang === 'ar'">
      <div class="container">
        <div class="contact-content">
          <h2 class="mt-3">اتصل بنا</h2>
          <div class="contact">
            <div class="contact-form">
              <h3>نموذج الاتصال</h3>
              <div class="container">
                <b-form @submit="sendMail">
                  <b-form-input
                      class="mt-4"
                      v-model="contact.mail"
                      placeholder="عنوان البريد الإلكتروني"
                      required
                  ></b-form-input>
                  <b-form-input
                      class="mt-4"
                      v-model="contact.subject"
                      placeholder="موضوع"
                      required
                  ></b-form-input>
                  <b-form-input
                      class="mt-4"
                      v-model="contact.message"
                      placeholder="رسالة"
                      required
                  ></b-form-input>
                  <b-button class="btn">تقديم رسالة</b-button>
                </b-form>
              </div>
            </div>
            <div class="contact-data">
              <div class="container">
                <div class="data">
                  <div class="d-flex">
                    <i class="fas fa-map-marker-alt"></i>
                    <h5>الموقع :</h5>
                  </div>
                  <p>{{ locationAr }}</p>
                </div>
                <div class="data">
                  <div class="d-flex">
                    <i class="fas fa-phone-alt"></i>
                    <h5>رقم الهاتف :</h5>
                  </div>
                  <p>{{ phone }}</p>
                </div>
                <div class="data">
                  <div class="d-flex">
                    <i class="far fa-envelope"></i>
                    <h5>البريد الالكتروني :</h5>
                  </div>
                  <p>{{ email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="footer">
      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
export default {
  name: "Contact",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      location: 'Al Khobar, Sadui Arabi',
      locationAr: 'الخبر ، المملكة العربية السعودية',
      phone: '015616306',
      email: 'test@gmail.com',
      error: '',
      contact: {
        mail: '',
        subject: '',
        message: ''
      }
    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  methods: {
    sendMail() {
      let url = `https://ya-forms-api.herokuapp.com/api/contactus`

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        "mail": this.contact.mail,
        "subject": this.contact.subject,
        "message": this.contact.message
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(url, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => this.error = error);

    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');


.nav {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

main {
  margin: 80px 0 50px;
}

.contact-content {
  padding: 10px 0;
}

.contact-content h2 {
  font-family: 'Bebas Neue', cursive;
  margin-bottom: 20px;
}

.contact {
  display: flex;
  justify-content: center;
}

.contact-form {
  padding: 20px 10px;
  width: 70%;
  margin-right: 4%;
  border: 1px solid #dddddd;
  background-color: #f3f3f3;
}

.contact-form h3 {
  margin-left: 18px;
  font-family: 'Bebas Neue', cursive;
}

.contact-data {
  width: 25%;
}

.data i {
  color: #9d55a0;
  margin: auto 10px auto 0;
}

.data h5 {
  margin: auto 0;
}

.data p {
  color: #5A5C6C;
  margin: 10px 0 30px 30px;
}

.btn {
  margin-top: 10px;
  border: none;
  color: #FFFFFF;
  background-color: #9d55a0;
}

.btn:hover {
  color: #9d55a0;
  background-color: #dddddd;
}

.ar .contact-content {
  text-align: right;
  direction: rtl;

}

.ar h2, .ar h3 {
  font-family: 'Cairo', sans-serif;
}

.ar .contact-data i {
  margin-left: 10px;
}
.ar .contact-data p {
  margin-left: 0px;
  margin-right: 30px;
}



@media (max-width:1024px) {
  .contact {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .contact-form,
  .contact-data {
    margin-bottom: 40px;
    width: 99%;
    padding: 5px 10px;
  }
}

</style>