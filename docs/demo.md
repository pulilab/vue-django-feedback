# Demo
> The button is optimized to be located a the bottom right corner of the page

<vuep template="#anon"></vuep>

<script v-pre type="text/x-template" id="anon">
  <template>
      <vue-django-feedback :name="name" :email="email"></vue-django-feedback>
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
