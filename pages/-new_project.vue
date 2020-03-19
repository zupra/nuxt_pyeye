<template>
  <div>
    <div class="flex">
      <div>
        <h1>Начать новый проект</h1>
        <p>на этом шаге заполняется «паспортичка» проекта</p>
      </div>



      
      <div class="ml-5">
        <h3>Целевая аудитория:</h3>
        <Button @click="open_RecruitConstructor = true" type="primary">Open</Button>
        <Drawer 
          title="Характеристики рекрута (целевой аудитории)" 
          placement="left" 
          :closable="false" 
          v-model="open_RecruitConstructor"
          width="720">
          <RecruitConstructor/>
        </Drawer>
      </div>
      <div class="ml-5">
        <h3>Период проведения:</h3>
        <DatePicker type="daterange" :start-date="new Date(1991, 4, 14)" placement="bottom-end" placeholder="Выбрать период" style="width: 200px"></DatePicker>
      </div>


      <div class="ml-5">
        <h3>География исследования:</h3>
        <Select placeholder="Страна" class="mb-1">
          <Option value="">Страна_1</Option>
          <Option value="">Страна_2</Option>
        </Select>
        <Select placeholder="Город">
          <Option value="">Город_1</Option>
          <Option value="">Город_2</Option>
        </Select>
      </div>

    </div>

    <Divider />
    <br />

    <div class="flex">
      <Form label-position="top" style="width: 200px">
        <FormItem label="Тема">
          <Input></Input>
        </FormItem>
        <FormItem label="Цель">
          <Input></Input>
        </FormItem>
        <FormItem label="Задачи">
          <Input></Input>
        </FormItem>
      </Form>

      <div class="ml-5">
        <h3 class="center">Выбор типа стимула (выбрать какой и количество)</h3>
        <div class="flex">
          <a class="m-5 center">
            <h3>Видео</h3>
            <Icon type="ios-videocam" size="64"/>
          </a>
          <a class="m-5 center">
            <h3>Сайт</h3>
            <Icon type="ios-desktop" size="64"/>
          </a>
          <a class="m-5 center">
            <h3>Упаковка/бренд </h3>
            <Icon type="ios-thumbs-up-outline" size="64" />
          </a>
          <a class="m-5 center">
            <h3>Фильм </h3>
            <Icon type="ios-thumbs-up-outline" size="64" />
          </a>
          <a class="m-5 center">
            <h3>Приложение </h3>
            <Icon type="ios-thumbs-up-outline" size="64" />
          </a>
          <a class="m-5 center">
            <h3>Текст </h3>
            <Icon type="ios-thumbs-up-outline" size="64" />
          </a>
          <a class="m-5 center">
            <h3>Ритейл </h3>
            <Icon type="ios-thumbs-up-outline" size="64" />
          </a>
          <a class="m-5 center">
            <h3>Аудио</h3>
            <Icon type="ios-thumbs-up-outline" size="64" />
          </a>
        </div>


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
      // education: неполное среднее, среднее, среднее специальное, высшее, магистратура,бакалавриат, специалитет, кандидат наук, доктор наук, два и более высших образования
      // familyStatus: холост, замужем/женат, вдова/вдовец
      // family: один, с любимым человеком, с детьми, с семьей, с родителями
    }
  }
}
</script>
