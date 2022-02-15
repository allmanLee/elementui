<template>
  <div id="app">
    <ul id="nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/button">Button</router-link>
      </li>
      <li><router-link to="/checkbox">Checkbox</router-link></li>
      <li><router-link to="/input">Input</router-link></li>
    </ul>

    <router-view />
    <footer></footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  li {
    display: inline-block;
    margin-right: 20px;
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #0086c4;
      }
    }
  }
}
footer {
  width: 100%;
  height: 80px;
  display: block;
  padding: 20px;
}
</style>
