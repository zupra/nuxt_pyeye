<template>
<section>

  <!-- РАБОТА -->
  <div class="flex mt-4">
    <div>
      <div class="bold">Не работающие в сфере</div>
      <div class="flex mb-1" v-for="(It,idx) in ignore_scope" style="width:300px">
        <Input class="mr-1" :value="It.value"></Input>
        <Button v-if="!It.new" type="warning" @click="ignore_scope.splice(idx,1)">Del</Button>
        <Button v-if="It.new">Set</Button>
      </div>
      <Button type="dashed" @click="ignore_scope.push({new: true, value: ''})" icon="md-add">Добавить</Button>
    </div>
    <div class="ml-5">
      <div class="bold">Работающие в сфере</div>
      <div class="flex mb-1" v-for="(It,idx) in addScope_1" style="width:300px">
        <Input class="mr-1" :value="It"></Input>
        <Button>Set</Button>
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
    </div>
    <p>в исследованиях, посвященных</p>
    <div class="flex mb-1" v-for="(It,idx) in addScope_2" style="width:300px">
        <Input class="mr-1" :value="It"></Input>
        <Button>Set</Button>
      </div>
      <Button type="dashed" @click="addScope_2.push('')" icon="md-add">Добавить</Button>      
  </div>


  <div class="flex mt-5">
    <div>
      <div class="bold">Согласен с утверждением</div>
      <div class="flex mb-1" v-for="(It,idx) in addScope_3" style="width:300px">
        <Input class="mr-1" :value="It"></Input>
        <Button>Set</Button>
      </div>
      <Button type="dashed" @click="addScope_3.push('')" icon="md-add">Добавить</Button>
    </div>

    <div class="ml-5">
      <div class="bold">Потребительские привычки</div>
      <div class="flex mb-1" v-for="(It,idx) in addScope_4" style="width:300px">
        <Input class="mr-1" :value="It"></Input>
        <Button>Set</Button>
      </div>
      <Button type="dashed" @click="addScope_4.push('')" icon="md-add">Добавить</Button>
    </div>
  </div>



</section>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      // ignore_scope: [
      //   'Реклама',
      //   'Связи с общественностью',
      //   'Маркетинг',
      //   'Маркетинговые исследования',
      //   'Социология',
      //   'Психология',
      //   'Средства массовой информации',
      //   'Журналистика',
      //   'ТВ и радиовещание'
      // ],
      ignore_scope: [{"new":false,"value":"Реклама"},{"new":false,"value":"Связи с общественностью"},{"new":false,"value":"Маркетинг"},{"new":false,"value":"Маркетинговые исследования"},{"new":false,"value":"Социология"},{"new":false,"value":"Психология"},{"new":false,"value":"Средства массовой информации"},{"new":false,"value":"Журналистика"},{"new":false,"value":"ТВ и радиовещание"}],
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