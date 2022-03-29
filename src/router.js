import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateTemplates from "@/views/form/CreateTemplates";
import NotFound from "@/views/NotFound";
import FormSetting from "@/views/form/FormSetting";
import FormView from "@/views/form/FormView";
import CreateForm from "@/views/form/CreateForm";
import Forms from "@/views/form/Forms";
import ProfileEdit from "@/views/profile/ProfileEdit";
import ProfileIndex from "@/views/profile/ProfileIndex";
import ResetPassword from "@/views/auth/ResetPassword";
import ForgotPassword from "@/views/auth/ForgotPassword";
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Contact from "@/views/Contact";
import Template from "@/views/form/Template";
import Form from "@/views/form/Form";
import CreateQuiz from "./views/form/CreateQuiz";
import FormEdit from "./views/form/FormEdit";
import Response from "./views/form/Response";
import Summary from "./components/form/response/Summary";
import Question from "./components/form/response/Question";
import Individual from "./components/form/response/Individual";

Vue.use(VueRouter)

const routes = [
  { path: '/', component: () => import('./views/Home') },
  { path: '/contact-us', component: Contact },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password/:id', component: ResetPassword },
  { path: '/profile', component: ProfileIndex },
  { path: '/setting/:id', component: ProfileEdit },
  { path: '/forms', component: Forms },
  { path: '/form/:id', component: Form },
  { path: '/create-form', component: CreateForm },
  { path: '/form-quiz', component: CreateQuiz },
  { path: '/create-template', component: CreateTemplates },
  { path: '/form-view/:id', component: FormView },
  { path: '/form/setting/:id', component: FormSetting },
  { path: '/template/:id', component: Template },
  { path: '/form-edit/:id', component: FormEdit },
  { path: '/form/response/:id', component: Response, children: [
      { path: '/form/response/:id/', component: Summary },
      { path: '/form/response/:id/question', component: Question },
      { path: '/form/response/:id/individual', component: Individual },
    ]},

  { path: '/:notFound(.*)', component: NotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
