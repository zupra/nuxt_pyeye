<template lang="pug">
Card
  form(
    style="width:164px;"
  )
    //- логин
    label username
      Input(
        v-model='User.username',
        size='large',
        placeholder='username',
        name='username',
        autocomplete='on')
    //- парoль
    label(
      class="flex_col mt-3 mb-4"
    ) password
      Input(
        type='password', 
        v-model='User.password', 
        size='large', 
        placeholder='password', 
        name='password', 
        autocomplete='on'
        @on-enter="logIn()"
      )
    
    Button(
      long, 
      type='primary', 
      :disabled="Object.values(User).includes('')", 
      @click='logIn()'
    ) Войти

</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      User: {
        username: '',
        password: '',
      },
    }
  },

  methods: {
    /**/
    async logIn() {
      // this.$store.dispatch('user/login', this.User)
      // this.$router.push('/')
      // this.$store.commit('user/LOGIN', token)
      /*
      try {
        const data = await this.$axios.$post('/core/api/login/', this.User)

        this.$store.commit('user/USER_DATA', data)
        this.$router.push('/')
      } catch ({ response }) {
        this.$Modal.error({
          title: 'Ошибка',
          content: response.data.message,
        })
      }
      */

      /**/
      try {
        await this.$auth
          .loginWith('local', {
            data: { ...this.User },
          })
          .then(({ data }) => {
            // let {superuser, staff, user_id, username, language_id} = data
            const { token, ...rest } = data
            this.$store.commit('auth/SET', {
              key: 'user',
              value: rest,
            })
            // this.$store.commit('user/USER_DATA', data)
          })
        this.$router.push('/')
      } catch ({ response }) {
        this.$Modal.error({
          title: response.data.status,
          content: response.data.message,
        })
      }
    },
  },
}
</script>
