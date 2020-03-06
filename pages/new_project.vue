<template>
  <div>
    <div>
      <h1>Начать новый проект</h1>
      <p>на этом шаге заполняется «паспортичка» проекта</p>

      <br />
      <br />
      <!-- <Steps current="0">
        <Step title="Создание проекта исследования"></Step>
        <Step title="Настройка ЦА"></Step>
      </Steps>-->
    </div>

    <Divider />

    <!-- BASE -->
    <div class="flex">
      <div>
        <h3>Название</h3>
        <Input></Input>
      </div>

      <div class="ml-5">
        <h3>Описание</h3>
        <Input type="textarea"></Input>
      </div>

      <div class="ml-5">
        <h3>Период проведения</h3>
        <DatePicker
          type="daterange"
          :start-date="new Date(2020, 1, 1)"
          placement="bottom-end"
          placeholder="Выбрать период"
          style="width: 200px"
        ></DatePicker>
      </div>
    </div>

    <div class="mt-5 center">
      <h2 class="mb-3">Выбор типа стимула (выбрать какой и количество)</h2>
      <div class="flex_wr x_center">
        <Button
          class="m-2"
          v-for="(It,idx) in stimulus"
          @click="stimul = idx"
          shape="circle"
          size="large"
        >
          <b>{{It}}</b>
        </Button>
      </div>
      <div v-if="String(stimul)" style="background:#EEE;" class="p-3 mb-3">
        ...НАСТРОЙКА стимула
        <h2>{{stimulus[stimul]}}</h2>
      </div>
    </div>

    <Button type="primary">MORE</Button>

    <br />
    <br />

    <hr />

    <Divider />

    <Button shape="circle" size="large">
      <h1>создать ЦА item_1</h1>
    </Button>

    <div class="flex mt-3">
      <div>
        <h3>География исследования</h3>
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
        <h3>Пол</h3>
        <Select placeholder="Пол">
          <Option v-for="It in ['Мужской','Женский','Третий']">{{It}}</Option>
        </Select>
      </div>

      <div class="ml-5">
        <h3>Возраст</h3>
        <div class="flex">
          <Input v-model="age[0]" style="width:3em"></Input>
          <Slider v-model="age" range class="mx-2" style="width:10em"></Slider>
          <Input v-model="age[1]" style="width:3em"></Input>
        </div>
      </div>

      <div class="ml-5">
        <h3>Образование</h3>
        <Select placeholder="Образование">
          <Option
            v-for="It in ['неполное среднее', 'среднее', 'среднее специальное', 'высшее', 'магистратура',
'бакалавриат', 'специалитет', 'кандидат наук', 'доктор наук', 'два и более высших образования']"
          >{{It}}</Option>
        </Select>
      </div>

      <div class="ml-5">
        <h3>Семейное положение</h3>
        <Select placeholder="Семейное положение">
          <Option v-for="It in ['холост', 'замужем/женат', 'вдова/вдовец']">{{It}}</Option>
        </Select>
      </div>

      <div class="ml-5">
        <h3>Проживание</h3>
        <Select placeholder="Проживание">
          <Option
            v-for="It in ['один', 'с любимым человеком', 'с детьми', 'с семьей', 'с родителями']"
          >{{It}}</Option>
        </Select>
      </div>

      <div class="ml-5">
        <h3>Количество детей</h3>
        <Input style="width:3em"></Input>
      </div>
    </div>

    <!-- <h2 class="mt-4">Уровень дохода семьи</h2> -->
    <br />
    <Divider class="mt-5" orientation="left">Уровень дохода</Divider>
    <div class="flex">
      <div class="mr-2">
        <h3>Валюта</h3>
        <Select placeholder="Валюта">
          <Option v-for="It in ['₽','$','€']">{{It}}</Option>
        </Select>
      </div>
      <div>
        <h3>На члена семьи</h3>
        <div class="flex">
          <Input v-model="money_family[0]" style="width:10em"></Input>
          <Slider
            v-model="money_family"
            range
            max="500000"
            step="100"
            class="mx-2"
            style="width:10em"
          ></Slider>
          <Input v-model="money_family[1]" style="width:10em"></Input>
        </div>
      </div>
      <div class="ml-5">
        <h3>По самооценке</h3>
        <Select placeholder="По самооценке">
          <Option v-for="It in [1,2,3,4,5]">{{It}}</Option>
        </Select>
      </div>
    </div>
    <!-- <h2 class="mt-4">Уровень личного дохода</h2> -->
    <div class="flex">
      <div class="mr-2">
        <h3>Валюта</h3>
        <Select placeholder="Валюта">
          <Option v-for="It in ['₽','$','€']">{{It}}</Option>
        </Select>
      </div>

      <div>
        <h3>личный доход</h3>
        <div class="flex">
          <Input v-model="money_self[0]" style="width:10em"></Input>
          <Slider
            v-model="money_self"
            range
            max="500000"
            step="100"
            class="mx-2"
            style="width:10em"
          ></Slider>
          <Input v-model="money_self[1]" style="width:10em"></Input>
        </div>
      </div>
      <div class="ml-5">
        <h3>По самооценке</h3>
        <Select placeholder="По самооценке">
          <Option v-for="It in [1,2,3,4,5]">{{It}}</Option>
        </Select>
      </div>
    </div>

    <!-- РАБОТА -->
    <Divider />
    <div class="flex mt-4">
      <div>
        <h3>Не работающие в сфере</h3>
        <div class="flex mb-1" v-for="(It,idx) in ignore_scope" style="width:300px">
          <Input :value="It"></Input>
          <Button type="warning" @click="ignore_scope.splice(idx,1)">Del</Button>
        </div>
        <Button type="dashed" @click="ignore_scope.push('')" icon="md-add">Добавить</Button>
      </div>

      <div class="ml-5">
        <h3>Работающие в сфере</h3>
        <div class="flex mb-1" v-for="(It,idx) in add_scope" style="width:300px">
          <Input :value="It"></Input>
          <Button type="warning">Set</Button>
        </div>
        <Button type="dashed" @click="add_scope.push('')" icon="md-add">Добавить</Button>
      </div>
    </div>

    <Divider />

    <Button @click="open_RecruitConstructor = true" type="primary">Open</Button>
    <Drawer
      title="Характеристики рекрута (целевой аудитории)"
      placement="left"
      :closable="false"
      v-model="open_RecruitConstructor"
      width="720"
    >
      <RecruitConstructor />
    </Drawer>

    <Divider />

    <!-- 
    <div class="mt-5">
      <h2 class="center">Выбор типа стимула (выбрать какой и количество)</h2>
      <div class="flex">
        <a class="m-5 center">
          <h3>Видео</h3>
          <Icon type="ios-videocam" size="64" />
        </a>
        <a class="m-5 center">
          <h3>Сайт</h3>
          <Icon type="ios-desktop" size="64" />
        </a>
        <a class="m-5 center">
          <h3>Упаковка/бренд</h3>
          <Icon type="ios-thumbs-up-outline" size="64" />
        </a>
        <a class="m-5 center">
          <h3>Фильм</h3>
          <Icon type="ios-thumbs-up-outline" size="64" />
        </a>
        <a class="m-5 center">
          <h3>Приложение</h3>
          <Icon type="ios-thumbs-up-outline" size="64" />
        </a>
        <a class="m-5 center">
          <h3>Текст</h3>
          <Icon type="ios-thumbs-up-outline" size="64" />
        </a>
        <a class="m-5 center">
          <h3>Ритейл</h3>
          <Icon type="ios-thumbs-up-outline" size="64" />
        </a>
        <a class="m-5 center">
          <h3>Аудио</h3>
          <Icon type="ios-thumbs-up-outline" size="64" />
        </a>
      </div>
    </div>

    <br />
    <h2>Какие материалы хотим тестировать</h2>
    <br />
    <Steps :current="1">
      <Step title="Лица" content="(фотографии)"></Step>
      <Step
        title="бордоматики"
        content="Серия последовательных / соединенных единой идеей/сюжетом изображений"
      ></Step>
      <Step title="Текст" content="(материалы для СМИ, договоры, инструкции, в т.ч. инфографика)"></Step>
      <Step title="Аудиоконтент" content="(рекламное, информационное объявление)"></Step>
    </Steps>
    -->
  </div>
</template>
<script>
import RecruitConstructor from '~/components/RecruitConstructor.vue'

export default {
  components: {
    RecruitConstructor
  },
  data() {
    return {
      open_RecruitConstructor: false,
      age: [20, 50],
      money_family: [20000, 150000],
      money_self: [20000, 150000],

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
      add_scope: [],
      stimulus: [
        'Рекламный ролик',
        'Аниматик',
        'Бордоматик',
        'Фильм',
        'ТВ программа',
        'Аудиофайл',
        'Упаковка',
        'Логотип',
        'Элемент фирменного стиля',
        'Постер',
        'Листовка (текст)',
        'Сайт',
        'Компьютерная игра',
        'Мобильное приложениe',
        'Вне лаборатории'
      ],
      stimul: null
    }
  }
  // computed: {
  //   NotWorkingInField() {
  //     get() {
  //       rreturn {...this.ignore_scope}
  //     },
  //     set(v) {
  //       return (this.ignore_scope = v)
  //     }
  //   }
  // }
}
</script>
