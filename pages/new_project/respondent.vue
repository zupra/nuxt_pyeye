<template>
  <div>
    <Steps />
    <h1>Респонденты</h1>

    <pre>РЕСПОНДЕНТЫ:{{Respondent}}</pre>
    {{TD}}
    <!-- 
    <template v-for="It in Respondent.results">
      <dl v-for="(Val,Key) in It">
        <dt>{{Key}}</dt>
        <dd>{{Val}}</dd>
      </dl>
    </template>
    <table v-if="Respondent">
      <tr v-for="It in Respondent.results">
        <td v-for="td in Object.keys(It[0])">{{td}}</td>
      </tr>
      <tr></tr>
    </table>
    -->

    <Collapse simple class="my-5">
      <Panel>
        <b>Создать респондента</b>
        <div slot="content">
          <div class="flex mb-4">
            <div>
              <p>Эксперимент</p>
              <Select placeholder="Эксперимент">
                <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
              </Select>
            </div>
            <div class="ml-5">
              <p>Визиоряд</p>
              <Select placeholder="Визиоряд">
                <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
              </Select>
            </div>
            <div class="ml-5">
              <p>Ведущий глаз</p>
              <Select placeholder="Ведущий глаз">
                <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
              </Select>
            </div>
            <div class="ml-5">
              <p>Ведущая рука</p>
              <Select placeholder="Ведущая рука">
                <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
              </Select>
            </div>
          </div>

          <div class="flex mb-4">
            <div>
              <p>Пол</p>
              <Select placeholder="Пол">
                <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
              </Select>
            </div>

            <label class="flex_col ml-4">
              возраст
              <Input style="width:5em"></Input>
            </label>

            <label v-for="item in respondent" class="flex_col ml-4">
              {{item.label}}
              <Input v-model="item.value"></Input>
            </label>
          </div>

          <label class="flex_col mb-5">
            Комментарий
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Комментарий..."></Input>
          </label>

          <Button type="primary">Создать</Button>
        </div>
      </Panel>
    </Collapse>

    <div class="flex mb-5">
      <div>
        <p>Пол</p>
        <Select placeholder="Пол">
          <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
        </Select>
      </div>

      <div class="ml-4">
        <p>Ведущий глаз</p>
        <Select placeholder="Ведущий глаз">
          <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
        </Select>
      </div>

      <div class="ml-4">
        <p>Ведущая рука</p>
        <Select placeholder="Ведущая рука">
          <Option v-for="It in [1,2,3]" :value="It">{{It}}</Option>
        </Select>
      </div>

      <div class="flex_col ml-4">
        <p>Возраст</p>
        <span>
          от
          <Input style="width:5em"></Input>До
          <Input style="width:5em"></Input>
        </span>
      </div>
    </div>

    <div class="flex_wr">
      <Card class="m-2" v-for="User in Users">
        <div class="User">
          <picture>
            <img :src="User.picture.medium" alt />
          </picture>
          <div>
            <div class="User_name">{{User.name.first}} {{User.name.last}}</div>
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
    </table>-->

    <pre>{{$data}}</pre>
  </div>
</template>

<script>
import Steps from '~/components/new_project/steps'
export default {
  components: {
    Steps
  },
  async asyncData({ app }) {
    const [Randomuser, Respondent] = await Promise.all([
      app.$axios.$get('https://randomuser.me/api/?results=60'),
      app.$axios.$get('/core/api/respondent/?page=2')
    ])
    return {
      Users: Randomuser.results,
      Respondent
    }
  },
  data() {
    return {
      // Respondent: [],
      respondent: [
        {
          value: '',
          label: 'Имя'
        },
        {
          value: '',
          label: 'Фамилия'
        },
        {
          value: '',
          label: 'Отчество'
        }
      ]
    }
  },
  computed: {
    TD() {
      return Object.keys(this.Respondent.results[0])
    }
  }
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