<template>
  <div :class="['vue-django-feedback', 'main', 'container', 'right', {opened}]">
    <button class="feedback-button" @click="togglePopUp()" >
      <i class="icon icon-closed"><span>&times</span></i>
      <i class="icon icon-opened"><span>?</span></i>
    </button>

    <div class="pop-up-container">
      <div class="header">
        <i class="icon icon-opened"><span>?</span></i>
        <h2><slot name="header-text">Ask our experts!</slot></h2>
      </div>

      <div class="form-container" v-show="!submitted">

        <div class="user-block" v-show="showUserBlock">
          <div class="avatar">
            <img class="avatar-img" :src="avatarUrl" v-if="!showAvatarPlaceholder" alt="avatar">
            <div class="avatar-placeholder" v-show="showAvatarPlaceholder">
              <i class="icon icon-avatar"></i>
            </div>
          </div>
          <div class="user">
            <span class="name">{{name}}</span>
            <span class="email">{{email}}</span>
          </div>
        </div>

        <div :class="['input-container', 'input', 'name', {danger: errors.has('name')}]" v-if="!showUserBlock">
          <label>
            {{nameLabel}}
          </label>
          <input name="name"
                 v-model="form.name"
                 v-validate="{required: true}"
                 type="text">
          <div class="feedback">
            <div class="errors">
              <span v-show="errors.has('name')" class="error danger">{{ errors.first('name') }}</span>
            </div>
          </div>
        </div>

        <div :class="['input-container', 'input', 'email', {danger: errors.has('email')}]" v-if="!showUserBlock">
          <label>
            {{emailLabel}}
          </label>
          <input name="email"
                 v-model="form.email"
                 v-validate="{required: true, email: true}"
                 type="email">
          <div class="feedback">
            <div class="errors">
              <span v-show="errors.has('email')" class="error danger">{{ errors.first('email') }}</span>
            </div>
          </div>
        </div>

        <div :class="['input-container', 'input', 'subject', {danger: errors.has('subject')}]">
          <label>
            {{subjectLabel}}
          </label>
          <input name="subject"
                 v-model="form.subject"
                 v-validate="{required: true, max: limit.subjectLimit}"
                 type="text">
          <div class="feedback">
            <div class="errors">
              <span v-show="errors.has('subject')" class="error danger">{{ errors.first('subject') }}</span>
            </div>
            <div class="char-count">{{form.subject.length}} / {{limit.subjectLimit}}</div>
          </div>
        </div>

        <div :class="['input-container', 'textarea', 'message', {danger: errors.has('message')}]">
          <label>
            {{messageLabel}}
          </label>
          <textarea name="message"
                    rows="3"
                    v-model="form.message"
                    v-validate="{required: true, max: limit.messageLimit}">
          </textarea>
          <div class="feedback">
            <div class="errors">
              <span v-show="errors.has('message')" class="error danger">{{ errors.first('message') }}</span>
            </div>
            <div class="char-count">{{form.message.length}} / {{limit.messageLimit}}</div>
          </div>
        </div>

      </div>

      <div class="pop-up-controls" v-show="!submitted">
        <div class="actions">
          <button @click="submit()">
            {{submitButtonText}}
          </button>
        </div>
          <div class="error-info" v-show="errors.any()">
            <i class="icon icon-danger"><span>!</span></i>
            {{globalErrorWarning}}
          </div>
        </div>

      <div class="message-container" v-show="submitted">
        <h4>
          <slot name="success-header">
            Thank you!
          </slot>
        </h4>
        <p>
          <slot name="success-message">
            Your message has been successfully sent!
            We will be back to you soon!
          </slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'django-feedback',
    props: {
      name: String,
      email: String,
      avatarUrl: String,
      submitButtonText: {
        type: String,
        default: 'Submit'
      },
      globalErrorWarning: {
        type: String,
        default: 'Error!'
      },
      nameLabel: {
        type: String,
        default: 'Your name'
      },
      emailLabel: {
        type: String,
        default: 'Your email'
      },
      subjectLabel: {
        type: String,
        default: 'Subject'
      },
      messageLabel: {
        type: String,
        default: 'Message / Question'
      }
    },
    data () {
      return {
        opened: false,
        submitted: false,
        form: {
          name: '',
          email: '',
          subject: '',
          message: ''
        },
        limit: {
          subjectLimit: 120,
          messageLimit: 999
        }
      };
    },
    computed: {
      showUserBlock () {
        return !!(this.name && this.email);
      },
      showAvatarPlaceholder () {
        return !this.avatarUrl;
      }
    },
    methods: {
      togglePopUp () {
        this.opened = !this.opened;
        if (!this.opened) {
          this.form.name = '';
          this.form.email = '';
          this.form.subject = '';
          this.form.message = '';
          this.submitted = false;
        }
        this.errors.clear();
      },
      async submit () {
        await this.$validator.validateAll();
        if (!this.errors.any()) {
          // await axios.post();
          this.submitted = true;
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../style/main.less';

</style>
