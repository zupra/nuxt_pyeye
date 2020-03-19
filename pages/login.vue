<template>
  <div id="loginArea">
    <Card id="loginArea_Card">
      <form>
        <p>логин</p>
        <Input
          v-model="User.username"
          size="large"
          placeholder="username"
          name="username"
          autocomplete="on"
        />
        <br />
        <br />
        <p>парoль</p>
        <Input
          type="password"
          v-model="User.password"
          size="large"
          placeholder="password"
          name="password"
          autocomplete="on"
        />
        <br />
        <br />

        <Button
          long
          type="primary"
          :disabled="Object.values(User).includes('')"
          @click="logIn"
        >Войти</Button>
      </form>
      <!-- <pre>
      {{$data}}
      </pre>-->
    </Card>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      User: {
        username: '',
        password: ''
      },
      R: {}
    }
  },

  methods: {
    /*
    async logIn() {
      const data = await this.$axios.$post(
        'http://193.34.211.46:30003/core/api/login/',
        // {
        //   params: {
        //     ...this.User
        //   }
        // }
        this.User
      )
      this.R = data
    }
    */

    /**/
    async logIn() {
      // this.$store.dispatch('user/login', this.User)
      // this.$router.push('/')

      try {
        const { token } = await this.$axios.$post('/login/', this.User)

        this.$store.commit('user/LOGIN', token)
        this.$router.push('/')
      } catch ({ response }) {
        this.$Modal.error({
          title: 'Ошибка',
          content: response.data.message
        })
      }

      /*
      try {
        await this.$auth.loginWith('local', {
          data: { ...this.User }
        })
      } catch (err) {
        console.error(err.response)
      }
      */
    }
  }
}
</script>

<style>
#loginArea {
  height: 100vh;
  display: flex;
}

#loginArea_Card {
  margin: auto;
}
</style>