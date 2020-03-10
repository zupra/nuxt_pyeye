<template>

<div>


  <Steps />    

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


</div>
</template>
<script>
import RecruitConstructor from '~/components/RecruitConstructor.vue'
import Steps from '~/components/new_project/steps'

export default {
  components: {
    Steps,
    RecruitConstructor
    
  },
  data() {
    return {
      open_RecruitConstructor: false,
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
