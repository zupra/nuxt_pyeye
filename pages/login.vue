<template>
<div id="loginArea">
  <Card id="loginArea_Card">
    <form @submit.prevent="submit">
      <Input v-model="User.username" size="large" placeholder="username" />
      <br />
      <br />
      <Input type="password" v-model="User.password" size="large" placeholder="password" />
      <br />
      <br />
      <Button long type="primary" @click="login">login</Button>
    </form>
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
      }
    }
  },

  methods: {
    async login() {


      const data = await this.$axios.$post("/login/", { ...this.User });

      console.table(data)


      // try {
      //   await this.$auth.loginWith('local', {
      //     data: { ...this.User }
      //   })
      // } catch (err) {
      //   console.error(err.response)
      // }


    }
  }
}
</script>

<style>
#loginArea {
  height: 100vh;
  display: flex
}

#loginArea_Card {
  margin: auto;
}



</style>