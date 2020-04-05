<template>
  <div id="layout">
    <!-- topNav -->
    <div id="layout_topNav" class="flex y_center x_sb">
      <Menu mode="horizontal" theme="dark">
        <MenuItem name="1" to="/">
          <Icon type="ios-home" size="24" />PROJECT's
        </MenuItem>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-stats" />MenuItem
          </template>
          <MenuGroup title="title">
            <MenuItem name="2-1">MenuItem</MenuItem>
            <MenuItem name="2-2">MenuItem</MenuItem>
            <MenuItem name="2-3">MenuItem</MenuItem>
          </MenuGroup>
          <MenuGroup title="title">
            <MenuItem name="2-4">MenuItem</MenuItem>
            <MenuItem name="2-5">MenuItem</MenuItem>
          </MenuGroup>
        </Submenu>
        <MenuItem name="3" to="/translations">Переводы</MenuItem>
      </Menu>

      <div class="flex y_center">
        <Tag color="geekblue">{{ $store.state.auth.user.username }}</Tag>

        <Button class="mx-3" type="warning" @click="logout()">logout</Button>
        <Button
          title="refresh"
          class="mr-3"
          type="warning"
          shape="circle"
          icon="md-refresh"
          @click="reRender()"
        ></Button>
      </div>
    </div>

    <!-- SIDEBAR -->
    <Menu id="layout_sidebar" active-name="1-1" :open-names="['1']">
      <Submenu name="1">
        <template slot="title">
          <!-- <Icon type="ios-analytics" /> -->
          <Icon type="ios-color-palette-outline" size="24" />Новый проект
        </template>

        <MenuItem
          v-for="(It, idx) in linksNewProject"
          :key="idx"
          :to="It.link"
          :name="`1-${idx + 1}`"
        >{{ It.name }}</MenuItem>
      </Submenu>

      <Submenu name="2">
        <template slot="title">
          <!-- <Icon type="ios-filing" /> -->
          <Icon type="ios-clipboard-outline" size="24" />Текущие проекты
        </template>
        <MenuItem name="2-1" to="/current_projects">CURRENT</MenuItem>
        <MenuItem
          v-for="(It, idx) in [
            'Лаборатории',
            'Эксперименты',
            'Анкеты',
            'Стимулы',
            'Визиоряды',
            'Респонденты',
            'Группы',
            'Данные',
            'Отчеты',
            'Зоны интереса',
            'Графики',
          ]"
          :key="idx"
          to="/#"
          :name="`2-${idx + 2}`"
        >{{ It }}</MenuItem>
      </Submenu>

      <Submenu name="3">
        <template slot="title">
          <!-- <Icon type="ios-cog" /> -->
          <Icon type="ios-archive-outline" size="24" />Прошедшие проекты
        </template>
        <MenuItem name="3-1" to="/past_projects">Список</MenuItem>
      </Submenu>
    </Menu>

    <div id="layout_main">
      <!-- Breadcrumb -->
      <!-- 
      <Breadcrumb :style="{margin: '10px 0'}">
        <BreadcrumbItem>
          <N-link to="/">
            <Icon type="ios-home" size="24" />PROJECT's
          </N-link>
        </BreadcrumbItem>
      </Breadcrumb> 
      -->

      <nuxt />
    </div>

    <footer id="layout_footer" class="flex y_center x_sb">
      © footer V({{ new Date(APP_VERSION).toLocaleString() }})
      <div>
        <Button @click="changeLanguage('en')">EN</Button>
        <Button @click="changeLanguage('ru')">RU</Button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  { name: 'Анкеты', link: '/current_projects/form' },
  { name: 'Стимулы', link: '/current_projects/stimul' },
  { name: 'Визиоряды', link: '/current_projects/sausage' },
  { name: 'Респонденты', link: '/current_projects/respondent' },
  { name: 'Группы', link: '/current_projects/group' },
  { name: 'Данные', link: '/current_projects/data' },
  { name: 'Отчеты', link: '/current_projects/report' },
  { name: 'Зоны интереса', link: '/current_projects/zoneinterest' },
  { name: 'Графики', link: '/current_projects/charts' },
]
export default {
  // middleware: 'auth' login,
  middleware: ['auth', 'summary-update'],

  data() {
    return {
      APP_VERSION: process.env.APP_VERSION,
      polling: null,
      timer: 1000 * 600,

      linksNewProject,
      linksCurrentProjects,
    }
  },

  computed: mapState(['status']),
  watch: {
    // APP_VERSION(oldVal, newVal) {
    //   // console.log(`Updating from ${oldVal} to ${newVal}`);
    // },
  },
  created() {
    console.log('user', this.$auth.hasScope('superuser'))

    this.pollData()

    if (!localStorage.APP_VERSION)
      localStorage.APP_VERSION = process.env.APP_VERSION
    if (
      localStorage.APP_VERSION &&
      localStorage.APP_VERSION !== process.env.APP_VERSION
    ) {
      // console.info('reRender')
      // this.reRender()
      localStorage.APP_VERSION = process.env.APP_VERSION
    }
  },
  // updated() {},
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang
    },
    logout() {
      // this.$store.commit('user/LOGOUT')
      // this.$router.push('/login')

      this.$auth.logout()
      this.$router.push('/login')
    },
    reRender() {
      // this.$forceUpdate()
      location.reload()
    },

    pollData() {
      this.polling = setInterval(() => {
        this.renderNotice()
      }, this.timer)
    },
    renderNotice() {
      this.$Notice.open({
        title: 'Актуальность данных устарела',
        desc: '',
        render: (h) => {
          return h(
            'Button',
            {
              props: {
                type: 'primary',
              },
              on: {
                click: this.onClick,
              },
            },
            'Обновить приложение'
          )
        },
        // duration: 0
      })
    },
    onClick() {
      this.reRender()
      this.logout()
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

pre {
  height: 10em;
  overflow-y: auto;
  resize: vertical;
  background: rgba(45, 140, 240, 0.2);
  padding: 1em;
}
</style>
