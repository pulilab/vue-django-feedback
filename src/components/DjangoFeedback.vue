<template>
  <div class="vue-django-feedback main container right">
    <button :class="['feedback-button', {opened}]" @click="togglePopUp()" >
      <i class="icon icon-closed"><span>&times</span></i>
      <i class="icon icon-opened"><span>?</span></i>
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

      <div class="pop-up-controls">
        <div class="error-info" v-show="errors.any()">
          <i class="icon icon-danger"><span>!</span></i>
          {{globalErrorWarning}}
        </div>
        <div class="actions">
          <button @click="submit()">
            {{submitButtonText}}
          </button>
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
  import '../style/main.less';

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
    z-index: 11000;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    display: block;
    min-width: @vdf-button-size;
    min-height: @vdf-button-size;
    width: @vdf-button-size;
    height: @vdf-button-size;
    background-color: @color-primary;
    text-align: center;
    color: #FFFFFF;
    border-radius: @vdf-button-size;
    box-shadow:
      0 0 6px 0 rgba(0,0,0,.12),
      0 6px 12px 0 rgba(0,0,0,.24);
    transition: all 350ms @ease-out;

    &:hover {
      box-shadow:
        0 0 12px 0 rgba(0,0,0,.12),
        0 6px 24px 0 rgba(0,0,0,.24);
      transform: scale3d(1.15,1.15,1);
    }

    .icon.icon-opened,
    .icon.icon-closed {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -12px 0 0 -12px;

      > span,
      &::before, &::after {
        transform: translate3d(0,0,0);
      }
    }

    .icon.icon-closed {
      transform: scale3d(0,0,1);
    }

    &.opened {
      .icon-opened {
        > span {
          transform: translate3d(0, -@vdf-button-size, 0);
        }
        &::before, &::after {
          transform: translate3d(0, @vdf-button-size, 0);
        }
      }

      .icon-closed {
        transform: scale3d(1,1,1);
      }
    }
  }

  .pop-up-container {
    z-index: 10000;
    position: absolute;
    bottom: @vdf-button-size + 20px;
    overflow: scroll;
    width: @vdf-width;
    max-height: calc(~"100vh - @{vdf-button-size} - @{vdf-padding} - 40px");
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow:
      0 0 24px 0 rgba(0,0,0,.12),
      0 24px 48px 0 rgba(0,0,0,.24);

    .header {
      position: fixed;
      width: @vdf-width;
      .flex-display();
      .flex-direction(row);
      .align-items(center);
      height: @vdf-button-size;
      padding: 0 20px;
      box-sizing: border-box;
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
      padding: (@vdf-padding + @vdf-button-size) @vdf-padding (@vdf-padding/2 + @vdf-button-size);
    }

    .input-container {
      .flex-display();
      .flex-direction(column);
      margin-bottom: @vdf-padding / 2;
    }
  }

  .pop-up-controls {
    position: fixed;
    bottom: @vdf-button-size + @vdf-padding + 20;
    .flex-display();
    .flex-direction(row);
    .align-items(center);
    .align-content(stretch);
    .justify-content(space-between);
    width: @vdf-width;
    height: @vdf-button-size + 1;
    padding: 0 @vdf-padding;
    border-top: 1px solid @input-border;
    background-color: #FFFFFF;
    box-sizing: border-box;
    border-radius: 0 0 5px 5px;

    .error-info {
      padding-right: @vdf-padding;
      color: @color-error;

      .icon {
        float: left;
        margin-right: 5px;
      }
    }

    .actions {
      .flex-grow(1);
      text-align: right;

      button {
        text-transform: uppercase;
        color: @color-primary;
      }
    }
  }

  .input-container {
    label {
      margin-bottom: @vdf-padding / 5;
      font-size: @vdf-base-font - 4;
      color: @text-primary;
    }

    input {}
    textarea {}

    input,
    textarea {
      min-height: @vdf-line-height;
      padding: 6px 8px;
      font-size: @vdf-base-font;
      color: @text-primary;
      line-height: @vdf-line-height;
      border: 1px solid @input-border;
      border-radius: 3px;
      transition: border-color 350ms @ease-out;

      &:hover,
      &:focus {
        border-color: @text-disabled;
      }

      &.error {
        border-color: @color-error;
      }
    }

    .feedback {
      .flex-display();
      .flex-direction(row);
      margin-top: @vdf-padding / 5;
      font-size: @vdf-base-font - 5;
      line-height: 1.5;
      color: @text-disabled;

      .char-count {
        padding-left: @vdf-padding;
        white-space: nowrap;
      }

      .errors {
        width: 100%;
        color: @color-error;
      }
    }
  }

  .icon.icon-opened {
    position: relative;
    width: 24px;
    height: 24px;

    > span {
      z-index: 11003;
      position: relative;
      display: block;
      font-size: 20px;
      font-weight: 500;
      line-height: 24px;
      color: @color-primary;
      font-style: normal;
      text-align: center;
      transition: all 350ms @ease-bounce;
    }

    &::before {
      content: "";
      z-index: 11002;
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: #FFFFFF;
      border-radius: 2px;
      transition: all 350ms @ease-bounce;
    }

    &::after {
      content: "";
      z-index: 11001;
      position: absolute;
      top: 100%;
      left: 50%;
      margin-top: -1px;
      margin-left: -5px;
      width: 0;
    	height: 0;
    	border-left: 5px solid transparent;
    	border-right: 5px solid transparent;
    	border-top: 6px solid #FFFFFF;
      transition: all 350ms @ease-bounce;
    }
  }

  .icon.icon-closed {
    position: relative;
    width: 24px;
    height: 24px;
    transition: all 350ms @ease-bounce;

    > span {
      position: relative;
      display: block;
      font-size: 24px;
      font-weight: 300;
      line-height: 24px;
      color: #FFFFFF;
      font-style: normal;
      text-align: center;
      transition: all 350ms @ease-bounce;
    }
  }

  .icon.icon-danger {
    position: relative;
    width: 24px;
    height: 24px;

    > span {
      z-index: 3;
      position: relative;
      display: block;
      font-size: 13px;
      font-weight: 500;
      line-height: 24px;
      color: #FFFFFF;
      font-style: normal;
      text-align: center;
    }

    &::before {
      content: "";
      z-index: 2;
      position: absolute;
      top: 0;
      left: 50%;
      width: 0;
    	height: 0;
      margin-left: -11px;
    	border-left: 11px solid transparent;
    	border-right: 11px solid transparent;
    	border-bottom: 18px solid @color-error;
    }
  }

</style>
