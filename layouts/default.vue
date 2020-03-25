<template>
  <div id="layout">
    <!-- topNav -->
    <Menu id="layout_topNav" mode="horizontal" active-name="1" theme="dark">
      <MenuItem name="1">
        <Icon type="ios-paper" />MenuItem
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people" />MenuItem
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
      <MenuItem name="4">
        <Icon type="ios-construct" />MenuItem
      </MenuItem>

      <Button type="warning" @click="logout">logout</Button>
      <!-- <Button type="warning" to="http://193.34.211.46:30003/admin">admin</Button> -->
    </Menu>

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
      <Breadcrumb :style="{margin: '10px 0 20px'}">
        <BreadcrumbItem>
          <N-link to="/">
            <Icon type="ios-home" size="24" />Home PROJECT's
          </N-link>
        </BreadcrumbItem>
      </Breadcrumb>

      <nuxt />
    </div>

    <footer id="layout_footer">© footer</footer>
  </div>
</template>


<script>
export default {
  middleware: 'auth',
  // middleware: ['auth'],
  // middleware: ['login'],

  data() {
    return {
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
    }
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
