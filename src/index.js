import Vue from 'vue';
import vueCustomElement from 'vue-custom-element';
import VeeValidate from 'vee-validate';
import DjangoFeedback from './components/DjangoFeedback';

Vue.use(vueCustomElement);
Vue.use(VeeValidate);

Vue.customElement('django-feedback', DjangoFeedback);
