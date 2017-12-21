<template>
  <div class="main container">
    <button class="feedback-button" @click="togglePopUp()">
      <i class="icon icon-closed" v-show="!opened"></i>
      <i class="icon icon-opened" v-show="opened"></i>
      {{buttonText}}
    </button>

    <div class="pop-up-container" v-show="opened">
      <div class="header">
        <i class="icon icon-opened"></i>
        <slot name="header-text">Ask our experts!</slot>
      </div>

      <div class="form-container" v-show="!submitted">

        <div class="user-block">
          <img class="avatar" :src="avatarUrl" v-if="!showAvatarPlaceholder" alt="avatar">
          <div class="avatar-placeholder" v-show="showAvatarPlaceholder">
            <i class="icon icon-avatar"></i>
          </div>
          <h5 class="name">{{name}}</h5>
          <h6 class="email">{{email}}</h6>
        </div>

        <div :class="['input-container', 'input', 'name', {danger: errors.has('name')}]" v-if="!showUserBlock">
          <label>
            {{nameLabel}}
          </label>
          <input name="name"
                 v-model="form.name"
                 v-validate="{required: true}"
                 :placeholder="nameLabel"
                 type="text">
          <span v-show="errors.has('name')" class="error danger">{{ errors.first('name') }}</span>
        </div>

        <div :class="['input-container', 'input', 'email', {danger: errors.has('email')}]" v-if="!showUserBlock">
          <label>
            {{emailLabel}}
          </label>
          <input name="email"
                 v-model="form.email"
                 v-validate="{required: true, email: true}"
                 :placeholder="emailLabel"
                 type="email">
          <span v-show="errors.has('email')" class="error danger">{{ errors.first('email') }}</span>
        </div>

        <div :class="['input-container', 'input', 'subject', {danger: errors.has('subject')}]">
          <label>
            {{subjectLabel}}
          </label>
          <input name="subject"
                 v-model="form.subject"
                 v-validate="{required: true, max: limit.subjectLimit}"
                 type="text"
                 :placeholder="subjectLabel">
          <div class="char-count">{{form.subject.length}} / {{limit.subjectLimit}}</div>
          <span v-show="errors.has('subject')" class="error danger">{{ errors.first('subject') }}</span>
        </div>

        <div :class="['input-container', 'textarea', 'message', {danger: errors.has('message')}]">
          <label>
            {{messageLabel}}
          </label>
          <textarea name="message"
                    v-model="form.message"
                    v-validate="{required: true, max: limit.messageLimit}"
                    :placeholder="messageLabel">
          </textarea>
          <div class="char-count">{{form.message.length}} / {{limit.messageLimit}}</div>
          <span v-show="errors.has('message')" class="error danger">{{ errors.first('message') }}</span>
        </div>

      </div>

      <div class="pop-up-controls">

        <div class="error-info" v-show="errors.any()">
          <i class="icon icon-danger"></i>
          {{globalErrorWarning}}
        </div>
        <button @click="submit()">
          {{submitButtonText}}
        </button>
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
  import '../style/main.less';

  export default {
    name: 'django-feedback',
    props: {
      name: String,
      email: String,
      avatarUrl: String,
      buttonText: {
        type: String,
        default: 'Open'
      },
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
      },
      async submit () {
        await this.$validator.validateAll();
        if (!this.errors.any()) {
          this.submitted = true;
        }
      }
    }
  };
</script>

<style lang="less">
</style>
