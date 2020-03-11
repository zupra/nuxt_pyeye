<template>
<div>
  <Steps />
  <h1>Респонденты</h1>
  <div class="flex_wr">
    <Card class="m-2" v-for="User in Users">
      <div class="User">
        <picture>
          <img :src="User.picture.medium" alt="">
        </picture>
        <div>
          <div class="User_name">
            {{User.name.first}} {{User.name.last}}
          </div>
          <small>{{User.phone}}</small>
        </div>
        <dl class="User_dl">
          <dt>location</dt>
          <dd>{{User.location.timezone.description}}</dd>
          <dt>registered</dt>
          <dd>{{User.registered.date.split('T')[0]}}</dd>
          <dt>login</dt>
          <dd>{{User.login.username}}</dd>
        </dl>
      </div>
      <div class="flex x_sb mt-4">
        <Button>Action_1</Button>
        <Button>Action_2</Button>
      </div>
    </Card>
  </div>


  <!-- <table>
    <tr v-for="user in Users">
      <td v-for="It in user"><pre>{{It}}</pre></td>
    </tr>
  </table> -->

  <pre>{{$data}}</pre>
</div>
  
</template>

<script>
import Steps from '~/components/new_project/steps'
export default {
  components: {
    Steps
  },
  async asyncData ({ app }) {
    const { results } = await app.$axios.$get('https://randomuser.me/api/?results=60')
    return { Users: results }
  },
  // data() {
  //   return {
  //     Users: null
  //   }
  // }
}
</script>

<style lang="styl">


.User
  /* height: 200px; */
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 80px 100px;
  line-height 1
  &_name
    height 2em
    text-transform capitalize
  &_dl
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 60px 120px;

    font-size .8rem
    dt
      color #999
      text-align right

</style>