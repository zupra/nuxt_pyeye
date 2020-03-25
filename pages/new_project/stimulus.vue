<template>
  <section>
    <Steps />

    <!-- 
    <div class="mt-5 center">
      <h2 class="mb-3">Выбор типа стимула (выбрать какой и количество)</h2>
      <div class="flex_wr x_center">
        <Button
          class="m-1"
          v-for="(It,idx) in stimulus"
          @click="stimul = idx"
          shape="circle"
        >{{It}}
        </Button>
      </div>
      <div v-if="String(stimul)" style="background:#EEE;" class="p-3 mb-3">
        ...НАСТРОЙКА стимула
        <h2>{{stimulus[stimul]}}</h2>
      </div>
    </div> 
    -->

    <center>
      <h2 class="mb-3">Выбор типа стимула</h2>

      <div style="width:40em">
        <Button
          class="m-1"
          v-for="(It,idx) in stimulus"
          shape="circle"
          @click="selectedList.push(It)"
        >{{It}}</Button>
      </div>
    </center>



    <Collapse class="mt-5" v-if="selectedList.length">
      <Panel v-for="(item,idx) in selectedList" :name="String(idx+1)">
        <b>{{item}}</b>
        <Button
          color="gold"
          class="ml-5"
          @click.stop="selectedList.splice(idx,1)"
        >Удалить</Button>
        <div slot="content">
          <h3>Настройки {{item}}</h3>
          <p>Какие-то настройки  ...</p>
        </div>
      </Panel>
    </Collapse>



    <br><br><br><br>
    <Divider class="mt-5">ИЛИ ТАКОЙ ВАРИАНТ</Divider>
    <Collapse>
      <Panel v-for="(item,idx) in LIST" :name="String(idx+1)">
        Исследуемый стимул_{{idx+1}}
        <Button
          v-if="idx>=1"
          class="ml-5"
          type="error"
          ghost
          @click.stop="LIST.splice(idx,1)"
        >Удалить</Button>
        <div slot="content">
          <h2>Настраиваем тип стимула</h2>

          <Select placeholder="типа стимула" style="width:16em">
            <Option v-for="It in stimulus" :value="It">{{It}}</Option>
          </Select>

          <br />
          <br />
          <h3>Настройки</h3>
          <p>Какие-то настройки выбранного стимула</p>
        </div>
      </Panel>
    </Collapse>

    <Button class="mt-4" type="dashed" @click="LIST.push({})" icon="md-add">Добавить стимул</Button>
  </section>
</template>

<script>
import Steps from '~/components/new_project/steps'
export default {
  components: {
    Steps
  },
  data() {
    return {
      selectedList: [],
      LIST: [{}],
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