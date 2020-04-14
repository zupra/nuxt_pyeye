<template lang="pug">
#layout

  //- topNav
  #layout_topNav.flex.y_center.x_sb
    Menu(mode='horizontal', theme='dark')
      MenuItem(name='1', to='/')
        Icon(type='ios-home', size='24')
        | PROJECT's
      Submenu(name='2')
        template(slot='title')
          Icon(type='ios-stats')
          | MenuItem
        MenuGroup(
          title='title'
        )
          MenuItem(name='2-1') MenuItem
          MenuItem(name='2-2') MenuItem
          MenuItem(name='2-3') MenuItem
        MenuGroup(
          title='title'
        )
          MenuItem(name='2-4') MenuItem
          MenuItem(name='2-5') MenuItem

      MenuItem(name='3', to='/translations') Переводы
    .flex.y_center
      Poptip(
        placement="bottom-end" width="280"
      )
        Button(size="small") {{ $store.state.auth.user.username }}
        div(
          slot="content"
        )
          pre.pre {{$store.state.auth.user}}


      //- a(href="/admin/", title="title") Админка


      Button.mx-3(
        type='warning'
        size="small"
        @click='localStorage_clear()'
      ) сбросить фильтры
      Button.mx-3(
        type='warning'
        size="small"
        @click='logout()'
      ) logout
      Button.mr-3(
        title='refresh'
        type='warning'
        shape='circle'
        icon='md-refresh'
        @click='reRender()'
      )
  
  //- SIDEBAR
  Menu#layout_sidebar(active-name='1-1', :open-names="['1']")
    Submenu(name='1')
      template(slot='title')
        Icon(type='ios-color-palette-outline', size='24')
        | Новый проект
      MenuItem(
        v-for='(It, idx) in linksNewProject'
        :key='idx'
        :to='It.link'
        :name='`1-${idx + 1}`') {{ It.name }}
    Submenu(name='2')
      template(slot='title')
        Icon(type='ios-clipboard-outline', size='24')
        | Текущие проекты
      MenuItem(name='2-1', to='/current_projects') CURRENT
      MenuItem(
        v-for="(It, idx) in linksCurrentProjects"
        :key='idx'
        :to='`${It.link}`'
        :name='`2-${idx + 2}`'
      ) {{ It.name }}
    Submenu(name='3')
      template(slot='title')
        Icon(type='ios-archive-outline', size='24')
        | Прошедшие проекты
      MenuItem(name='3-1', to='/past_projects') Список

  #layout_main
    <nuxt />

  footer#layout_footer.flex.y_center.x_sb
    | © footer V({{ new Date(APP_VERSION).toLocaleString() }})
    
    div
      Button.mr-3(
        :type="$i18n.locale === 'en' ? 'warning' : 'default'"
        @click="changeLanguage('en')"
      ) EN
      Button(
        :type="$i18n.locale === 'ru' ? 'warning' : 'default'"
        @click="changeLanguage('ru')"
      ) RU

</template>

<script>
// import { mapState } from 'vuex'

const linksNewProject = [
  {
    name: 'Основное',
    link: '/new_project',
  },
  {
    name: 'Стимулы',
    link: '/new_project/stimulus',
  },
  {
    name: 'Целевая аудитория',
    link: '/new_project/targetPeople',
  },
  {
    name: 'Лаборатория',
    link: '/new_project/laboratory',
  },
  {
    name: 'Респонденты',
    link: '/new_project/respondent',
  },
]

const linksCurrentProjects = [
  { name: 'Лаборатории', link: '/current_projects/laboratory' },
  { name: 'Эксперименты', link: '/current_projects/experiment' },
  { name: 'Стимулы', link: '/current_projects/stimul' },
  { name: 'Визиоряды', link: '/current_projects/sausage' },
  { name: 'Респонденты', link: '/current_projects/respondent' },
  { name: 'Анкеты', link: '/current_projects/form' },
  { name: 'Группы', link: '/current_projects/group' },
  // { name: 'Данные', link: '/current_projects/data' },
  { name: 'Отчеты', link: '/current_projects/report' },
  // { name: 'Зоны интереса', link: '/current_projects/zoneinterest' },
  // { name: 'Графики', link: '/current_projects/charts' },
]
export default {
  // middleware: 'auth' login,
  middleware: ['auth', 'summary-update'],

  data() {
    return {
      APP_VERSION: process.env.APP_VERSION,
      polling: null,
      timer: 1000 * 300,

      linksNewProject,
      linksCurrentProjects,
    }
  },

  created() {
    // this.renderNotice()
    // this.pollData()
  },
  beforeDestroy() {
    clearInterval(this.polling)
    // this.logout()
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    },
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
    reRender() {
      location.reload(true)
    },

    localStorage_clear() {
      localStorage.clear()
    },

    pollData() {
      this.polling = setInterval(() => {
        this.renderNotice()
      }, this.timer)
    },
    renderNotice() {
      this.$Notice.warning({
        title: 'Актуальность данных устарела',
        desc: '',
        render: (h) => {
          return (
            <div>
              <p class="mb-3">Сохраните важные изменения</p>
              <Button type="primary" onClick={this.reRender}>
                и Обновите приложение
              </Button>
            </div>
          )
        },
        duration: 0,
      })
    },
  },
}
</script>

<style>
#layout {
  display: grid;
  height: 100vh;
  overflow-x: hidden;

  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'sidebar header'
    'sidebar main'
    'sidebar footer';
}

#layout_main,
#layout_sidebar {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

#layout_topNav {
  grid-area: header;
  overflow: visible;
  background: #515a6e;
}

#layout_sidebar {
  grid-area: sidebar;
}

#layout_main {
  grid-area: main;
  padding: 1em 2em;
  position: relative;
}

#layout_footer {
  grid-area: footer;
  background: #f8f8f8;
  padding: 1em;
  border-top: 1px solid #e3e5e8;
}

pre.pre {
  height: 10em;
  overflow-y: auto;
  resize: vertical;
  background: rgba(45, 140, 240, 0.2);
  padding: 1em;
}
</style>
