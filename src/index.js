import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import VeeValidate from 'vee-validate';
import VueDjangoFeedback from './components/VueDjangoFeedback';

Vue.use(vueCustomElement);
Vue.use(VeeValidate);

Vue.customElement('vue-django-feedback', VueDjangoFeedback);
