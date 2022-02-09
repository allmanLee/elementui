<template>
  <div class="ui-container">
    <ul class="ui-list">
      <li class="ui-list-item">
        <h1>Checkbox</h1>
        {{ checked }}
        <app-checkbox v-model="checked" @change="changedCheck"
          >테스트 Checkbox</app-checkbox
        >
        <app-checkbox v-model="checked" :disabled="true" @change="changedCheck"
          >테스트 Checkbox</app-checkbox
        >
      </li>
      <h3>Type</h3>
      <ul class="checkbox-list">
        <li>
          <app-checkbox-group v-model="checkList">
            {{ checkList }}
            <app-checkbox label="Option A"></app-checkbox>
            <app-checkbox label="Option B"></app-checkbox>
            <app-checkbox label="Option C"></app-checkbox>
            <app-checkbox label="Option D"></app-checkbox>
          </app-checkbox-group>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
import AppCheckbox from "../components/AppCheckbox.vue";
import AppCheckboxGroup from "../components/AppCheckboxGroup.vue";
export default {
  name: "ui-page-checkbox",
  data() {
    return {
      checked: false,
      checkList: ["Option B", "Option D"],
    };
  },
  components: {
    AppCheckbox,
    AppCheckboxGroup,
  },
  methods: {
    changedCheck: (val) => {
      console.log(val);
    },
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
.app-checkbox {
  margin: 16px;
}
.ui-container {
  ul.ui-list {
    padding-left: 0px;
    li.ui-list-item {
      list-style: none;
      list-style-type: none;
    }
    .checkbox-list {
      li {
        display: inline-block;
        margin-left: 14px;
      }
    }
  }
}
</style>
