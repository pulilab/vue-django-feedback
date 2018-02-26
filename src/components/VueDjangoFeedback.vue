<template>
  <div :class="['vue-django-feedback', 'main', 'container', 'right', {opened}]">
    <button class="feedback-button"
            @click="togglePopUp()"
            v-on:mouseenter="handleMouseOver(true)"
            v-on:mouseleave="handleMouseOver(false)">
      <i class="icon icon-closed"><span>&times;</span></i>
      <i class="icon icon-opened"><span>?</span></i>
    </button>

    <div :class="['hint-container', {open: showHintContainer}]">
      <p>
        <slot name="hint-text">
          Click here if you are experiencing any issues or have suggestion for improving the website!
        </slot>
      </p>
    </div>

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
          <button @click="submit()" :disabled="processing">
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

      <div class="message-container" v-show="apiError">
        <h4 class="error">
          <slot name="error-header">
            Sorry
          </slot>
        </h4>
        <p>
          <slot name="error-message">
            There was a problem processing your ticket,
            please try again
          </slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import 'document-register-element/build/document-register-element';

  export default {
    name: 'vue-django-feedback',
    beforeCreate () {
      this.axios = axios.create();
    },
    props: {
      apiUrl: {
        type: String,
        default: '/api/tickets/'
      },
      authToken: {
        type: String,
        default: ''
      },
      meta: {
        type: String,
        default: undefined
      },
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
        apiError: false,
        processing: false,
        buttonHover: false,
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
      },
      parsedMeta () {
        let result = {};
        try {
          result = JSON.parse(this.meta);
        }
        catch (e) {
          console.warn('unable to parse the meta field', e);
        }
        return result;
      },
      showHintContainer () {
        return this.buttonHover && !this.opened;
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
          this.apiError = false;
        }
        this.errors.clear();
      },
      async submit () {
        await this.$validator.validateAll();
        if (!this.errors.any()) {
          this.processing = true;
          try {
            const data = {
              email: this.email ? this.email : this.form.email,
              subject: this.form.subject,
              text: this.form.message,
              meta: {
                ...this.parsedMeta,
                name: this.name ? this.name : this.form.name
              }
            };
            await this.axios.post(this.apiUrl, data);
            this.submitted = true;
            this.apiError = false;
          } catch (e) {
            this.apiError = true;
            console.warn(e);
          }
          this.processing = false;
        }
      },
      handleMouseOver (status) {
        this.buttonHover = status;
      }
    },
    watch: {
      authToken: {
        immediate: true,
        handler (value) {
          if (value && value.length > 0) {
            this.axios.defaults.headers.common.Authorization = value;
          }
        }
      }
    }
  };
</script>

<style lang="less">
  @import '../style/main.less';

</style>
