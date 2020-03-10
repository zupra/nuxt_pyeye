<template>
  <div>
    <Steps />
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
}
</script>

<style>
</style>