# Demo
> The button is optimized to be located at the bottom right corner of the page

>This is an interactive demo. It is possible to change the code in the black box and the button will update.

<vuep template="#anon"></vuep>

<script v-pre type="text/x-template" id="anon">
  <template>
      <vue-django-feedback :name="name" :email="email">
          <span vue-slot="header-text">
            Feel free to complain
          </span>
      </vue-django-feedback>
  </template>

  <script>
    module.exports = {
      data: function () {
        return {
          name: 'Vue',
          email: 'vue@pulilab.com'
        }
      }
    }
  </script>
</script>
