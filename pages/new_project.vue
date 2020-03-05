<template>
  <div>
    <h1>Начать новый проект</h1>
    <p>на этом шаге заполняется «паспортичка» проекта</p>

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
export default {
  data() {
    return {
      links: []
    }
  }
}
</script>
