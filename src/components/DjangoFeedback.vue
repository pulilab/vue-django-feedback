<template>
  <div class="vue-django-feedback main container right">
    <button class="feedback-button" @click="togglePopUp()">
      <i class="icon icon-closed" v-show="!opened"></i>
      <i class="icon icon-opened" v-show="opened"></i>
      {{buttonText}}
    </button>

    <div class="pop-up-container" v-show="opened">
      <div class="header">
        <i class="icon icon-opened"><span>?</span></i>
        <h2><slot name="header-text">Ask our experts!</slot></h2>
      </div>

      <div class="form-container" v-show="!submitted">

        <div class="user-block">
          <img class="avatar" :src="avatarUrl" v-if="!showAvatarPlaceholder" alt="avatar">
          <div class="avatar-placeholder" v-show="showAvatarPlaceholder">
            <i class="icon icon-avatar"></i>
          </div>
          <div>
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
                 :placeholder="nameLabel"
                 type="text">
          <div>
            <span v-show="errors.has('name')" class="error danger">{{ errors.first('name') }}</span>
          </div>
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
          <div>
            <span v-show="errors.has('email')" class="error danger">{{ errors.first('email') }}</span>
          </div>
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
          <div>
            <span class="char-count">{{form.subject.length}} / {{limit.subjectLimit}}</span>
            <span v-show="errors.has('subject')" class="error danger">{{ errors.first('subject') }}</span>
          </div>
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
          <div>
            <span class="char-count">{{form.message.length}} / {{limit.messageLimit}}</span>
            <span v-show="errors.has('message')" class="error danger">{{ errors.first('message') }}</span>
          </div>
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
        default: '?'
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

  @import '../style/variables.less';
  @import '../style/mixins.less';

  // TODO
  // Remove
  html {
    min-width: 100%;
    min-height: 100%;
    background-color: #F8F8F8;
  }

  body {
    width: 100%;
    height: 100%;
  }
  //

  .feedback-button {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    min-width: @vdf-button-size;
    min-height: @vdf-button-size;
    width: @vdf-button-size;
    height: @vdf-button-size;
    background-color: @color-primary;
    color: #FFFFFF;
    border-radius: @vdf-button-size;
    box-shadow:
      0 0 6px 0 rgba(0,0,0,.12),
      0 6px 12px 0 rgba(0,0,0,.24);
  }

  .pop-up-container {
    position: absolute;
    bottom: @vdf-button-size + 20px;
    width: @vdf-width;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow:
      0 0 24px 0 rgba(0,0,0,.12),
      0 24px 48px 0 rgba(0,0,0,.24);

    .header {
      .flex-display();
      .flex-direction();
      .align-items(center);
      height: @vdf-button-size;
      padding: 0 20px;
      background-color: @color-primary;
      border-radius: 5px 5px 0 0;

      h2 {
        padding: 0 10px;
        font-size: @vdf-base-font + 4;
        font-weight: 500;
        color: #FFFFFF;
      }
    }

    .form-container {
      padding: @vdf-padding;
    }

    .input-container {
      display: block;
      margin-bottom: @vdf-padding / 2;
    }
  }

  .icon.icon-opened {
    position: relative;
    width: 21px;
    height: 20px;

    > span {
      z-index: 3;
      position: relative;
      display: block;
      font-size: 18px;
      font-weight: 500;
      line-height: 21px;
      color: @color-primary;
      font-style: normal;
      text-align: center;
    }

    &::before {
      content: "";
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 21px;
      height: 20px;
      background-color: #FFFFFF;
      border-radius: 2px;
    }

    &::after {
      content: "";
      z-index: 1;
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -7px;
      width: 0;
    	height: 0;
    	border-left: 6px solid transparent;
    	border-right: 6px solid transparent;
    	border-top: 5px solid #FFFFFF;
    }
  }

  .icon.icon-opened  {}

</style>
