<template>
  <div class="ui-container">
    <ul class="ui-list">
      <li class="ui-list-item">
        <h1>Checkbox</h1>
        {{ checked }}
        <app-checkbox v-model="checked">테스트 Checkbox</app-checkbox>
        <app-checkbox v-model="checked" :disabled="true"
          >테스트 Checkbox</app-checkbox
        >
      </li>

      <h3 @click="changedCheck">Group</h3>
      {{
        checkList
      }}
      <ul class="checkbox-list">
        <li>
          <app-checkbox-group v-model="checkList">
            <app-checkbox label="Option A"></app-checkbox>
            <app-checkbox label="Option B"></app-checkbox>
            <app-checkbox label="Option C"></app-checkbox>
            <app-checkbox label="Option D"></app-checkbox>
          </app-checkbox-group>
        </li>
      </ul>

      <h3>true-label / false-label</h3>
      {{
        checked2
      }}
      <ul class="checkbox-list">
        <li>
          <app-checkbox
            v-model="checked2"
            true-label="is True"
            false-label="is False"
          ></app-checkbox>
        </li>
      </ul>

      <h3>size / border</h3>
      {{
        checked3
      }}
      <ul class="checkbox-list">
        <li>
          <app-checkbox v-model="checked3" :border="true"
            >BorderBox</app-checkbox
          >
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
      checked: true,
      checked2: true,
      checked3: true,
      checkList: ["Option B", "Option D"],
    };
  },
  components: {
    AppCheckbox,
    AppCheckboxGroup,
  },
  methods: {
    changedCheck: function () {
      this.checkList.push("Option A");
      console.log("change");
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
