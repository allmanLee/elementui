<template>
  <div class="ui-container">
    <ul class="ui-list">
      <li class="ui-list-item">
        <h1>Checkbox</h1>
        <app-checkbox>테스트 체크박스</app-checkbox>
      </li>
    </ul>
  </div>
</template>
<script>
import AppCheckbox from "../components/AppCheckbox.vue";
export default {
  name: "ui-page-checkbox",
  data() {
    return {};
  },
  components: {
    AppCheckbox,
  },
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
  margin-top: 20px;
  margin-bottom: 8px;
}
.ui-container {
  ul.ui-list {
    padding-left: 0px;
    li.ui-list-item {
      list-style: none;
      list-style-type: none;
    }
    .button-list {
      li {
        display: inline-block;
        margin-left: 14px;
      }
    }
  }
}
</style>
