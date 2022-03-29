<template>
  <div class="home animate__animated animate__fadeIn">

    <div class="nav">
      <profile-header
          :name="user.name"
          :id=$store.getters.token
      ></profile-header>
    </div>

    <main class="main-spinner" v-if="isLoading">
      <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
    </main>

    <main class="main-content en animate__animated animate__backInLeft" v-if="getLang === 'en'">
      <div class="main-content-container container">
        <div class="img">
          <b-form @submit.prevent="editAvatar">
            <div>
              <input type="file" accept="image/" class="hidden" ref="file" @change="change">
              <div class="avatar">
                <b-avatar class="avatar" :src="user.img_src" size="15rem"></b-avatar>
                <div class="div-btn">
                  <button type="reset" class="avatar-btn" @click="browse">
                    <i class="fas fa-camera"></i>
                  </button>
                </div>
              </div>
            </div>
            <b-button class="mt-2 btn" type="submit">Save photo</b-button>
          </b-form>
        </div>
        <div class="personalInfo p-4">
          <h2>Edit Personal Info</h2>
          <b-form>
            <div class="form-group">
              <label>Your name</label>
              <div>
                <b-form-input v-model="user.name"></b-form-input>
              </div>
            </div>
            <div class="form-group">
              <label>Your email</label>
              <div>
                <b-form-input v-model="user.email"></b-form-input>
              </div>
            </div>

            <div class="form-group dob">
              <label>Your birthdate</label>
              <div class="select-dob">
                <b-form-select v-model="user.year_dob" :options="YearOptions"></b-form-select>
                <b-form-select v-model="user.month_dob" :options="monthOption"></b-form-select>
                <b-form-select v-model="user.day_dob" :options="dayOption"></b-form-select>
              </div>
            </div>

            <div class="form-group">
              <label>Your Country</label>
              <div>
                <b-form-select class="w-100" v-model="user.country" :options="countryOptions"></b-form-select>
              </div>
            </div>

            <div class="form-group">
              <label>Your Gender</label>
              <div>
                <b-form-select class="w-100" v-model="user.gender" :options="genderOptions"></b-form-select>
              </div>
            </div>

            <div class="form-group">
              <label>Your phone</label>
              <div>
                <b-form-input v-model="user.phone"></b-form-input>
              </div>
            </div>

            <b-button class="mt-3 btn mb-5" @click="editPersonalInfo">Edit personal information</b-button>
          </b-form >
        </div>
      </div>
    </main>

    <main class="main-content ar animate__animated animate__backInRight" v-if="getLang === 'ar'">
      <div class="main-content-container container">
        <div class="img">
          <b-form @submit="editAvatar">
            <div>
              <input type="file" accept="image/" class="hidden" ref="file" @change="change">
              <div class="avatar">
                <b-avatar class="avatar" :src="user.img_src" size="15rem"></b-avatar>
                <div class="div-btn">
                  <button type="reset" class="avatar-btn" @click="browse">
                    <i class="fas fa-camera"></i>
                  </button>
                </div>
              </div>
            </div>
            <b-button class="mt-2 btn" type="submit">تعديل الصورة الشخصية</b-button>
          </b-form>
        </div>
        <div class="personalInfo  p-4">
          <h2 class="mb-2" style="font-family: 'Cairo', sans-serif;">تعديل البيانات الشحصية</h2>
          <b-form @submit="editPersonalInfo">
            <div class="form-group">
              <label>الاسم</label>
              <div>
                <b-form-input v-model="user.name"></b-form-input>
              </div>
            </div>
            <div class="form-group">
              <label>الايميل</label>
              <div>
                <b-form-input v-model="user.email"></b-form-input>
              </div>
            </div>
            <div class="form-group dob">
              <label>تاريح الميلاد</label>
              <div class="select-dob">
                <b-form-select v-model="user.year_dob" :options="YearOptions"></b-form-select>
                <b-form-select v-model="user.month_dob" :options="monthOptionAr"></b-form-select>
                <b-form-select v-model="user.day_dob" :options="dayOptionAr"></b-form-select>
              </div>
            </div>

            <div class="form-group">
              <label>البلد</label>
              <div>
                <b-form-select class="w-100" v-model="user.country" :options="countryOptionsAr"></b-form-select>
              </div>
            </div>

            <div class="form-group">
              <label>الجنس</label>
              <div>
                <b-form-select class="w-100" v-model="user.gender" :options="genderOptions"></b-form-select>
              </div>
            </div>

            <div class="form-group">
              <label>رقم الهاتف</label>
              <div>
                <b-form-input v-model="user.phone"></b-form-input>
              </div>
            </div>

            <b-button class="mt-3 btn" type="submit">تعديل المعلومات الشخصية</b-button>
          </b-form >
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import ProfileHeader from "../../components/profile/ProfileHeader";
import store from "@/store";
import router from "@/router";

export default {
  name: "ProfileEdit",
  components: {
    ProfileHeader,
  },
  async created() {
    if (!store.getters.isAuthenticated) {
      await router.push('/login')
    }
    await this.loadUser();
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  data() {
    return {
      user: '',
      src: "",
      file: '',
      error: '',
      YearOptions:  [
        { value: null, text: 'Year' },
        { value: '1960', text: '1960' },
        { value: '1961', text: '1961' },
        { value: '1962', text: '1962' },
        { value: '1963', text: '1963' },
        { value: '1964', text: '1964' },
        { value: '1965', text: '1965' },
        { value: '1966', text: '1966' },
        { value: '1967', text: '1967' },
        { value: '1968', text: '1968' },
        { value: '1969', text: '1969' },
        { value: '1970', text: '1970' },
        { value: '1971', text: '1971' },
        { value: '1972', text: '1972' },
        { value: '1973', text: '1973' },
        { value: '1974', text: '1974' },
        { value: '1975', text: '1975' },
        { value: '1976', text: '1976' },
        { value: '1977', text: '1977' },
        { value: '1978', text: '1978' },
        { value: '1979', text: '1979' },
        { value: '1980', text: '1980' },
        { value: '1981', text: '1981' },
        { value: '1982', text: '1982' },
        { value: '1983', text: '1983' },
        { value: '1984', text: '1984' },
        { value: '1985', text: '1985' },
        { value: '1986', text: '1986' },
        { value: '1987', text: '1987' },
        { value: '1988', text: '1988' },
        { value: '1989', text: '1989' },
        { value: '1990', text: '1990' },
        { value: '1991', text: '1991' },
        { value: '1992', text: '1992' },
        { value: '1993', text: '1993' },
        { value: '1994', text: '1994' },
        { value: '1995', text: '1995' },
        { value: '1996', text: '1996' },
        { value: '1997', text: '1997' },
        { value: '1998', text: '1998' },
        { value: '1999', text: '1999' },
        { value: '2000', text: '2000' },
        { value: '2001', text: '2001' },
        { value: '2002', text: '2002' },
        { value: '2003', text: '2003' },
        { value: '2004', text: '2004' },
        { value: '2005', text: '2005' },
        { value: '2006', text: '2006' },
        { value: '2007', text: '2007' },
        { value: '2008', text: '2008' },
        { value: '2009', text: '2009' },
        { value: '2010', text: '2010' },
        { value: '2011', text: '2011' },
        { value: '2012', text: '2012' },
        { value: '2013', text: '2013' },
        { value: '2014', text: '2014' },
        { value: '2015', text: '2015' },
        { value: '2016', text: '2016' },
        { value: '2017', text: '2017' },
        { value: '2018', text: '2018' },
        { value: '2019', text: '2019' },
        { value: '2020', text: '2020' },
        { value: '2021', text: '2021' },
        { value: '2022', text: '2022' },
      ],
      YearOptionsAr:  [
        { value: null, text: 'سنه' },
        { value: '1960', text: '1960' },
        { value: '1961', text: '1961' },
        { value: '1962', text: '1962' },
        { value: '1963', text: '1963' },
        { value: '1964', text: '1964' },
        { value: '1965', text: '1965' },
        { value: '1966', text: '1966' },
        { value: '1967', text: '1967' },
        { value: '1968', text: '1968' },
        { value: '1969', text: '1969' },
        { value: '1970', text: '1970' },
        { value: '1971', text: '1971' },
        { value: '1972', text: '1972' },
        { value: '1973', text: '1973' },
        { value: '1974', text: '1974' },
        { value: '1975', text: '1975' },
        { value: '1976', text: '1976' },
        { value: '1977', text: '1977' },
        { value: '1978', text: '1978' },
        { value: '1979', text: '1979' },
        { value: '1980', text: '1980' },
        { value: '1981', text: '1981' },
        { value: '1982', text: '1982' },
        { value: '1983', text: '1983' },
        { value: '1984', text: '1984' },
        { value: '1985', text: '1985' },
        { value: '1986', text: '1986' },
        { value: '1987', text: '1987' },
        { value: '1988', text: '1988' },
        { value: '1989', text: '1989' },
        { value: '1990', text: '1990' },
        { value: '1991', text: '1991' },
        { value: '1992', text: '1992' },
        { value: '1993', text: '1993' },
        { value: '1994', text: '1994' },
        { value: '1995', text: '1995' },
        { value: '1996', text: '1996' },
        { value: '1997', text: '1997' },
        { value: '1998', text: '1998' },
        { value: '1999', text: '1999' },
        { value: '2000', text: '2000' },
        { value: '2001', text: '2001' },
        { value: '2002', text: '2002' },
        { value: '2003', text: '2003' },
        { value: '2004', text: '2004' },
        { value: '2005', text: '2005' },
        { value: '2006', text: '2006' },
        { value: '2007', text: '2007' },
        { value: '2008', text: '2008' },
        { value: '2009', text: '2009' },
        { value: '2010', text: '2010' },
        { value: '2011', text: '2011' },
        { value: '2012', text: '2012' },
        { value: '2013', text: '2013' },
        { value: '2014', text: '2014' },
        { value: '2015', text: '2015' },
        { value: '2016', text: '2016' },
        { value: '2017', text: '2017' },
        { value: '2018', text: '2018' },
        { value: '2019', text: '2019' },
        { value: '2020', text: '2020' },
        { value: '2021', text: '2021' },
        { value: '2022', text: '2022' },
      ],
      monthOption:  [
        { value: null, text: 'Month' },
        { value: 'January ', text: 'January' },
        { value: 'February ', text: 'February' },
        { value: 'March ', text: 'March' },
        { value: 'April ', text: 'April' },
        { value: 'May ', text: 'May' },
        { value: 'June ', text: 'June' },
        { value: 'July ', text: 'July' },
        { value: 'August ', text: 'August' },
        { value: 'September ', text: 'September' },
        { value: 'October ', text: 'October' },
        { value: 'November ', text: 'November' },
        { value: 'December ', text: 'December' },
      ],
      monthOptionAr:  [
        { value: null, text: 'شهر' },
        { value: 'January ', text: 'يناير' },
        { value: 'February ', text: 'فبراير' },
        { value: 'March ', text: 'مارس' },
        { value: 'April ', text: 'ابريل' },
        { value: 'May ', text: 'مايو' },
        { value: 'June ', text: 'يونيو' },
        { value: 'July ', text: 'يوليو' },
        { value: 'August ', text: 'اغسطس' },
        { value: 'September ', text: 'سبتمبر' },
        { value: 'October ', text: 'اكتوبر' },
        { value: 'November ', text: 'نوفمبر' },
        { value: 'December ', text: 'ديسمبر' },
      ],
      dayOption:  [
        { value: null, text: 'Day' },
        { value: '1', text: '1' },
        { value: '12', text: '2' },
        { value: '13', text: '3' },
        { value: '14', text: '4' },
        { value: '15', text: '5' },
        { value: '16', text: '6' },
        { value: '17', text: '7' },
        { value: '18', text: '8' },
        { value: '19', text: '9' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' },
        { value: '13', text: '13' },
        { value: '14', text: '14' },
        { value: '15', text: '15' },
        { value: '16', text: '16' },
        { value: '17', text: '17' },
        { value: '18', text: '18' },
        { value: '19', text: '19' },
        { value: '20', text: '20' },
        { value: '21', text: '21' },
        { value: '22', text: '22' },
        { value: '23', text: '23' },
        { value: '24', text: '24' },
        { value: '25', text: '25' },
        { value: '26', text: '26' },
        { value: '27', text: '27' },
        { value: '28', text: '28' },
        { value: '29', text: '29' },
        { value: '30', text: '30' },
        { value: '31', text: '31' },
      ],
      dayOptionAr:  [
        { value: null, text: 'يوم' },
        { value: '1', text: '1' },
        { value: '12', text: '2' },
        { value: '13', text: '3' },
        { value: '14', text: '4' },
        { value: '15', text: '5' },
        { value: '16', text: '6' },
        { value: '17', text: '7' },
        { value: '18', text: '8' },
        { value: '19', text: '9' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' },
        { value: '13', text: '13' },
        { value: '14', text: '14' },
        { value: '15', text: '15' },
        { value: '16', text: '16' },
        { value: '17', text: '17' },
        { value: '18', text: '18' },
        { value: '19', text: '19' },
        { value: '20', text: '20' },
        { value: '21', text: '21' },
        { value: '22', text: '22' },
        { value: '23', text: '23' },
        { value: '24', text: '24' },
        { value: '25', text: '25' },
        { value: '26', text: '26' },
        { value: '27', text: '27' },
        { value: '28', text: '28' },
        { value: '29', text: '29' },
        { value: '30', text: '30' },
        { value: '31', text: '31' },
      ],
      genderOptionsAr: [
        { value: null, text: 'النوع' },
        { value: 'ذكر', text: 'ذكر' },
        { value: 'انثي', text: 'انثي' },
      ],
      genderOptions: [
        { value: null, text: 'Gender' },
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
      ],
      countryOptions: [
        { value: null, text: 'Country' },
        { value: 'Egypt', text: 'Egypt' },
        { value: 'Saudi Arabia', text: 'Saudi Arabia' },
        { value: 'Algeria', text: 'Algeria' },
        { value: 'Bahrain', text: 'Bahrain' },
        { value: 'Iraq', text: 'Iraq ' },
        { value: 'Jordan', text: 'Jordan ' },
        { value: 'Lebanon', text: 'Lebanon' },
        { value: 'Morocco', text: 'Morocco' },
        { value: 'Oman', text: 'Oman' },
        { value: 'Qatar', text: 'Qatar' },
      ],
      countryOptionsAr: [
        { value: null, text: 'البلد' },
        { value: 'Egypt', text: 'مصر' },
        { value: 'Saudi Arabia', text: 'السعودية' },
        { value: 'Algeria', text: 'الجزائر' },
        { value: 'Bahrain', text: 'البحرين' },
        { value: 'Iraq', text: 'العراق ' },
        { value: 'Jordan', text: 'الاردن ' },
        { value: 'Lebanon', text: 'لبنان ' },
        { value: 'Morocco', text: 'المغرب ' },
        { value: 'Oman', text: 'سلطنة عًمان ' },
        { value: 'Qatar', text: 'قطر' },
      ],
      businessCategoryOptions: [
        { value: null, text: 'Business Category' },
      ],
      businessCategoryOptionsAr: [
        { value: null, text: 'نوع العمل' },
      ],
    }
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
        this.user.img_src = e.target.result;
      }

    },
    async loadUser() {
      this.isLoading = true
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch("https://yaformelbanna.we-work.pro/api/auth/get-my-info", requestOptions);

      const responseData = await response.json();

      this.user = responseData;

      this.isLoading = false

    },
    async editAvatar() {
      this.isLoading = true
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let formdata = new FormData();

      formdata.append("img_src", this.file);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      await fetch("https://yaformelbanna.we-work.pro/api/auth/update-my-info", requestOptions)
          .then(response => response.json())
          .then((result) => {
            localStorage.setItem("avatar", this.user.img_src)
            this.$router.push("/profile");
          }).catch(reason => {
            this.error = reason
            console.log(reason)
          })
      this.isLoading = false

    },
    async editPersonalInfo() {
      this.isLoading = true
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let formdata = new FormData();

      formdata.append("name", this.user.name);
      formdata.append("email", this.user.email);
      formdata.append("phone", this.user.phone);
      formdata.append("country", this.user.country);
      formdata.append("year_dob", this.user.year_dob);
      formdata.append("month_dob",this.user.month_dob);
      formdata.append("day_dob", this.user.day_dob);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://yaformelbanna.we-work.pro/api/auth/update-my-info", requestOptions)
          .then(response => response.json())
          .then(() => {
            this.isLoading = false

            this.$router.push("/profile");
          }).catch(reason => {
            this.error = reason
        })



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
  width: 100%;
  z-index: 1000;
}

main {
  margin-top: 90px;
}

.main-content {
  width: 100%;
}

.main-content-container {
  display: flex;
}

.main-content-container .img {
  padding: 10px 0;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}

.main-content-container .img .avatar {
  width: 250px;
  height: 250px;
}

.main-content-container .personalInfo {
  width: 68%;
}

.main-content-container .personalInfo h2 {
  font-family: 'Bebas Neue', cursive;
}

.main-content-container .form-group {
  display: flex;
  margin-top: 10px;
}

.main-content-container .select-dob {
  display: flex;
}

.main-content-container .form-group label {
  width: 20%;
  margin: auto 0;
  font-weight: 600;
}

.main-content-container .form-group div {
  width: 79%;
}


.btn {
  background-color: #9d55a0;
  color: #FFFFFF;
  border: none;
}

.btn:hover {
  background-color: #FFFFFF;
  color: #9d55a0;
  border: none;
}

.ar {
  direction: rtl;
  text-align: right;
}

.hidden {
  display: none;
}

.avatar-btn {
  border: none;
  background: none;
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
  color: #111111;
  font-size: 150%;
}

.avatar-btn:focus {
  outline: none;
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
@media (max-width:1024px)  {
  main {
    margin-bottom: 40px;
  }

  .home {
    min-height: 100vh;
  }

  .main-content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .main-content-container .img,
  .main-content-container .personalInfo {
    width: 100%;
  }


  .main-content-container .img form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .main-content-container .img .avatar {
    width: 100px;
    height: 100px;
  }

  .main-content-container .personalInfo form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .dob {
    display: flex;
    flex-direction: column;
  }

  .main-content-container .form-group {
    display: flex;
    flex-direction: column;
  }

  .main-content-container .form-group label,
  .main-content-container .form-group div {
    width: 100%;
  }
}
</style>

