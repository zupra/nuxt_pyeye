<template>
  <div id="layout">
    <!-- topNav -->
    <div id="layout_topNav" class="flex y_center x_sb">
      <Menu mode="horizontal" theme="dark">
        <MenuItem name="4" to="/">
          <Icon type="ios-home" size="24" />PROJECT's
        </MenuItem>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />MenuItem
          </template>
          <MenuGroup title="title">
            <MenuItem name="3-1">MenuItem</MenuItem>
            <MenuItem name="3-2">MenuItem</MenuItem>
            <MenuItem name="3-3">MenuItem</MenuItem>
          </MenuGroup>
          <MenuGroup title="title">
            <MenuItem name="3-4">MenuItem</MenuItem>
            <MenuItem name="3-5">MenuItem</MenuItem>
          </MenuGroup>
        </Submenu>
      </Menu>

      <div class="flex y_center">
        <Slider v-model="timer" style="width:3em" :min="1000" :max="600 * 1000"></Slider>
        <Button class="mx-3" type="warning" @click="logout">logout</Button>
        <Button class="mr-3" type="warning" @click="reRender()">reRender</Button>
      </div>
    </div>

    <!-- SIDEBAR -->
    <Menu id="layout_sidebar" active-name="1-1" :open-names="['1']">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-analytics" />Новый проект
        </template>

        <MenuItem v-for="(It,idx) in linksNewPr" :to="It.link" :name="`1-${idx+1}`">{{It.name}}</MenuItem>
      </Submenu>

      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-filing" />Текущие проекты
        </template>
        <MenuItem name="2-1" to="/current_projects">Список</MenuItem>
      </Submenu>

      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-cog" />Прошедшие проекты
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

    <footer id="layout_footer">© footer</footer>
  </div>
</template>


<script>
export default {
  // middleware: ['login'],
  // middleware: 'auth',
  middleware: ['auth', 'summary-update'],

  data() {
    return {
      polling: null,
      timer: 4000,

      linksNewPr: [
        {
          name: 'Основное',
          link: '/new_project'
        },
        {
          name: 'Стимулы',
          link: '/new_project/stimulus'
        },
        {
          name: 'Целевая аудитория',
          link: '/new_project/targetPeople'
        },
        {
          name: 'Лаборатория',
          link: '/new_project/laboratory'
        },
        {
          name: 'Респонденты',
          link: '/new_project/respondent'
        }
      ]
    }
  },

  methods: {
    logout() {
      // this.$store.commit('user/LOGOUT')
      // this.$router.push('/login')

      this.$auth.logout()
      this.$router.push('/login')
    },
    reRender() {
      // this.$forceUpdate()
      location.reload(true)
    },

    pollData() {
      this.polling = setInterval(() => {
        this.$Notice.open({
          title: 'Обновить приложуху',
          desc: '',
          render: (h) => {
            return h(
              'Button',
              {
                on: {
                  click: this.onClick
                }
              },
              'update'
            )
          }
          // duration: 0
        })
      }, this.timer)
    },
    onClick() {
      // alert('reRnder')
      this.reRender()
    }
  },
  created() {
    this.pollData()
  },
  beforeDestroy() {
    clearInterval(this.polling)
  }
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
}

#layout_footer {
  grid-area: footer;
  background: #f8f8f8;
  padding: 1em;
}

pre {
  height: 10em;
  overflow-y: auto;
  resize: vertical;
  background: rgba(45, 140, 240, 0.2);
  padding: 1em;
}
</style>
