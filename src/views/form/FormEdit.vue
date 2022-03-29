<template>
  <div>
    <div>
      <b-modal v-model="modalShow" title="Ya form">
        <p class="my-4">{{ error }}</p>
      </b-modal>
    </div>
    <main class="main-spinner" v-if="isLoading">
      <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
    </main>
    <div v-else :class="'home animate__animated animate__fadeIn ' + form.style_theme + ' ' + form.font_family ">

      <div>
        <create-form-header
            @show-theme="showTheme"
            @show-send="showSend"
            :theme="form.style_theme"
            :id="form.id"
            show="true"
            show-nav3=true
            show-eye=true
            show-send-icon=true
            show-theme-icon=true
        >
        </create-form-header>

        <send-form
            @close-send="closeSend"
            v-if="displaySend"
            :formId="form.id"
            :theme="form.style_theme"
        ></send-form>

        <div class="main-content en animate__animated animate__backInLeft" v-if="getLang === 'en'">
          <main class="main-spinner" v-if="isLoading">
            <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
          </main>

          <div v-else class="container">

            <div class="create-form">

              <div class="form-image-header" v-if="form.image_header">
                <img :src="form.image_header">
              </div>

              <div class="form-header">
                <div class="form-title">
                  <b-form-input class="input-title" type="text" v-model="form.header" placeholder="Untitled form"></b-form-input>
                  <b-form-input class="input-description" type="text" v-model="form.description" placeholder="Form description"></b-form-input>
                </div>
                <div class="form-logo">
                  <img :src="form.logo">
                </div>
              </div>

              <div @click="divFocus(question)" v-for="question in form.questions" :key="question.id" :class="'form-question ' + question.focus ">

                <div v-if="question.type === 'question'" class="question-type">

                  <div class="form-question-row-1">
                    <b-form-input class="input-question" type="text" v-model="question.question" placeholder="Question"></b-form-input>
                    <b-form-select class="select-answer" v-model="question.question_type">
                      <b-form-select-option :value="null">Please select a question type</b-form-select-option>
                      <b-form-select-option value="Short answer">Short answer</b-form-select-option>
                      <b-form-select-option value="Paragraph">Paragraph</b-form-select-option>
                      <b-form-select-option value="Multiple choice">Multiple choice</b-form-select-option>
                      <b-form-select-option value="Name">Name</b-form-select-option>
                      <b-form-select-option value="Email">Email</b-form-select-option>
                      <b-form-select-option value="Phone number">Phone number</b-form-select-option>
                      <b-form-select-option value="Number">Number</b-form-select-option>
                      <b-form-select-option value="Checkboxes">Checkboxes</b-form-select-option>
                      <b-form-select-option value="Dropdown">Dropdown</b-form-select-option>
                      <b-form-select-option value="Date">Date</b-form-select-option>
                      <b-form-select-option value="Time">Time</b-form-select-option>
                    </b-form-select>
                  </div>

                  <div v-if="question.question_type == 'null'" class="form-question-row-2"></div>

                  <div v-else-if="question.question_type == 'Short answer'" class="form-question-row-2 short-answer-row">
                    <b-form-input
                        type="text"
                        class="input-answer"
                        placeholder="Short answer text"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Phone number'" class="form-question-row-2 short-answer-row">
                    <b-form-input
                        type="text"
                        class="input-answer"
                        placeholder="Short phone number"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Paragraph'" class="form-question-row-2 paragraph-row">
                    <b-form-textarea
                        type="text"
                        class="input-paragraph"
                        placeholder="Paragraph text"
                        disabled
                    ></b-form-textarea>
                  </div>

                  <div v-else-if="question.question_type == 'Phone Number'" class="form-question-row-2 paragraph-row">
                    <b-form-textarea
                        type="text"
                        class="input-paragraph"
                        placeholder="Paragraph text"
                        disabled
                    ></b-form-textarea>
                  </div>

                  <div v-else-if="question.question_type == 'Email'" class="form-question-row-2 paragraph-row">
                    <b-form-textarea
                        type="text"
                        class="input-paragraph"
                        placeholder="Paragraph text"
                        disabled
                    ></b-form-textarea>
                  </div>

                  <div v-else-if="question.question_type == 'Name'" class="form-question-row-2 paragraph-row">
                    <b-form-textarea
                        type="text"
                        class="input-paragraph"
                        placeholder="Paragraph text"
                        disabled
                    ></b-form-textarea>
                  </div>

                  <div v-else-if="question.question_type == 'Number'" class="form-question-row-2 paragraph-row">
                    <b-form-textarea
                        type="text"
                        class="input-paragraph"
                        placeholder="Paragraph text"
                        disabled
                    ></b-form-textarea>
                  </div>

                  <div v-else-if="question.question_type == 'Multiple choice'" class="form-question-row-2 choice-row">
                    <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                      <i class="far fa-circle"></i>
                      <b-form-input class="multiple-choice-input" type="text" v-model="option.value"></b-form-input>
                      <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                    </div>
                    <h6 @click="addOtherOption(question)">Add other option</h6>
                  </div>

                  <div v-else-if="question.question_type == 'Checkboxes'" class="form-question-row-2 choice-row">
                    <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                      <i class="far fa-square"></i>
                      <b-form-input class="multiple-choice-input" type="text" v-model="option.value"></b-form-input>
                      <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                    </div>
                    <h6 @click="addOtherOption(question)">Add other option</h6>
                  </div>

                  <div v-else-if="question.question_type == 'Dropdown'" class="form-question-row-2 choice-row">
                    <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                      <b-form-input class="multiple-choice-input" type="text" v-model="option.value"></b-form-input>
                      <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                    </div>
                    <h6 @click="addOtherOption(question)">Add other option</h6>
                  </div>

                  <div v-else-if="question.question_type == 'Date'" class="form-question-row-2 date-row">
                    <b-form-input
                        type="date"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Time'" class="form-question-row-2 time-row">
                    <b-form-input
                        type="time"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else class="form-question-row-2"></div>

                  <div class="question-footer">
                    <div class="hidden-class"></div>
                    <div class="question-footer-content">
                      <i class="far fa-copy duplicate" @click="duplicate(question)"></i>
                      <i class="fas fa-trash-alt remove" @click="remove(question)"></i>
                      <div class="required d-flex">
                        <p>Required</p>
                        <label class="switch mt-auto mb-auto">
                          <input type="checkbox" v-model="question.required">
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                <div v-else class="else-type-content">

                  <div class="else-type-header">
                    <b-form-input class="else-type-header-input" type="text" v-model="question.question" placeholder="Title"></b-form-input>
                    <div class="else-type-header-icons">
                      <i class="far fa-copy duplicate" @click="duplicate(question)"></i>
                      <i class="fas fa-trash-alt remove" @click="remove(question)"></i>
                    </div>
                  </div>

                  <div v-if="question.type === 'title'" class="title-type-content">
                    <b-form-input
                        class="title-description-input"
                        type="text"
                        v-model="question.description"
                        placeholder="Add description"></b-form-input>
                  </div>

                  <div v-if="question.type === 'image'" class="image-type-content">

                    <img :src="'https://yaformelbanna.we-work.pro/images/question_images/' + question.description">

                  </div>

                  <div v-if="question.type === 'video'" class="video-type-content">

                    <div v-if="question.display_video" class="video">
                      <iframe class="m-4" :src="question.description"></iframe>
                    </div>

                    <div v-else class="video-url d-flex">
                      <b-form-input
                          class="title-description-input"
                          type="text"
                          v-model="question.description"
                          placeholder="Add youtube video url"
                      ></b-form-input>
                      <b-button @click="addVideo(question.id)" type="reset">Add video</b-button>
                    </div>

                  </div>

                </div>

              </div>

              <div class="p-4">
                <h5>Add your accounts</h5>
                <div v-for="socialMedia in form.social_media" :key="socialMedia.id">
                  <div class="mt-1" v-if="socialMedia.type === 'Facebook'">
                    <div class="col-sm-12">
                      <div class="input-group">
                        <div class="input-group-text"><i class="fab fa-facebook"></i></div>
                        <input type="text" class="form-control"  v-model="socialMedia.url" placeholder="Your account">
                        <i style="cursor: pointer" class="mt-auto mb-auto me-2 ms-2 fas fa-times close" @click="removeSocialMedia(socialMedia.id)"></i>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1" v-else-if="socialMedia.type === 'Twitter'">
                    <div class="col-sm-12">
                      <div class="input-group">
                        <div class="input-group-text"><i class="fab fa-twitter"></i></div>
                        <input type="text" class="form-control" v-model="socialMedia.url" placeholder="Your account">
                        <i style="cursor: pointer" class="mt-auto mb-auto me-2 ms-2 fas fa-times close" @click="removeSocialMedia(socialMedia.id)"></i>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1" v-else-if="socialMedia.type === 'Instagram'">
                    <div class="col-sm-12">
                      <div class="input-group">
                        <div class="input-group-text"><i class="fab fa-instagram"></i></div>
                        <input type="text" class="form-control" v-model="socialMedia.url" placeholder="Your account">
                        <i style="cursor: pointer" class="mt-auto mb-auto me-2 ms-2 fas fa-times close" @click="removeSocialMedia(socialMedia.id)"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <b-button class="btn mb-4" @click="addForm">Save changes</b-button>
            </div>

            <div class="right-elements">
              <div class="top">
                <input type="file" accept="image/" class="hidden" ref="logoFile" @change="addLogo">
                <div v-b-popover.hover.right="'Add logo (220*200)'" class="add-logo">
                  <button type="reset" class="add-logo-btn" @click="browse">
                    <i class="fas fa-plus-circle"></i>Logo
                  </button>
                </div>
              </div>
              <div class="bottom">
                <i @click="addNewQuestion" class="fas fa-plus-circle" v-b-popover.hover.right="'Add new question'"></i>
                <i @click="addNewTitle" v-b-popover.hover.right="'Add new title and description'" class="fas fa-heading"></i>
                <input type="file" accept="image/" class="hidden" ref="imageFile" @change="addImage">
                <i @click="addNewImage" v-b-popover.hover.right="'Add new image'" class="far fa-image"></i>
                <i @click="addNewVideo" v-b-popover.hover.right="'Add new video'" class="fas fa-video"></i>
              </div>
            </div>

          </div>

          <div v-if="displayTheme" class="theme">

            <div class="theme-header">
              <i class="fas fa-palette"></i>
              <p>Theme options</p>
              <i @click="closeTheme" class="fas fa-times close"></i>
            </div>

            <div class="image-header">
              <p class="p-header">HEADER</p>
              <div class="image-header-content">
                <div v-if="form.image_header === ''">
                  <input type="file" accept="image/" class="hidden" ref="imageHeader" @change="changeFormHeaderImage">
                  <button type="reset" @click="browseFormHeaderImage" class="btn-image-header d-flex">
                    <i class="fas fa-image"></i>
                    <p>Choose image</p>
                  </button>
                  <p class="header-size">1100*200px</p>
                </div>
                <div v-else>
                  <button type="reset" class="btn-remove-image-header d-flex">
                    <i class="fas fa-image"></i>
                    <p>Image uploaded</p>
                    <i @click="removeFormHeaderImage" class="fas fa-times"></i>
                  </button>
                </div>

              </div>
            </div>

            <div class="theme-color">
              <p class="p-header">THEME COLOR</p>
              <div class="theme-color-content">
                <i @click="editTheme('default')" v-b-popover.hover.top="'Default #9d55a0'" class="fas fa-circle color-1"></i>
                <i @click="editTheme('theme-1')" v-b-popover.hover.top="'Red #db4437'" class="fas fa-circle color-2"></i>
                <i @click="editTheme('theme-2')" v-b-popover.hover.top="'Purple #673ab7'" class="fas fa-circle color-3"></i>
                <i @click="editTheme('theme-3')" v-b-popover.hover.top="'Indigo #3f51b5'" class="fas fa-circle color-4"></i>
                <i @click="editTheme('theme-4')" v-b-popover.hover.top="'Blue #4285f4'" class="fas fa-circle color-5"></i>
                <i @click="editTheme('theme-5')" v-b-popover.hover.top="'Light Blue #03a9f4'" class="fas fa-circle color-6"></i>
                <i @click="editTheme('theme-6')" v-b-popover.hover.top="'Red Orange #ff5722'" class="fas fa-circle color-7"></i>
                <i @click="editTheme('theme-7')" v-b-popover.hover.top="'Orange #ff9800'" class="fas fa-circle color-8"></i>
                <i @click="editTheme('theme-8')" v-b-popover.hover.top="'Teal #009688'" class="fas fa-circle color-9"></i>
                <i @click="editTheme('theme-9')" v-b-popover.hover.top="'Green #4caf50'" class="fas fa-circle color-10"></i>
                <i @click="editTheme('theme-10')" v-b-popover.hover.top="'Blue Gray #607d8b'" class="fas fa-circle color-11"></i>
                <i @click="editTheme('theme-11')" v-b-popover.hover.top="'Gray #9e9e9e'" class="fas fa-circle color-12"></i>
              </div>
            </div>

            <div class="text-font">
              <p class="p-header">FONT STYLE</p>
              <div class="text-font-content">
                <b-form-select v-model="form.font_family" class="mb-3">
                  <b-form-select-option value="default-font">Basic</b-form-select-option>
                  <b-form-select-option value="Playful">Playful</b-form-select-option>
                  <b-form-select-option value="Roboto-Mono">Roboto Mono</b-form-select-option>
                </b-form-select>

              </div>
            </div>

          </div>

        </div>

        <div class="main-content ar animate__animated animate__backInRight" v-if="getLang === 'ar'">

          <main class="main-spinner" v-if="isLoading">
            <b-spinner class="mt-5" style="width: 3rem; height: 3rem; color: #9d55a0;" label="Loading..."></b-spinner>
          </main>

          <div v-else class="container">

            <div class="create-form">

              <div class="form-image-header" v-if="form.image_header">
                <img :src="form.image_header">
              </div>

              <div class="form-header">
                <div class="form-title">
                  <b-form-input class="input-title" type="text" v-model="form.header" placeholder="نموذج بدون عنوان"></b-form-input>
                  <b-form-input class="input-description" type="text" v-model="form.description" placeholder="وصف النموذج"></b-form-input>
                </div>
                <div class="form-logo">
                  <img :src="form.logo">
                </div>
              </div>

              <div @click="divFocus(question)" v-for="question in form.questions" :key="question.id" :class="'form-question ' + question.focus ">

                <div v-if="question.type === 'question'" class="question-type">

                  <div class="form-question-row-1">
                    <b-form-input class="input-question" type="text" v-model="question.question" placeholder="السؤال"></b-form-input>
                    <b-form-select class="select-answer" v-model="question.question_type">
                      <b-form-select-option :value="null">Please select a question type</b-form-select-option>
                      <b-form-select-option value="Short answer">اجابة قصيرة</b-form-select-option>
                      <b-form-select-option value="Paragraph">فقرة</b-form-select-option>
                      <b-form-select-option value="Multiple choice">متعدد الخيارات</b-form-select-option>
                      <b-form-select-option value="Name">اسم</b-form-select-option>
                      <b-form-select-option value="Email">بريد الالكتروني</b-form-select-option>
                      <b-form-select-option value="Phone number">رقم التليفون</b-form-select-option>
                      <b-form-select-option value="Number">رقم</b-form-select-option>
                      <b-form-select-option value="Checkboxes">مربعات الاختيار</b-form-select-option>
                      <b-form-select-option value="Dropdown">اسقاط</b-form-select-option>
                      <b-form-select-option value="Date">تاريخ</b-form-select-option>
                      <b-form-select-option value="Time">وقت</b-form-select-option>
                    </b-form-select>
                  </div>

                  <div v-if="question.question_type == 'null'" class="form-question-row-2"></div>

                  <div v-else-if="question.question_type == 'Short answer'" class="form-question-row-2 short-answer-row">
                    <b-form-input
                        type="text"
                        class="input-answer"
                        placeholder="نص إجابة قصيرة"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Phone number'" class="form-question-row-2 short-answer-row">
                    <b-form-input
                        type="text"
                        class="input-answer"
                        placeholder="رقم هاتف قصير"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Name'" class="form-question-row-2 short-answer-row">
                    <b-form-input
                        type="text"
                        class="input-answer"
                        placeholder="الاسم"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.questionType == 'Email'" class="form-question-row-2 short-answer-row">
                    <b-form-input
                        type="text"
                        class="input-answer"
                        placeholder="نص البريد الإلكتروني"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Paragraph'" class="form-question-row-2 paragraph-row">
                    <b-form-textarea
                        type="text"
                        class="input-paragraph"
                        placeholder="نص الفقرة"
                        disabled
                    ></b-form-textarea>
                  </div>

                  <div v-else-if="question.question_type == 'Multiple choice'" class="form-question-row-2 choice-row">
                    <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                      <i class="far fa-circle"></i>
                      <b-form-input class="multiple-choice-input" type="text" v-model="option.value" @input="setSelectValue(option, question)"></b-form-input>
                      <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                    </div>
                    <h6 @click="addOtherOption(question)">أضف خيارًا آخر</h6>
                  </div>

                  <div v-else-if="question.question_type == 'Checkboxes'" class="form-question-row-2 choice-row">
                    <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                      <i class="far fa-square"></i>
                      <b-form-input class="multiple-choice-input" type="text" v-model="option.value" @input="setSelectValue(option, question)"></b-form-input>
                      <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                    </div>
                    <h6 @click="addOtherOption(question)">أضف خيارًا آخر</h6>
                  </div>

                  <div v-else-if="question.question_type == 'Dropdown'" class="form-question-row-2 choice-row">
                    <div class="multiple-choice-row" v-for="option in question.options" :key="option.id">
                      <b-form-input class="multiple-choice-input" type="text" v-model="option.value" @input="setSelectValue(option, question)"></b-form-input>
                      <i class="fas fa-times close" @click="removeChoice(option, question)"></i>
                    </div>
                    <h6 @click="addOtherOption(question)">أضف خيارًا آخر</h6>
                  </div>

                  <div v-else-if="question.question_type == 'Date'" class="form-question-row-2 date-row">
                    <b-form-input
                        type="date"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Time'" class="form-question-row-2 time-row">
                    <b-form-input
                        type="time"
                        disabled
                    ></b-form-input>
                  </div>

                  <div v-else-if="question.question_type == 'Number'" class="form-question-row-2 short-answer-row">
                    <b-form-input
                        type="number"
                        class="input-answer"
                        placeholder="نص إجابة رقمي"
                        disabled
                    ></b-form-input>
                    <b-form-input class="multiple-choice-input" type="number" v-model="question.default_answer" placeholder="Add answer"></b-form-input>
                  </div>


                  <div v-else class="form-question-row-2"></div>

                  <div class="question-footer">
                    <div class="hidden-class"></div>
                    <div class="question-footer-content">
                      <i class="far fa-copy duplicate" @click="duplicate(question)"></i>
                      <i class="fas fa-trash-alt remove" @click="remove(question)"></i>
                      <div class="required d-flex">
                        <p>مطلوب</p>
                        <label class="switch mt-auto mb-auto">
                          <input type="checkbox" v-model="question.required">
                          <span class="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                </div>

                <div v-else class="else-type-content">

                  <div class="else-type-header">
                    <b-form-input class="else-type-header-input" type="text" v-model="question.question" placeholder="عنوان"></b-form-input>
                    <div class="else-type-header-icons">
                      <i class="far fa-copy duplicate" @click="duplicate(question)"></i>
                      <i class="fas fa-trash-alt remove" @click="remove(question)"></i>
                    </div>
                  </div>

                  <div v-if="question.type === 'title'" class="title-type-content">
                    <b-form-input
                        class="title-description-input"
                        type="text"
                        v-model="question.description"
                        placeholder="اضف وصفا"
                    ></b-form-input>
                  </div>

                  <div v-if="question.type === 'image'" class="image-type-content">

                    <img :src="'https://yaformelbanna.we-work.pro/images/question_images/' + question.description">

                  </div>

                  <div v-if="question.type === 'video'" class="video-type-content">

                    <div v-if="question.displayVideo" class="video">
                      <iframe class="m-4" :src="question.description"></iframe>
                    </div>

                    <div v-else class="video-url d-flex">
                      <b-form-input
                          class="title-description-input"
                          type="text"
                          v-model="question.description"
                          placeholder="أضف رابط فيديو youtube"
                      ></b-form-input>
                      <b-button @click="addVideo(question.id)" type="reset">أضف الفيديو</b-button>
                    </div>

                  </div>

                </div>

              </div>
              <div class="p-4">
                <h5>Add your accounts</h5>
                <div v-for="socialMedia in form.social_media" :key="socialMedia.id">
                  <div class="mt-1" v-if="socialMedia.type === 'Facebook'">
                    <div class="col-sm-12">
                      <div class="input-group">
                        <div class="input-group-text"><i class="fab fa-facebook"></i></div>
                        <input type="text" class="form-control"  v-model="socialMedia.url" placeholder="الحساب الخاص بك">
                        <i style="cursor: pointer" class="mt-auto mb-auto me-2 ms-2 fas fa-times close" @click="removeSocialMedia(socialMedia.id)"></i>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1" v-else-if="socialMedia.type === 'Twitter'">
                    <div class="col-sm-12">
                      <div class="input-group">
                        <div class="input-group-text"><i class="fab fa-twitter"></i></div>
                        <input type="text" class="form-control" v-model="socialMedia.url" placeholder="الحساب الخاص بك">
                        <i style="cursor: pointer" class="mt-auto mb-auto me-2 ms-2 fas fa-times close" @click="removeSocialMedia(socialMedia.id)"></i>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1" v-else-if="socialMedia.type === 'Instagram'">
                    <div class="col-sm-12">
                      <div class="input-group">
                        <div class="input-group-text"><i class="fab fa-instagram"></i></div>
                        <input type="text" class="form-control" v-model="socialMedia.url" placeholder="الحساب الخاص بك">
                        <i style="cursor: pointer" class="mt-auto mb-auto me-2 ms-2 fas fa-times close" @click="removeSocialMedia(socialMedia.id)"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <b-button class="btn" @click="addForm">حفظ التعديلات</b-button>
            </div>

            <div class="right-elements">
              <div class="top">
                <input type="file" accept="image/" class="hidden" ref="logoFile" @change="addLogo">
                <div v-b-popover.hover.right="'أضف الشعار (220*200)'" class="add-logo">
                  <button type="reset" class="add-logo-btn" @click="browse">
                    <i class="fas fa-plus-circle"></i>شعار
                  </button>
                </div>
              </div>
              <div class="bottom">
                <i @click="addNewQuestion" class="fas fa-plus-circle" v-b-popover.hover.right="'اضف سؤال جديد'"></i>
                <i @click="addNewTitle" v-b-popover.hover.right="'أضف عنوانًا ووصفًا جديدين'" class="fas fa-heading"></i>
                <input type="file" accept="image/" class="hidden" ref="imageFile" @change="addImage">
                <i @click="addNewImage" v-b-popover.hover.right="'أضف صورة جديدة'" class="far fa-image"></i>
                <i @click="addNewVideo" v-b-popover.hover.right="'أضف فيديو جديد'" class="fas fa-video"></i>
              </div>
            </div>

          </div>

          <div v-if="displayTheme" class="theme">

            <div class="theme-header">
              <i class="fas fa-palette"></i>
              <p>خيارات السمة</p>
              <i @click="closeTheme" class="fas fa-times close"></i>
            </div>

            <div class="image-header">
              <p class="p-header">الغلاف</p>
              <div class="image-header-content">
                <div v-if="form.image_header === ''">
                  <input type="file" accept="image/" class="hidden" ref="imageHeader" @change="changeFormHeaderImage">
                  <button type="reset" @click="browseFormHeaderImage" class="btn-image-header d-flex">
                    <i class="fas fa-image"></i>
                    <p>اختار صورة</p>
                  </button>
                  <p class="header-size">1100*200px</p>
                </div>
                <div v-else>
                  <button type="reset" class="btn-remove-image-header d-flex">
                    <i class="fas fa-image"></i>
                    <p>رفع الصورة</p>
                    <i @click="removeFormHeaderImage" class="fas fa-times"></i>
                  </button>
                </div>

              </div>
            </div>

            <div class="theme-color">
              <p class="p-header">لون السمة</p>
              <div class="theme-color-content">
                <i @click="editTheme('default')" v-b-popover.hover.top="'Default #9d55a0'" class="fas fa-circle color-1"></i>
                <i @click="editTheme('theme-1')" v-b-popover.hover.top="'Red #db4437'" class="fas fa-circle color-2"></i>
                <i @click="editTheme('theme-2')" v-b-popover.hover.top="'Purple #673ab7'" class="fas fa-circle color-3"></i>
                <i @click="editTheme('theme-3')" v-b-popover.hover.top="'Indigo #3f51b5'" class="fas fa-circle color-4"></i>
                <i @click="editTheme('theme-4')" v-b-popover.hover.top="'Blue #4285f4'" class="fas fa-circle color-5"></i>
                <i @click="editTheme('theme-5')" v-b-popover.hover.top="'Light Blue #03a9f4'" class="fas fa-circle color-6"></i>
                <i @click="editTheme('theme-6')" v-b-popover.hover.top="'Red Orange #ff5722'" class="fas fa-circle color-7"></i>
                <i @click="editTheme('theme-7')" v-b-popover.hover.top="'Orange #ff9800'" class="fas fa-circle color-8"></i>
                <i @click="editTheme('theme-8')" v-b-popover.hover.top="'Teal #009688'" class="fas fa-circle color-9"></i>
                <i @click="editTheme('theme-9')" v-b-popover.hover.top="'Green #4caf50'" class="fas fa-circle color-10"></i>
                <i @click="editTheme('theme-10')" v-b-popover.hover.top="'Blue Gray #607d8b'" class="fas fa-circle color-11"></i>
                <i @click="editTheme('theme-11')" v-b-popover.hover.top="'Gray #9e9e9e'" class="fas fa-circle color-12"></i>
              </div>
            </div>

            <div class="text-font">
              <p class="p-header">نوع الخط</p>
              <div class="text-font-content">
                <b-form-select v-model="form.font_family" class="mb-3">
                  <b-form-select-option value="default-font">Basic</b-form-select-option>
                  <b-form-select-option value="Playful">Playful</b-form-select-option>
                  <b-form-select-option value="Roboto-Mono">Roboto Mono</b-form-select-option>
                </b-form-select>

              </div>
            </div>

          </div>

        </div>

        <div class="mobile-add">
          <div class="mobile-add-content">
            <input type="file" accept="image/" class="hidden" ref="file" @change="addLogo">
            <div v-b-popover.hover.top="'Add logo'" class="add-logo">
              <button type="reset" class="add-logo-btn" @click="browse">
                <i class="fas fa-plus-circle"></i>Logo
              </button>
            </div>
            <i @click="addNewQuestion" class="fas fa-plus-circle" v-b-popover.hover.top="'Add new question'"></i>
            <i @click="addNewTitle" v-b-popover.hover.top="'Add new title and description'" class="fas fa-heading"></i>
            <i @click="addNewImage" v-b-popover.hover.top="'Add new image'" class="far fa-image"></i>
            <i @click="addNewVideo" v-b-popover.hover.top="'Add new video'" class="fas fa-video"></i>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import CreateFormHeader from "../../components/form/CreateFormHeader";
import SendForm from "./SendForm";
import store from "@/store";
import router from "@/router";
export default {
  name: "FormEdit",
  components: {
    SendForm,
    CreateFormHeader
  },
  data() {
    return {
      deleted_questions_id: [],
      form: '',
      error: '',
      currentQuestion: '1',
      isLoading: false,
      modalShow: false,
      displayTheme: false,
      displaySend: false,
    }
  },
  created() {
    if (!store.getters.isAuthenticated) {
      router.push('/')
    }
    this.loadForm(this.$route.params.id)
  },
  computed: {
    getLang() {
      return this.$store.getters['main/getLang'];
    }
  },
  methods: {
    showTheme(theme) {
      this.displayTheme = theme;
    },
    closeTheme() {
      this.displayTheme = false;
    },
    showSend() {
      this.displaySend = true;
    },
    closeSend() {
      this.displaySend = false;
    },
    addLogo(e) {
      this.logo_file = e.target.files[0];
      this.$emit('input', this.logo_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.logo_file);
      reader.onload = e => {
        this.form.logo = e.target.result;
      }
    },
    browse() {
      this.$refs.logoFile.click();
    },
    addNewQuestion() {
      this.form.questions.push(
          {
            id: Date.now(),
            type: 'question',
            question: 'Question',
            description: 'Description',
            question_type: 'Number',
            focus: true,
            default_answer: '',
            new_question: true,
            options: [
              {
                id: Date.now(),
                value: 'option 1',
                text: 'option 1'
              }
            ],
          });
    },
    addNewTitle() {
      this.form.questions.push(
          {
            id: Date.now(),
            question: 'Title',
            type: 'title',
            question_type: 'title',
            required: '',
            new_question: true,
            description: 'Description',
            focus: true,
          });
    },
    async addImage(e) {
      this.isLoading = true
      this.file = e.target.files[0];
      this.$emit('input', this.file);

      let formdata = new FormData();
      formdata.append("image", this.file);

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      await fetch("https://yaformelbanna.we-work.pro/api/upload-image", requestOptions)
          .then(response => response.json())
          .then(result => {
            this.form.questions.push(
                {
                  id: Date.now(),
                  image_file: this.file,
                  question: 'Image title',
                  type: 'image',
                  new_question: true,
                  question_type: 'image',
                  required: '',
                  description: result.data,
                  focus: true,
                });

          })
          .catch(error => {
            this.error = error
            this.showModal()
          });

      this.isLoading = false
    },
    addNewImage() {
      this.$refs.imageFile.click();
    },
    addNewVideo() {
      this.form.questions.push(
          {
            id: Date.now(),
            question: 'Video title',
            new_question: true,
            type: 'video',
            question_type: 'video',
            description: '',
            required: '',
            focus: true,
            display_video: false,
          });
    },
    duplicate(currentQuestion) {
      this.form.questions.push(
          {
            id: Date.now(),
            question: currentQuestion.question,
            type: currentQuestion.type,
            question_type: currentQuestion.question_type,
            required: currentQuestion.required,
            description: currentQuestion.description,
            display_video: false,
            default_answer: currentQuestion.default_answer,
            new_question: true,
            focus: true,
            options: [
              {
                id: Date.now(),
                value: 'option 1',
                text: 'option 1'
              }
            ],
          });
    },
    remove(question) {
      this.deleted_questions_id.push(question.id);
      const removeIndex = this.form.questions.findIndex(value => value.id === question.id);
      this.form.questions.splice(removeIndex, 1);
    },
    removeSocialMedia(id) {
      const removeIndex = this.form.social_media.findIndex(value => value.id === id);
      this.form.social_media.splice(removeIndex, 1);
    },
    addOtherOption(question) {
      const questionId = question.id;
      this.form.questions.find(value => {
        if (value.id === questionId) {
          value.options.push({
            id: Date.now(),
            value: 'new option',
            text: 'new option'
          })
        }
      })
    },
    removeChoice(option ,question) {
      const questionId = question.id;
      const optionId = option.id;
      this.form.questions.find(value => {
        if (value.id === questionId) {
          const removeIndex = value.options.findIndex(value1 => value1.id === optionId);
          value.options.splice(removeIndex, 1);
        }
      })

    },
    divFocus(question) {
      const questionId = question.id;
      this.form.questions.find(value => {
        if (value.id === questionId) {
          value.focus = true;
        } else {
          value.focus = false;
        }
      })
    },
    editTheme(theme) {
      this.form.style_theme = theme;
    },
    browseFormHeaderImage() {
      this.$refs.imageHeader.click();
    },
    changeFormHeaderImage(e) {
      this.image_header_file = e.target.files[0];
      this.$emit('input', this.image_header_file);
      let reader = new FileReader();
      reader.readAsDataURL(this.image_header_file);
      reader.onload = e => {
        this.form.image_header = e.target.result;
      }
    },
    removeFormHeaderImage() {
      this.form.image_header = '';
    },
    addVideo(id) {
      this.form.questions.find(value => {
        if (value.id === id) {
          value.displayVideo = true;
          const youtube = `https://www.youtube.com/embed/${value.description.slice(value.description.indexOf("=") + 1)}?controls=0`
          value.description = youtube
        }
      })

    },
    setSelectValue(option, question) {
      let questionId = question.id;
      let optionId = option.id;
      this.form.questions.find(question => {
        if (question.id === questionId) {
          question.options.find(option => {
            if (option.id === optionId) {
              option.text = option.value
            }
          })
        }
      })
    },
    async loadForm(id) {
      this.isLoading = true;

      let myHeaders = new Headers();

      let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let url = `https://yaformelbanna.we-work.pro/api/get-form/` + id;

      await fetch(url, requestOptions)
          .then(response => response.json())
          .then(responseData => {
            if (responseData.status) {
              this.form = responseData.data
            } else {
              console.log(responseData.msg)
              this.error = responseData.msg
              this.modalShow = true
            }
          })
          .catch(error => {
            console.log(error)
            this.error = error
            this.modalShow = true
          })


      this.isLoading = false;

    },
    async addForm() {
      this.isLoading = true;

      let token = this.$store.getters.token;

      let myHeaders = new Headers();
      myHeaders.append("authToken", token);

      let formdata = new FormData();
      formdata.append("form_type", this.form.form_type);
      formdata.append("header", this.form.header);
      formdata.append("logo", this.logo_file);
      formdata.append("description", this.form.description);
      formdata.append("style_theme", this.form.style_theme);
      formdata.append("font_family", this.form.font_family);
      formdata.append("msg", this.form.msg);
      formdata.append("image_header", this.image_header_file);

      let requestOptionsForCreate = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      let raw = JSON.stringify({
        "social_media": this.form.social_media,
        "questions": this.form.questions,
        "deleted_questions_id": this.deleted_questions_id,
      });

      let requestOptionsForAppend = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      if (this.form.is_quiz) {
        let url = `https://yaformelbanna.we-work.pro/api/auth/update-quiz/` + this.form.id;

        await fetch(url, requestOptionsForCreate)
            .then(response => response.json())
            .then(responseData => {

              console.log(this.form.questions)
              console.log(this.deleted_questions_id)

              if (responseData.status) {
                url = `https://yaformelbanna.we-work.pro/api/auth/append-update-quiz/` + this.form.id;

                myHeaders.append("Content-Type", "application/json");
                fetch(url, requestOptionsForAppend)
                    .then(response => response.json())
                    .then(responseData => {
                      if (responseData.status) {
                        this.$router.push('/form-view/' + this.form.id)
                      }
                      else {
                        console.log(responseData.msg)
                        this.error = responseData.msg
                        this.modalShow = true
                      }
                    })
                    .catch(error => {
                      console.log(error)
                      this.error = error
                      this.modalShow = true
                    })
              } else {
                console.log(responseData.msg)
                this.error = responseData.msg
                this.modalShow = true
              }
            })
            .catch(error => {
              console.log(error)
              this.error = error
              this.modalShow = true
            })



      }
      else if (this.form.is_template) {
        let url = `https://yaformelbanna.we-work.pro/api/auth/update-template/` + this.form.id;

        await fetch(url, requestOptionsForCreate)
            .then(response => response.json())
            .then(responseData => {
              if (responseData.status) {
                url = `https://yaformelbanna.we-work.pro/api/auth/append-update-template/` + this.form.id;

                myHeaders.append("Content-Type", "application/json");
                fetch(url, requestOptionsForAppend)
                    .then(response => response.json())
                    .then(responseData => {
                      if (responseData.status) {
                        this.$router.push('/form-view/' + this.form.id)
                      } else {
                        console.log(responseData.msg)
                        this.error = responseData.msg
                        this.modalShow = true
                      }
                    })
                    .catch(error => {
                      console.log(error)
                      this.error = error
                      this.modalShow = true
                    })


              }
              else {
                console.log(responseData.msg)
                this.error = responseData.msg
                this.modalShow = true
              }
            })
            .catch(error => {
              console.log(error)
              this.error = error
              this.modalShow = true
            })

      }
      else {
        let url = `https://yaformelbanna.we-work.pro/api/auth/update-form/` + this.form.id;

        await fetch(url, requestOptionsForCreate)
            .then(response => response.json())
            .then(responseData => {

              if (responseData.status) {
                url = `https://yaformelbanna.we-work.pro/api/auth/append-update-form/` + this.form.id;

                myHeaders.append("Content-Type", "application/json");

                fetch(url, requestOptionsForAppend)
                    .then(response => response.json())
                    .then(responseData => {
                      if (responseData.status) {
                        this.$router.push('/form-view/' + this.form.id)
                      }
                      else {
                        console.log(responseData.msg)
                        this.error = responseData.msg
                        this.modalShow = true
                      }
                    })
                    .catch(error => {
                      console.log(error)
                      this.error = error
                      this.modalShow = true
                    })


              } else {
                console.log(responseData.msg)
                this.error = responseData.msg
                this.modalShow = true
              }
            })
            .catch(error => {
              console.log(error)
              this.error = error
              this.modalShow = true
            })
      }
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Style+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

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

.default-font {
  --var-font: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
}

.Playful {
  --var-font: 'Style Script', cursive;
}

.Roboto-Mono {
  --var-font: 'Roboto Mono', monospace;
}

.select-form-type .container {
  padding: 40px;
}

.select-form-type-header {
  padding: 20px;
  margin: 5px 0;
}

.select-form-type-header h1 {
  font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #2B3245;
  margin: 0;
  line-height: 1.15;
}

.select-form-type-header p {
  font-family: 'Google Sans', Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #8D8FA8;
  margin: 0 10px;
  letter-spacing: 0.001px;
  line-height: 1.15;
}

.select-form-type-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.select-form-type-content .classic-form,
.select-form-type-content .card-form {
  margin: 15px 30px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 250px;
  padding: 55px 10px 0;
  background-color: rgb(53,149,246);
}

.select-form-type-content .classic-form {
  background-color: #BC77BF;
}

.classic-footer, .card-form-footer  {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.classic-footer h3,
.card-form-footer h3 {
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 4px;
  padding: 0;
  transition: .3s;
  font-size: 18px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  line-height: 1.15;
  cursor: pointer;
}

.classic-footer p,
.card-form-footer p {
  text-align: center;
  color: #8D8FA8;
  font-size: 16px;
  margin-top: 2px;
  line-height: 1.15;
}

.select-form-type-classic:hover .classic-form,
.select-form-type-card:hover .card-form {
  margin-top: 0;
  border: 3px solid #9d55a0;
}

.select-form-type-classic:hover .classic-footer h3,
.select-form-type-classic:hover .classic-footer p,
.select-form-type-card:hover .card-form-footer h3,
.select-form-type-card:hover .card-form-footer p {
  color: #9d55a0;
}

.select-form-type .ar {
  direction: rtl;
  text-align: right;
}


.home {
  background-color: var(--var-second-color);
  min-height: 100vh;
}

.ar {
  direction: rtl;
  text-align: right;
}

.mobile-add {
  display: none;
}

.hidden {
  display: none;
}

.main-content .container {
  width: 70%;
  display: flex;
}

.create-form {
  width: 92%;
  margin-right: 2%;
}

.ar .create-form {
  margin-left: 2%;
  margin-right: 0;
}

.form-image-header {
  display: flex;
  justify-content: center;
  margin: 10px 0 20px;
  max-height: 200px;
}

.form-image-header img {
  width: 100%;
  max-height: 100%;
  border-radius: 15px;
}


.right-elements {
  width: 5%;
  display: flex;
  flex-direction: column;
}

.right-elements .top {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
}

.right-elements .top  i {
  font-size: 130%;
}

.add-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-logo-btn {
  font-size: 12px;
  color: #111111;
  margin: 0;
  border: none;
  background: none;
}

.add-logo-btn:hover {
  color: var(--var-main-color);
}

.right-elements .bottom {
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
}

.right-elements .bottom i {
  font-size: 120%;
  margin: 10px 0px;
}

.right-elements .bottom i:hover {
  color: var(--var-main-color);
  cursor: pointer;
}

.form-header {
  padding: 15px;
  background-color: #FFFFFF;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  border-top: 8px solid var(--var-main-color);
  margin-bottom: 20px;
  border-right: 1px solid #c4c4c4;
  border-left: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
}

.form-title {
  width: 79%;
  margin-right: 1%;
}

.form-logo {
  width: 220px;
  max-height: 120px;
}

.input-title:focus,
.input-description:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.input-title {
  padding: 0 20px 0 5px;
  border: 0;
  font-size: 28px;
  font-weight: 600;
  color: #111111;
  margin: 10px;
  font-family: var(--var-font);
  width: 80%;
}

.input-title::placeholder {
  color: #111111;
}

.input-title:focus {
  border-bottom: 3px solid var(--var-main-color);
}

.input-description {
  border: 0;
  font-size: 14px;
  color: #111111;
  margin: 10px;
  width: 90%;
}

.input-description:focus {
  border-bottom: 1px solid var(--var-main-color);
}

.form-logo img {
  border-radius: 15px;
  width: 100%;
  height: 100%;
}

.form-question {
  padding: 25px 0 0;
  background-color: #FFFFFF;
  border-radius: 15px;
  margin-bottom: 20px;
  border-right: 1px solid #c4c4c4;
  border-top: 1px solid #c4c4c4;
  border-bottom: 1px solid #c4c4c4;
}

.true {
  border-left: 8px solid var(--var-main-color);
}

.form-question-row-1 {
  display: flex;
  margin-bottom: 10px;
  padding: 10px 20px;
}

.form-question-row-2 {
  margin-bottom: 10px;
  padding: 0 20px;
}

.input-question {
  border: none;
  border-bottom: 3px solid #dddddd;
  margin-right: 20px;
  font-family: var(--var-font);
  font-size: 20px;
}

.input-question:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px solid var(--var-main-color);
}

.select-answer {
  width: 45%;
}

.input-answer {
  border: none;
  margin: 10px 0;
  width: 60%;
  border-bottom: 3px dotted #dddddd;
}

.input-answer:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px dotted var(--var-main-color);
}

.input-paragraph {
  border: none;
  margin: 10px 0;
  width: 80%;
  border-bottom: 3px dotted #dddddd;
}

.input-paragraph:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px dotted var(--var-main-color);
}

.multiple-choice-row {
  display: flex;
}

.multiple-choice-row i {
  margin: auto 10px;
}

.multiple-choice-row .close {
  cursor: pointer;
}

.multiple-choice-row .close:hover {
  color: var(--var-main-color);
}

.multiple-choice-input {
  border: none;
  border-bottom: 3px solid #dddddd;
  width: 70%;
  color: #111111;
}

.multiple-choice-input:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px solid var(--var-main-color);
}

.choice-row h6 {
  margin: 10px;
  cursor: pointer;
}

.choice-row h6:hover {
  color: var(--var-main-color);
}

.choice-row ul {
  list-style-type: lower-alpha;
}

.date-row input,
.time-row input {
  width: 150px;
}

.question-footer {
  padding: 10px 15px;
  border-top: 1px solid #c4c4c4;
  display: flex;
}

.hidden-class {
  width: 70%;
}

.question-footer-content {
  width: 30%;
  display: flex;
  justify-content: center;
}

.question-footer i {
  font-size: 120%;
  margin: 10px;
  cursor: pointer;
}

.question-footer i:hover {
  color: var(--var-main-color);
}

.ar .required {
  margin-right: 20px;
  padding-right: 20px;
  border-right: 2px solid #c4c4c4;
}

.en .required {
  margin-left: 20px;
  padding-left: 20px;
  border-left: 2px solid #c4c4c4;
}

.required p {
  margin: auto 0;
  font-weight: 500;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 0 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--var-main-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--var-main-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.else-type-content {
  padding: 5px 20px;
}

.else-type-header {
  display: flex;
}

.else-type-header-input {
  width: 80%;
  margin: auto 20px auto 0 ;
  border: none;
  border-bottom: 3px solid #dddddd;
  font-family: var(--var-font);
  font-size: 20px;
}

.else-type-header-input:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 3px solid var(--var-main-color);
}

.else-type-header-icons {
  margin: auto 0 auto auto;
}

.else-type-header-icons i {
  font-size: 120%;
  margin: auto 10px;
  cursor: pointer;
}

.else-type-header-icons i:hover {
  color: var(--var-main-color);
}

.title-description-input {
  margin: 10px 5px 20px;
  border: none;
  border-bottom: 1px solid #dddddd;
  font-size: 16px;
}

.title-description-input:focus {
  outline: none;
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid var(--var-main-color);
}

.image-type-content {
  display: flex;
  justify-content: center;
  padding: 20px 10px 30px;
  max-height: 400px;
}

.image-type-content img {
  width: 100%;
  max-height: 100%;
  border-radius: 15px;
}

.theme {
  position: fixed;
  right: 0;
  background: #FFFFFF;
  border-left: 1px solid #c4c4c4;
  top: -19px;
  z-index: 999;
  width: 300px;
  padding: 0 20px 50px;
}

.theme-header {
  display: flex;
  padding: 16px 0;
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
  margin-bottom: 10px;
}

.theme-header p {
  margin: auto 0;
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: .1px;
  line-height: 24px;
  color: #202124;

}

.theme-header i {
  margin: auto 10px;
  color: var(--var-main-color);
}

.theme-header .close {
  color: #111111;
  cursor: pointer;
  margin: auto 10px auto auto;
}

.theme .p-header {
  font-family: Roboto,Arial,sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .3px;
  line-height: 16px;
  color: #202124;
}

.image-header {
  margin: 20px 0;
  padding: 0 10px 20px;
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
}

.btn-image-header {
  border: 1px solid #c1c1c1;
  padding: 5px 10px;
  color: #1a73e8;
  width: 160px;
  margin: 10px;
  cursor: pointer;
}

.btn-image-header i {
  margin: auto 0;
  font-size: 120%;
}

.btn-image-header p {
  margin: auto 5px;
}

.btn-remove-image-header {
  border: 1px solid #c1c1c1;
  padding: 5px 10px;
  width: 200px;
  margin: 10px;
}

.btn-remove-image-header p {
  margin: auto 5px;
}

.btn-remove-image-header .fa-image {
  margin: auto 0;
  font-size: 120%;
  color: var(--var-main-color);
}

.btn-remove-image-header .fa-times {
  margin: auto 5px auto auto;
}

.btn-remove-image-header .fa-times:hover {
  color: var(--var-main-color);
}

.video-url input {
  width: 75%;
}

.video-url button {
  margin: auto 0 auto auto;
  color: var(--var-main-color);
  border: 1px solid var(--var-main-color);
  background-color: #FFFFFF;
}

.video-url button:hover {
  color: #FFFFFF;
  background-color: var(--var-main-color);
}


.theme-color {
  box-shadow: 0 4px 2px -2px rgba(0,0,0,.2);
  margin: 20px 0;
  padding: 0 10px 20px;
}

.theme-color-content {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
}

.theme-color-content i {
  font-size: 180%;
  margin: 5px;
  cursor: pointer;
}

.theme-color-content i:hover {
  font-size: 190%;
}

.color-1 {
  color: #9d55a0;
}

.color-2 {
  color: #db4437;
}

.color-3 {
  color: #673ab7;
}

.color-4 {
  color: #3f51b5;
}

.color-5 {
  color: #4285f4;
}

.color-6 {
  color: #03a9f4;
}

.color-7 {
  color: #ff5722;
}

.color-8 {
  color: #ff9800;
}

.color-9 {
  color: #009688;
}

.color-10 {
  color: #4caf50;
}

.color-11 {
  color: #607d8b;
}

.color-12 {
  color: #9e9e9e;
}


.btn {
  color: var(--var-main-color);
  background-color: #FFFFFF;
  border: 1px solid var(--var-main-color);
  padding: 8px 20px;
  margin: auto 20px;
}

.btn:hover {
  background-color: var(--var-main-color);
  color: #FFFFFF;
  border: 1px solid var(--var-main-color);
}

.select-form-type-content {
  margin-bottom: 20px;
}

.footer {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  margin-top: 40px;
}

.header-size {
  color: #70757a;
  margin: 0 10px;
  font-size: 12px;
  font-weight: 600;
}

.main-spinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

@media (max-width:1024px) {
  .main-content .container {
    width: 98%;
  }

  .create-form {
    width: 95%;
  }

  .right-elements {
    display: none;
  }

  .mobile-add {
    display: block;
    width: 100%;
    background: #FFFFFF;
    padding: 10px;
    border-top: 1px solid #c4c4c4;
    z-index: 1000;
  }

  .mobile-add-content {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .mobile-add-content i {
    color: #111111;
    margin: auto 5px;
    cursor: pointer;
  }

  .mobile-add-content i:hover {
    color: var(--var-main-color);
  }


  .form-header, .form-title, .form-logo {
    margin: 0;
    padding: 0;
  }

  .form-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  .form-title, .form-logo {
    width: 95%;
  }

  .form-title input {
    margin: 0 0 5px 5px;
    width: 95%;
  }

  .form-logo img {
    width: 100px;
    height: 100px;
    margin: 0 10px;
  }

  .form-question-row-1 {
    display: flex;
    flex-direction: column;
  }

  .select-answer {
    margin: 5px 10px;
    width: 90%;
  }

  .hidden-class {
    display: none;
  }

  .question-footer {
    justify-content: center;
  }

  .question-footer-content {
    width: 90%;
  }

  .else-type-header-input {
    width: 98%;
  }

  .theme {
    top: -19px;
  }

  .video-url input {
    width: 60%;
  }
}
</style>