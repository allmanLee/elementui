<template>
  <div class="ui-container">
    <ul class="ui-list">
      <li class="ui-list-item">
        <h1>Input</h1>

        <ul class="input-list">
          <li>
            <h3>Basic usage</h3>
            <p>{{ text1 }}</p>
            <app-input v-model="text1" placeholder="Please input"></app-input>
          </li>
        </ul>

        <ul class="input-list">
          <li>
            <h3>Disabled</h3>
            <app-input :disabled="true" placeholder="Please input"></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Clearable</h3>
            <p>{{ text2 }}</p>
            <app-input
              v-model="text2"
              :clearable="true"
              placeholder="Please input"
            ></app-input>
          </li>
        </ul>
        <ul class="input-list">
          <li>
            <h3>Show password</h3>
            <p>{{ text3 }}</p>
            <app-input
              v-model="text3"
              :showPassword="true"
              placeholder="Please input"
            ></app-input>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import AppInput from "../components/AppInput.vue";

export default {
  components: { AppInput },
  name: "ui-page-checkbox",
  data() {
    return {
      text1: "aaa",
      text2: "text test",
      text3: "",
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
h1 {
  font-size: 32px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 8px;
}
h3 {
  font-size: 20px;
  font-weight: 400;
  margin-top: 60px;
  margin-bottom: 8px;
}

.ui-container {
  ul.ui-list {
    padding-left: 0px;
    li.ui-list-item {
      list-style: none;
      list-style-type: none;
    }
    .input-list {
      margin-top: 40px;
      li {
        display: inline-block;
      }
    }
  }
}
</style>
