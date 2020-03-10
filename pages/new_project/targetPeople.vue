<template>
  <div>
    <Steps />

    <h1>Настроить ЦА</h1>

    <div class="flex mt-3">
      <div>
        <b>География исследования</b>
        <Select placeholder="Страна" class="mb-1">
          <Option value>Страна_1</Option>
          <Option value>Страна_2</Option>
        </Select>
        <Select placeholder="Город">
          <Option value>Город_1</Option>
          <Option value>Город_2</Option>
        </Select>
      </div>

      <div class="ml-5">
        <b>Пол</b>
        <Select placeholder="Пол">
          <Option v-for="It in ['Мужской','Женский','Любой']">{{It}}</Option>
        </Select>
      </div>

      <div class="ml-5">
        <b>Возраст</b>
        <div class="flex">
          <Input v-model="age[0]" style="width:3em"></Input>
          <Slider v-model="age" range class="mx-2" style="width:10em"></Slider>
          <Input v-model="age[1]" style="width:3em"></Input>
        </div>
      </div>
    </div>

    <!-- ОБРАЗОВАНИЕ -->
    <div class="mt-4">
      <b>Образование</b>
      <span>(множественный выбор)</span>
      <Select placeholder="Образование" filterable multiple>
        <Option v-for="item in education" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>

    <h4 class="mt-3">ВОПРОС? множественный выбор на сheckbox'ax не лучше ?</h4>
    <CheckboxGroup v-model="education">
      <Checkbox 
        v-for="item in education" 
        :label="`${item.value}`">
      </Checkbox>
    </CheckboxGroup>



    <!-- СЕМЕЙНОЕ ПОЛОЖЕНИЕ -->
    <div class="mt-5">
      <b>Семейное положение</b>
      <span>(множественный выбор)</span>
      <Select placeholder="Семейное положение" filterable multiple>
        <Option v-for="item in familyStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>


    <div class="mt-4">
      <b>Проживание</b>
      <span>(множественный выбор)</span>
      <Select placeholder="Проживание" filterable multiple>
        <Option
          v-for="item in roommate" :value="item.value" :key="item.value"
        >{{ item.label }}</Option>
      </Select>
    </div>

    <div class="mt-4">
      <p class="bold">Количество детей</p>
      <Input style="width:3em"></Input>
    </div>


    <!-- ДОХОД -->
    <br />
    <Divider class="mt-5" orientation="left">Уровень дохода</Divider>
    <h3>На члена семьи</h3>
    <div class="flex y_center">
      <div class="flex mr_3">
        <Input v-model="money_family[0]" style="width:10em"></Input>
        <Slider
          v-model="money_family"
          range
          max="1000000"
          step="100"
          class="mx-2"
          style="width:10em"
        ></Slider>
        <Input v-model="money_family[1]" style="width:10em"></Input>
      </div>
      <!-- <span>Валюта</span>
      <Select placeholder="Валюта" style="width:3em">
        <Option v-for="It in ['₽','$','€']">{{It}}</Option>
      </Select> -->
    </div>
    <div class="flex">
      <div>
        <b>По самооценке</b>
        <Select placeholder="По шкале 1-5">
          <Option v-for="It in [1,2,3,4,5]">{{It}}</Option>
        </Select>
      </div>
    </div>


    <!-- ЛИЧНЫЙ ДОХОД -->
    <h3 class="mt-4">Личный доход</h3>
    <div class="flex">
      <Input v-model="money_self[0]" style="width:10em"></Input>
      <Slider
        v-model="money_self"
        range
        max="1000000"
        step="100"
        class="mx-2"
        style="width:10em"
      ></Slider>
      <Input v-model="money_self[1]" style="width:10em"></Input>
    </div>
    <div class="flex">
      <div>
        <b>По самооценке</b>
        <Select placeholder="По шкале 1-5">
          <Option v-for="It in [1,2,3,4,5]">{{It}}</Option>
        </Select>
      </div>
    </div>

    <Divider />

    <!-- РАБОТА -->
    <div class="flex mt-4">
      <div>
        <div class="bold">Не работающие в сфере</div>
        <div class="flex mb-1" v-for="(It,idx) in ignore_scope" style="width:300px">
          <Input :value="It"></Input>
          <Button type="warning" @click="ignore_scope.splice(idx,1)">Del</Button>
        </div>
        <Button type="dashed" @click="ignore_scope.push('')" icon="md-add">Добавить</Button>
      </div>
      <div class="ml-5">
        <div class="bold">Работающие в сфере</div>
        <div class="flex mb-1" v-for="(It,idx) in addScope_1" style="width:300px">
          <Input :value="It"></Input>
          <Button type="warning">Set</Button>
        </div>
        <Button type="dashed" @click="addScope_1.push('')" icon="md-add">Добавить</Button>
      </div>
      <div class="ml-5">
        <b>Профессия</b>
        <Input></Input>
      </div>
    </div>




    <div class="my-5">
 
      <div class="flex y_center">
        <b>Не участвовавший <Input style="width:3em"></Input> месяцев</b>
        <!--  -->
      </div>
      <p>в исследованиях, посвященных</p>
      <div class="flex mb-1" v-for="(It,idx) in addScope_2" style="width:300px">
          <Input :value="It"></Input>
          <Button type="warning">Set</Button>
        </div>
        <Button type="dashed" @click="addScope_2.push('')" icon="md-add">Добавить</Button>
      
    </div>




    <div class="flex mt-5">
      <div>
        <div class="bold">Согласен с утверждением</div>
        <div class="flex mb-1" v-for="(It,idx) in addScope_3" style="width:300px">
          <Input :value="It"></Input>
          <Button type="warning">Set</Button>
        </div>
        <Button type="dashed" @click="addScope_3.push('')" icon="md-add">Добавить</Button>
      </div>

      <div class="ml-5">
        <div class="bold">Потребительские привычки</div>
        <div class="flex mb-1" v-for="(It,idx) in addScope_4" style="width:300px">
          <Input :value="It"></Input>
          <Button type="warning">Set</Button>
        </div>
        <Button type="dashed" @click="addScope_4.push('')" icon="md-add">Добавить</Button>
      </div>
    </div>


    <br><br><br>



  </div>
</template>

<script>


import Steps from '~/components/new_project/steps'
export default {
  components: {
    Steps
  },
  data() {
    return {
      age: [20, 50],
      money_family: [20000, 40000],
      money_self: [20000, 7000],

      education: [{"label":"неполное среднее","value":"неполное среднее"},{"label":"среднее","value":"среднее"},{"label":"среднее специальное","value":"среднее специальное"},{"label":"высшее","value":"высшее"},{"label":"магистратура","value":"магистратура"},{"label":"бакалавриат","value":"бакалавриат"},{"label":"специалитет","value":"специалитет"},{"label":"кандидат наук","value":"кандидат наук"},{"label":"доктор наук","value":"доктор наук"},{"label":"два и более высших образования","value":"два и более высших образования"}],      
      familyStatus: [{"label":"холост","value":"холост"},{"label":"замужем/женат","value":"замужем/женат"},{"label":"вдова/вдовец","value":"вдова/вдовец"}],
      roommate: [{"label":"один","value":"один"},{"label":"с любимым человеком","value":"с любимым человеком"},{"label":"с детьми","value":"с детьми"},{"label":"с семьей","value":"с семьей"},{"label":"с родителями","value":"с родителями"}],
      ignore_scope: [
        'Реклама',
        'Связи с общественностью',
        'Маркетинг',
        'Маркетинговые исследования',
        'Социология',
        'Психология',
        'Средства массовой информации',
        'Журналистика',
        'ТВ и радиовещание'
      ],
      addScope_1: [],
      addScope_2: [],
      addScope_3: [],
      addScope_4: []
    }
  }


}
</script>

<style>
</style>