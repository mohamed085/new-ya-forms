<template>
  <div class="home animate__animated animate__fadeIn">

    <div class="nav">
      <profile-header
          :name="user.name"
          :id="user.id"
      ></profile-header>
    </div>

    <main class="main-spinner" v-if="isLoading">
      <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
    </main>

    <div v-else>
      <main class="main-content en animate__animated animate__backInLeft" v-if="getLang === 'en'">
        <div class="main-content-container container">
          <div class="img">
            <b-button class="avatar-btn" v-b-modal.modal-1>
              <b-avatar class="avatar" :src=user.img_src></b-avatar>
            </b-button>

            <b-modal id="modal-1" title="Profile image" ok-only>
              <div class="img-container">
                <img class="model-img" :src=user.img_src>
              </div>
            </b-modal>
            <h2 class="name mt-2">{{user.name}}</h2>
          </div>
          <div class="personalInfo p-4">
            <h2>Personal Info</h2>
            <div class="container">
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-user-edit"></i>
                <h4>Name: <span>{{user.name}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-user-edit"></i>
                <h4>E-mail: <span>{{user.email}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-baby"></i>
                <h4>Birth of date: <span>{{user.year_dob + " " + user.month_dob + " " + user.day_dob}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="far fa-flag"></i>
                <h4>Country: <span>{{user.country}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-venus-mars"></i>
                <h4>Gender: <span>{{user.gender}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-mobile-alt"></i>
                <h4>Mobile number: <span>{{user.phone}}</span></h4>
              </div>
            </div>
          </div>
        </div>

        <div v-if="user.accountType === 'businessAccount'" class="main-content-container container">
          <div class="img">
            <b-button class="avatar-btn" v-b-modal.modal-1>
              <b-avatar class="avatar" :src=user.companyImgSrc></b-avatar>
            </b-button>

            <b-modal id="modal-1" title="Profile image" ok-only>
              <div class="img-container">
                <img class="model-img" :src=user.companyImgSrc>
              </div>
            </b-modal>
            <h2 class="name mt-2">{{user.companyName}}</h2>
          </div>
          <div class="personalInfo p-4">
            <h2>Company Info</h2>
            <div class="container">
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-user-edit"></i>
                <h4>Name: <span>{{user.companyName}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-baby"></i>
                <h4>Company number of employees: <span>{{user.companyNumOfEmployees}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="far fa-flag"></i>
                <h4>Country: <span>{{user.companyCountry}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-venus-mars"></i>
                <h4>Company business category: <span>{{user.companyBusinessCategory}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-mobile-alt"></i>
                <h4>Company url: <span>{{user.companyUrl}}</span></h4>
              </div>
            </div>
          </div>
        </div>

      </main>

      <main class="main-content ar animate__animated animate__backInRight" v-if="getLang === 'ar'">
        <div class="main-content-container container">
          <div class="img">
            <b-button class="avatar-btn" v-b-modal.modal-1>
              <b-avatar class="avatar" :src=user.img_src></b-avatar>
            </b-button>

            <b-modal id="modal-1" title="الصورة الشخصية" ok-only>
              <div class="img-container">
                <img class="model-img" :src=user.imgSrc>
              </div>
            </b-modal>
            <h2 class="name mt-3">{{user.name}}</h2>
          </div>
          <div class="personalInfo p-4">
            <h2 class="mb-4" style="font-family: 'Cairo', sans-serif;">معلومات شخصية</h2>
            <div class="container">
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-user-edit"></i>
                <h4>الاسم: <span>{{user.name}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-user-edit"></i>
                <h4>البريد الالكتروني: <span>{{user.email}}</span></h4>
              </div>

              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-baby"></i>
                <h4>تاريخ الميلاد: <span>{{user.yearDOB + " " + user.monthDOB + " " + user.dayBOB}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="far fa-flag"></i>
                <h4>البلد: <span>{{user.country}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-venus-mars"></i>
                <h4>الجنس: <span>{{user.gender}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-mobile-alt"></i>
                <h4>رقم الهاتف: <span>{{user.phone}}</span></h4>
              </div>
            </div>
          </div>
        </div>

        <div v-if="user.accountType === 'businessAccount'" class="main-content-container container">
          <div class="img">
            <b-button class="avatar-btn" v-b-modal.modal-1>
              <b-avatar class="avatar" :src=user.companyImgSrc></b-avatar>
            </b-button>

            <b-modal id="modal-1" title="Profile image" ok-only>
              <div class="img-container">
                <img class="model-img" :src=user.companyImgSrc>
              </div>
            </b-modal>
            <h2 class="name mt-2">{{user.companyName}}</h2>
          </div>
          <div class="personalInfo p-4">
            <h2 class="mb-4" style="font-family: 'Cairo', sans-serif;">معلومات الشركة</h2>
            <div class="container">
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-user-edit"></i>
                <h4>الاسم: <span>{{user.companyName}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-baby"></i>
                <h4>عدد موظفي الشركة: <span>{{user.companyNumOfEmployees}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="far fa-flag"></i>
                <h4>البلد: <span>{{user.companyCountry}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-venus-mars"></i>
                <h4>فئة أعمال الشركة:<span>{{user.business_category}}</span></h4>
              </div>
              <div class="personalInfo-row mt-4 mb-4">
                <i class="fas fa-mobile-alt"></i>
                <h4>رابط الشركة: <span>{{user.url}}</span></h4>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>

  </div>
</template>

<script>
import ProfileHeader from "../../components/profile/ProfileHeader";
import store from "@/store";
import router from "@/router";
export default {
  name: "ProfileIndex",
  components: {
    ProfileHeader
  },
  async created() {
    if (!store.getters.isAuthenticated) {
      router.push('/')
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
      isLoading: false,
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
    }
  },
  methods: {
    async loadUser() {
      this.isLoading = true
      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch("https://yaformelbanna.we-work.pro/api/auth/get-my-info", requestOptions);

      const responseData = await response.json();

      this.user = responseData;

      this.isLoading = false

    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');

main {
  margin-top: 90px;
}

.nav {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
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
  margin: 10px 0;
}

.main-content-container .personalInfo h2 {
  font-family: 'Bebas Neue', cursive;
}

.main-content-container .personalInfo .personalInfo-row {
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #9d55a0;
}

.main-content-container .personalInfo .personalInfo-row i {
  color: #9d55a0;
  margin: auto 5px;
  width: 5%;
}

.main-content-container .personalInfo .personalInfo-row h4 {
  margin: auto 5px;
}

.main-content-container .personalInfo .personalInfo-row h4 span {
  color: #5A5C6C;
}

.avatar-btn {
  border-radius: 50%;
  background: none;
  border: none;
  padding: 0;
}

.img-container {
  height: 65vh;
}

.model-img {
  height: 100%;
  width: 100%;
  border-radius: 15px;
}

.model button {
  background-color: #9d55a0;
}

.ar {
  direction: rtl;
  text-align: right;
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
@media (max-width:1024px) {
  .home {
    margin-bottom: 200px;
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


  .main-content-container .img .avatar {
    width: 200px;
    height: 200px;
  }

  .main-content-container .personalInfo .personalInfo-row h4 {
    display: block;
  }
}

</style>