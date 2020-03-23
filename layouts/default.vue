<template>
  <div id="layout">
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
    </Menu>

    <Menu id="layout_sidebar" active-name="1-2" :open-names="['2']">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-analytics" />Navigation One
        </template>
        <MenuGroup title="Item 1">
          <MenuItem name="1-1">Option 1</MenuItem>
          <MenuItem name="1-2">Option 2</MenuItem>
        </MenuGroup>
        <MenuGroup title="Item 2">
          <MenuItem name="1-3">Option 3</MenuItem>
          <MenuItem name="1-4">Option 4</MenuItem>
        </MenuGroup>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-filing" />Navigation Two
        </template>
        <MenuItem name="2-1">Option 5</MenuItem>
        <MenuItem name="2-2">Option 6</MenuItem>
        <Submenu name="3">
          <template slot="title">Submenu</template>
          <MenuItem name="3-1">Option 7</MenuItem>
          <MenuItem name="3-2">Option 8</MenuItem>
        </Submenu>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-cog" />Navigation Three
        </template>
        <MenuItem name="4-1">Option 9</MenuItem>
        <MenuItem name="4-2">Option 10</MenuItem>
        <MenuItem name="4-3">Option 11</MenuItem>
        <MenuItem name="4-4">Option 12</MenuItem>
      </Submenu>
    </Menu>

    <div id="layout_main">
      <Breadcrumb :style="{margin: '10px 0 20px'}">
        <BreadcrumbItem>
          <N-link to="/">
            <Icon type="ios-home" size="24" />Home PROJECT's
          </N-link>
        </BreadcrumbItem>
        <!-- <BreadcrumbItem>Components</BreadcrumbItem> -->
      </Breadcrumb>

      <nuxt />
    </div>

    <footer id="layout_footer">© footer</footer>
  </div>
</template>


<script>
export default {
  // middleware: ['auth'],
  middleware: ['login'],
  methods: {
    logout() {
      this.$store.commit('user/LOGOUT')
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
</style>
