<template>

  <div>

    <Button class="mr-3" v-for="It in links" :to="`${It.link}`">
      {{It.name}}
    </Button>

  </div>



</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'Прошедшие проекты',
          link: 'past_projects'
        },
        {
          name: 'Текущие проекты',
          link: 'current_projects'
        },
        {
          name: 'Начать новый проект',
          link: 'new_project'
        }

      ]
    }
  }
}
</script>
