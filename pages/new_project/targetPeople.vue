<template>
  <div>
    <Steps />

    <h1>Настроить ЦА</h1>


    <Collapse>
        <Panel v-for="(item,idx) in LIST" :name="String(idx+1)">
            Настроить ЦА_{{idx+1}} <Button v-if="idx>=1" class="ml-5" type="error" ghost @click.stop="LIST.splice(idx,1)">Удалить</Button>
            <div slot="content">
              <Target />
            </div>
        </Panel>
    </Collapse>

    <Button class="mt-4" type="dashed" @click="LIST.push({})" icon="md-add">Добавить ЦА</Button>


    



    <br><br><br>



  </div>
</template>

<script>


import Steps from '~/components/new_project/steps'
import Target from '~/components/new_project/target.vue'

export default {
  components: {
    Steps,
    Target
  },
  data() {
    return {
      LIST: [{}]
    }
  }


}
</script>

<style>
</style>