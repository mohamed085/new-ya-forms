<template>
  <div class="home animate__animated animate__fadeIn">
    <div class="nav">
      <Header></Header>
    </div>

    <main>
      <div class="body p-4 en animate__animated animate__backInLeft" v-if="getLang === 'en'">

        <div class="selectAccountType" v-if="selectAccountType">
          <div class="body p-4 en animate__animated animate__backInLeft">
            <div class="header">
              <h1>Account Scope</h1>
            </div>
            <div class="accounts">
              <button @click="addAccountType('individual')">
                <div class="accountType">
                  <i style="font-size: 50px; margin-bottom: 10px" class="fas fa-male"></i>
                  <span>Individual Account</span>
                </div>
              </button>
              <button @click="addAccountType('business')">
                <div class="accountType">
                  <i style="font-size: 50px; margin-bottom: 10px" class="fas fa-building"></i>
                  <span>Business Account</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="individualAccount" v-if="individualAccount">
          <div class="body en animate__animated animate__backInLeft">
            <div class="header">
              <h1>Personal Account</h1>
            </div>
            <p v-if="individualAccountErrorEn" class="valid">{{ individualAccountErrorEn }}</p>
            <div class="form">
              <div class="form-group">
                <i class="i fas fa-user-edit"></i>
                <b-form-input v-model="user.name" placeholder="Name"></b-form-input>
              </div>
              <div class="form-group dob">
                <i class="i fas fa-baby"></i>
                <b-form-select v-model="user.yearDOB" :options="YearOptions"></b-form-select>
                <b-form-select v-model="user.monthDOB" :options="monthOption"></b-form-select>
                <b-form-select v-model="user.dayBOB" :options="dayOption"></b-form-select>
              </div>
              <div class="form-group">
                <i class="i fas fa-venus-mars"></i>
                <b-form-select class="w-100" v-model="user.gender" :options="genderOptions"></b-form-select>
              </div>
              <div class="form-group">
                <i class="i far fa-flag"></i>
                <b-form-select class="w-100" v-model="user.country" :options="countryOptions"></b-form-select>
              </div>
              <div class="form-group">
                <i class="i fas fa-mobile-alt"></i>
                <b-form-input type="text" v-model="user.phone" placeholder="Mobile number"></b-form-input>
              </div>
              <div class="form-button d-flex flex-row justify-content-around">
                <button @click="resetIndividualAccount" class="btn"><i class="fas fa-arrow-left"></i> Prev</button>
                <button @click="addAccountIndividualAccount" class="btn">Next <i class="fas fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div class="addPasswordAndEmail" v-if="addPasswordAndEmail">
          <div class="body en animate__animated animate__backInLeft">
            <main class="main-content">
              <div class="main-content-container">
                <div class="personalInfo p-4">
                  <div class="header">
                    <h1>Email Address & Password</h1>
                  </div>
                  <div v-if="isLoading">
                    <p class="authenticating">Loading...</p>
                    <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
                  </div>
                  <p class="valid" v-if="error">{{ addPasswordAndEmailErrorEn }}</p>
                  <div v-if="!isLoading" class="form">
                    <div class="form-group">
                      <i class="i fas fa-building"></i>
                      <b-form-input v-model="user.email" placeholder="Email address"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-venus-mars"></i>
                      <b-form-input v-model="user.password" type="password" placeholder="Password"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-users"></i>
                      <b-form-input @input="confirmPassword" type="password" v-model="user.confirmPassword" placeholder="Confirm password"></b-form-input>
                    </div>
                    <p class="valid mt-2" v-if="confirmPasswordErrorEn">{{ confirmPasswordErrorEn }}</p>
                    <div class="form-button d-flex flex-row justify-content-around">
                      <button @click="sendForm" class="btn">Add account</button>
                    </div>
                  </div >
                </div>
              </div>
            </main>
          </div>

        </div>

        <div class="businessAccount" v-if="businessAccount">
          <div class="body en animate__animated animate__backInLeft">
            <main class="main-content">
              <div class="main-content-container container">
                <div class="img">
                  <b-form @submit="uploadPhoto">
                    <avatar></avatar>
                    <b-button class="btn" type="submit">Upload photo</b-button>
                  </b-form>
                </div>
                <div class="personalInfo">
                  <div class="header">
                    <h1>Company Details</h1>
                  </div>
                  <p v-if="businessAccountErrorEn" class="valid">{{ businessAccountErrorEn }}</p>
                  <div class="form">
                    <div class="form-group">
                      <i class="i fas fa-building"></i>
                      <b-form-input v-model="user.companyName" placeholder="Company Name"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-venus-mars"></i>
                      <b-form-select class="w-100" v-model="user.companyBusinessCategory" :options="businessCategoryOptions"></b-form-select>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-users"></i>
                      <b-form-input type="number" v-model="user.companyNumOfEmployees" placeholder="Number Of Employees"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i far fa-flag"></i>
                      <b-form-select class="w-100" v-model="user.companyCountry" :options="countryOptions"></b-form-select>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-building"></i>
                      <b-form-input v-model="user.companyUrl" placeholder="Company Web Site"></b-form-input>
                    </div>
                    <b-button class="btn" @click="addCompany">Add Company</b-button>
                  </div >
                </div>
              </div>
            </main>
          </div>

        </div>
      </div>
      <div class="body p-4 ar animate__animated animate__backInRight" v-if="getLang === 'ar'">

        <div class="selectAccountType" v-if="selectAccountType">
          <div class="body p-4 ar animate__animated animate__backInRight">
            <div class="header">
              <h1>نطاق الحساب</h1>
            </div>
            <div class="accounts">
              <button @click="addAccountType('individual')">
                <div class="accountType">
                  <i style="font-size: 50px; margin-bottom: 10px" class="fas fa-male"></i>
                  <span>حساب فرد</span>
                </div>
              </button>
              <button @click="addAccountType('business')">
                <div class="accountType">
                  <i style="font-size: 50px; margin-bottom: 10px" class="fas fa-building"></i>
                  <span>حساب شركة</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="individualAccount" v-if="individualAccount">
          <div class="body ar animate__animated animate__backInRight">
            <div class="header">
              <h1>حساب شخصي</h1>
            </div>
            <p v-if="individualAccountErrorAr" class="valid">{{ individualAccountErrorAr }}</p>
            <div class="form">
              <div class="form-group">
                <i class="i fas fa-user-edit"></i>
                <b-form-input v-model="user.name" placeholder="الاسم"></b-form-input>
              </div>
              <div class="form-group dob">
                <i class="i fas fa-baby"></i>
                <b-form-select v-model="user.yearDOB" :options="YearOptionsAr"></b-form-select>
                <b-form-select v-model="user.monthDOB" :options="monthOptionAr"></b-form-select>
                <b-form-select v-model="user.dayBOB" :options="dayOptionAr"></b-form-select>
              </div>
              <div class="form-group">
                <i class="i fas fa-venus-mars"></i>
                <b-form-select class="w-100" v-model="user.gender" :options="genderOptionsAr"></b-form-select>
              </div>
              <div class="form-group">
                <i class="i far fa-flag"></i>
                <b-form-select class="w-100" v-model="user.country" :options="countryOptionsAr"></b-form-select>
              </div>
              <div class="form-group">
                <i class="i fas fa-mobile-alt"></i>
                <b-form-input type="phone" v-model="user.phone" placeholder="رقم الهاتف"></b-form-input>
              </div>
              <div class="form-button d-flex flex-row justify-content-around">
                <button @click="resetIndividualAccount" class="btn"><i class="fas fa-arrow-right"></i> السابق </button>
                <button @click="addAccountIndividualAccount" class="btn">التالي <i class="fas fa-arrow-left"></i> </button>
              </div>
            </div>
          </div>
        </div>

        <div class="addPasswordAndEmail" v-if="addPasswordAndEmail">
          <div class="body en animate__animated animate__backInRight">
            <main class="main-content">
              <div class="main-content-container">
                <div class="personalInfo p-4">
                  <div class="header">
                    <h1>كلمة مرور البريد الإلكتروني</h1>
                  </div>
                  <div v-if="isLoading">
                    <p class="authenticating">جاري التحميل...</p>
                    <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
                  </div>
                  <p class="valid" v-if="error">{{ addPasswordAndEmailErrorAr }}</p>
                  <div v-if="!isLoading" class="form">
                    <div class="form-group">
                      <i class="i fas fa-building"></i>
                      <b-form-input v-model="user.email" placeholder="عنوان البريد الإلكتروني"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-venus-mars"></i>
                      <b-form-input v-model="user.password" type="password" placeholder="كلمه السر"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-users"></i>
                      <b-form-input @input="confirmPassword" type="password" v-model="user.confirmPassword" placeholder="تأكيد كلمة المرور"></b-form-input>
                    </div>
                    <p class="valid mt-2" v-if="confirmPasswordErrorAr">{{ confirmPasswordErrorAr }}</p>
                    <div class="form-button d-flex flex-row justify-content-around">
                      <button @click="sendForm" class="btn">اضافة حساب</button>
                    </div>
                  </div >
                </div>
              </div>
            </main>
          </div>

        </div>

        <div class="businessAccount" v-if="businessAccount">
          <div class="body en animate__animated animate__backInRight">
            <main class="main-content">
              <div class="main-content-container container">
                <div class="img">
                  <b-form @submit="uploadPhoto">
                    <avatar></avatar>
                    <b-button class="btn" type="submit">حمل الصورة</b-button>
                  </b-form>
                </div>
                <div class="personalInfo">
                  <div class="header">
                    <h1>تفاصيل الشركة</h1>
                  </div>
                  <p v-if="businessAccountErrorAr" class="valid">{{ businessAccountErrorAr }}</p>
                  <div class="form">
                    <div class="form-group">
                      <i class="i fas fa-building"></i>
                      <b-form-input v-model="user.companyName" placeholder="اسم الشركة"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-venus-mars"></i>
                      <b-form-select class="w-100" v-model="user.companyBusinessCategory" :options="businessCategoryOptions"></b-form-select>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-users"></i>
                      <b-form-input type="number" v-model="user.companyNumOfEmployees" placeholder="عدد الموظفين"></b-form-input>
                    </div>
                    <div class="form-group">
                      <i class="i far fa-flag"></i>
                      <b-form-select class="w-100" v-model="user.companyCountry" :options="countryOptionsAr"></b-form-select>
                    </div>
                    <div class="form-group">
                      <i class="i fas fa-building"></i>
                      <b-form-input v-model="user.companyUrl" placeholder="موقع الشركة"></b-form-input>
                    </div>
                    <b-button class="btn" @click="addCompany">أضف شركة</b-button>
                  </div >
                </div>
              </div>
            </main>
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
import Avatar from "@/components/ui/Avatar";
import store from "@/store";
import router from "@/router";
import Footer from "@/components/auth/Footer";
import Header from "@/components/auth/Header";
export default {
  name: "Register",
  components: {
    Header,
    Footer,
    Avatar,
  },
  data() {
    return {
      user: {
        accountType: '',
        name: '',
        phone: '',
        yearDOB: null,
        monthDOB: null,
        dayBOB: null,
        gender: null,
        country: null,
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        companyNumOfEmployees: '',
        companyImgSrc: null,
        companyUrl: null,
        companyCountry: null,
        companyBusinessCategory: null,
      },
      error: false,
      isLoading: false,
      selectAccountType: true,
      individualAccount: false,
      businessAccount: false,
      addPasswordAndEmail: false,
      businessAccountErrorEn: '',
      businessAccountErrorAr: '',
      addPasswordAndEmailErrorAr: '',
      addPasswordAndEmailErrorEn: '',
      confirmPasswordErrorEn: '',
      confirmPasswordErrorAr: '',
      individualAccountErrorEn: '',
      individualAccountErrorAr: '',
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
        { value: 'Male', text: 'ذكر' },
        { value: 'Female', text: 'انثي' },
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
        { value: "Business", text: 'Business Category' },
        { value: "Business", text: 'Business Category' },
        { value: "Business", text: 'Business Category' },
      ],
      businessCategoryOptionsAr: [
        { value: null, text: 'نوع العمل' },
        { value: "Business", text: 'نوع العمل' },
        { value: "Business", text: 'نوع العمل' },
        { value: "Business", text: 'نوع العمل' },
        { value: "Business", text: 'نوع العمل' },
      ],
    }
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  created() {
    if (store.getters.isAuthenticated) {
      router.push('/')
    }
  },
  methods: {
    addAccountType(account) {
      this.user.accountType = account;
      if (account === 'individual') {
        this.selectAccountType = false;
        this.individualAccount = true;
        this.businessAccount = false;
      } else if (account === 'business') {
        this.selectAccountType = false;
        this.individualAccount = false;
        this.businessAccount = true;
      } else {
        this.selectAccountType = true;
        this.individualAccount = false;
        this.businessAccount = false;
      }
      this.addPasswordAndEmail = false;
    },
    addAccountIndividualAccount() {
      if (this.user.name === '' || this.user.dayBOB === null || this.user.monthDOB === null || this.user.yearDOB === null || this.user.phone === '' || this.user.gender === null || this.user.country === null ) {
        this.individualAccountErrorEn = "You must fill all input first";
        this.individualAccountErrorAr = "يجب عليك ملء كل المدخلات أولا";
        return
      }

      this.selectAccountType = false;
      this.individualAccount = false;
      this.businessAccount = false;
      this.addPasswordAndEmail = true;
    },
    resetIndividualAccount() {
      this.selectAccountType = true;
      this.individualAccount = false;
      this.businessAccount = false;
      this.addPasswordAndEmail = false;
    },
    confirmPassword() {
      if (this.user.password !== this.user.confirmPassword) {
        this.confirmPasswordErrorEn = 'Password not confirm';
        this.confirmPasswordErrorAr = 'كلمة المرور غير لا تطابق';
      } else {
        this.confirmPasswordErrorEn = '';
        this.confirmPasswordErrorAr = '';
      }
    },
    async sendForm() {
      this.addPasswordAndEmailErrorAr = '';
      if (this.user.email === '' ||  this.user.password === '') {
        this.addPasswordAndEmailErrorEn = 'You must add email and password'
        this.addPasswordAndEmailErrorAr = 'يجب عليك إضافة البريد الإلكتروني وكلمة المرور'
        return;
      }

      let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

      if (this.user.email === '' || !this.user.email.match(pattern)) {
        this.addPasswordAndEmailErrorEn = 'Email not valid'
        this.addPasswordAndEmailErrorAr = 'البريد الإلكتروني غير صالح'
        return;
      }

      if ( this.user.password.length < 6) {
        this.addPasswordAndEmailErrorEn = 'Password not valid (password must be greater than 6 digit)'
        this.addPasswordAndEmailErrorAr = 'كلمة المرور غير صالحة (يجب أن تكون كلمة المرور أكبر من 6 أرقام)'
        return;
      }

      this.isLoading = true;
      this.error = false

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let formdata = new FormData();
      formdata.append("type", this.user.accountType);
      formdata.append("name", this.user.name);
      formdata.append("email", this.user.email);
      formdata.append("phone", this.user.phone);
      formdata.append("password", this.user.password);
      formdata.append("num_of_employees", this.user.companyNumOfEmployees);
      formdata.append("img_src", "");
      formdata.append("url", this.user.companyUrl);
      formdata.append("country", this.user.country);
      formdata.append("business_category", this.user.companyBusinessCategory);
      formdata.append("year_dob", this.user.yearDOB);
      formdata.append("month_dob", this.user.monthDOB);
      formdata.append("day_dob", this.user.dayBOB);

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      let url = "https://yaformelbanna.we-work.pro/api/unauth/sign-up"

      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      console.log(responseData)
      if (responseData.status) {
        this.$router.replace('/login');
      } else {
        if (responseData.errNum == "E007")
        this.addPasswordAndEmailErrorAr = "البريد الإلكتروني تم أخذه"
        this.addPasswordAndEmailErrorEn = "The email has already been taken"
      }



      this.isLoading = false;
    },
    uploadPhoto() {

    },
    addCompany() {
      if (this.user.companyName === '' || this.user.companyBusinessCategory === null || this.user.companyNumOfEmployees === '' || this.user.companyCountry === null ||  this.user.companyUrl === '' ) {
        this.businessAccountErrorEn = "You must fill all input first";
        this.businessAccountErrorAr = "يجب عليك ملء كل المدخلات أولا";
        return
      }

      this.selectAccountType = false;
      this.individualAccount = true;
      this.businessAccount = false;
      this.addPasswordAndEmail = false;

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

.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}

main {
  margin-top: 50px;
}

.valid {
  border: 1px solid #ff6b6b;
  background: #ff6b6b;
  border-radius: 5px;
  color: #FFFFFF;
  padding: 10px 30px;
}

.selectAccountType .body {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.selectAccountType .header {
  color: #9c6d9e;
  font-style: italic;
  font-weight: 500;
  font-family: 'Bebas Neue', cursive;
  margin-bottom: 20px;
}

.selectAccountType .accounts {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.selectAccountType .accounts button {
  color: #9d55a0;
  text-decoration: none;
  border: none;
  background: none;
}

.selectAccountType .accountType {
  width: 300px;
  height: 250px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.selectAccountType .accounts button:hover .accountType {
  color: #dddddd;
  background-color: #9d55a0;
  width: 320px;
  height: 260px;
}

.selectAccountType .accountType i {
  display: flex;
  justify-content: center;
  font-weight: 900;
  cursor: pointer;
  margin: 25px 0;
}

.selectAccountType .accountType span {
  font-size: 24px;
  font-weight: 600;
}

.individualAccount .body {
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.individualAccount .header {
  color: #9c6d9e;
  font-style: italic;
  font-weight: 500;
  font-family: 'Bebas Neue', cursive;
  margin-bottom: 20px;
}

.individualAccount .form {
  width: 60%;
}

.individualAccount .form-group {
  padding: 10px 0;
  margin: 0;
  display: flex;
  border-bottom: 1px solid #9d55a0;
}

.individualAccount .form-group input,
.individualAccount .form-group select {
  border: none;
  color: #5A5C6C;
  display: block;
}

.individualAccount .form-group input:focus,
.individualAccount .form-group select:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.individualAccount .form-group select {
  margin: 5px 0;
}

.individualAccount .form-group .i {
  margin: auto 5px;
  color: #9d55a0;
}

.individualAccount .form-button .btn {
  color: #fff;
  background-color: #9c6d9e;
  padding: 10px 20px;
  margin: 20px 0 30px;
}

.individualAccount .form-button .btn:hover {
  color: #9c6d9e;
  background-color: #fff;
}

.individualAccount .ar {
  direction: rtl;
  text-align: right;
}

.individualAccount .ar .header {
  font-family: 'Cairo', sans-serif;
}


.addPasswordAndEmail .body {
  width: 100%;
  padding: 0px 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.authenticating {
  font-weight: 500;
  font-size: 20px;
  color: #9d55a0;

}

.addPasswordAndEmail .header {
  color: #9c6d9e;
  font-style: italic;
  font-weight: 500;
  font-family: 'Bebas Neue', cursive;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.addPasswordAndEmail .main-content {
  width: 70%;
  display: flex;
  justify-content: center;
}

.addPasswordAndEmail .main-content-container {
  width: 100%;
}

.addPasswordAndEmail .personalInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.addPasswordAndEmail .form {
  width: 60%;
}

.addPasswordAndEmail .form-group {
  padding: 10px 0;
  margin: 0;
  display: flex;
  border-bottom: 1px solid #9d55a0;
}

.addPasswordAndEmail .form-group input {
  border: none;
  color: #5A5C6C;
  display: block;
}

.addPasswordAndEmail .form-group input:focus,
.addPasswordAndEmail .form-group select:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.addPasswordAndEmail .form-group .i {
  margin: auto 5px;
  color: #9d55a0;
}


.addPasswordAndEmail .form-button .btn {
  color: #fff;
  background-color: #9c6d9e;
  padding: 10px 20px;
  margin: 20px 0 30px;
}

.addPasswordAndEmail .form-button .btn:hover {
  color: #9c6d9e;
  background-color: #fff;
}

.ar {
  direction: rtl;
  text-align: right;
}

.ar .header {
  font-family: 'Cairo', sans-serif;
}



.body {
  width: 100%;
  padding: 20px 0 80px;
}

.ar {
  direction: rtl;
  text-align: right;
}

.businessAccount .main-content {
  width: 100%;
}

.businessAccount .header {
  color: #9c6d9e;
  font-style: italic;
  font-weight: 500;
  font-family: 'Bebas Neue', cursive;
  margin-bottom: 20px;
}

.businessAccount .main-content-container {
  display: flex;
}

.businessAccount .main-content-container .img {
  padding: 10px 0;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
}

.businessAccount .main-content-container .img .avatar {
  width: 200px;
  height: 200px;
}

.businessAccount .main-content-container .personalInfo {
  width: 68%;
}

.businessAccount .form {
  width: 95%;
}

.businessAccount .form-group {
  padding: 10px 0;
  margin: 0;
  display: flex;
  border-bottom: 1px solid #9d55a0;
}

.businessAccount .form-group input,
.businessAccount .form-group select {
  border: none;
  color: #5A5C6C;
  display: block;
}

.businessAccount .form-group select {
  margin: 5px 0;
}

.businessAccount .form-group .i {
  margin: auto 5px;
  color: #9d55a0;
}

.businessAccount .btn {
  background-color: #9d55a0;
  color: #FFFFFF;
  border: none;
  margin: 10px 0;
}

.businessAccount .btn:hover {
  background-color: #FFFFFF;
  color: #9d55a0;
  border: none;
}






@media (max-width:1024px) {
  .selectAccountType .header {
    margin: 0;
    font-size: 300%;
  }

  .individualAccount form {
    width: 90%;
  }

  .individualAccount .header {
    margin: 0;
  }

  .individualAccount .dob {
    display: flex;
    flex-direction: column;
  }

  .addPasswordAndEmail .form {
    width: 90%;
  }

  .addPasswordAndEmail .header {
    margin: 0;
  }

  .businessAccount  .main-content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .businessAccount .main-content-container .img,
  .businessAccount  .main-content-container .personalInfo {
    width: 100%;
  }

  .businessAccount .btn {
    margin-bottom: 10px;
  }

  .businessAccount .main-content-container .img form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .businessAccount  .main-content-container .img .avatar {
    width: 100px;
    height: 100px;
  }

  .businessAccount .header {
    margin: 0;
  }
}

</style>