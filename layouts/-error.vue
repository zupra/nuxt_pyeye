<template>
  <div class="errorPage">
    <div class="errorPage_info">
      <div v-if="error.statusCode === 401 || error.statusCode === 403">
        <h1>Ваша сессия истекла</h1>
        <p class="mb-3">Необходимо перелогиниться</p>
        <Button type="primary" @click="logout()">Обновить сессию</Button>
      </div>

      <div v-else>
        <h1>{{error.statusCode}}</h1>
        <h2>{{error.message}}</h2>
        <!-- <nuxt-link to="/">На главную</nuxt-link> -->
        <Button type="primary" @click="reRender()">Обновить</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  created() {
    console.table(this.error)
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
    reRender() {
      location.reload(true)
    },
  }
}
</script>

<style>
.errorPage {
  display: flex;
  height: 100%;
}

.errorPage_info {
  text-align: center;
  margin: auto;
}
</style>

