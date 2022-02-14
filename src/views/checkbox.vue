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

      <h3>Group</h3>
      {{
        checkList
      }}
      <ul class="checkbox-list">
        <li>
          <app-checkbox-group v-model="checkList" :max="2" :min="1">
            <app-checkbox
              v-for="op of options"
              :key="op"
              :label="op"
            ></app-checkbox>
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
      <h3>Indeterminate</h3>
      {{
        checkAll
      }}
      <ul class="checkbox-list">
        <li>
          <app-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >Check all</app-checkbox
          >
          <div style="margin: 15px 0"></div>
          <app-checkbox-group
            v-model="checkedCities"
            @input="handleCheckedCitiesChange"
          >
            <app-checkbox :label="'Shanghai'"></app-checkbox>
            <app-checkbox :label="'Beijing'"></app-checkbox>
            <app-checkbox :label="'Guangzhou'"></app-checkbox>
            <app-checkbox :label="'Shenzhen'"></app-checkbox>
            <!-- <app-checkboxv-for="city in cities" :label="city">{{
              city
            }}</app-checkboxv-for=> -->
          </app-checkbox-group>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
import AppCheckbox from "../components/AppCheckbox.vue";
import AppCheckboxGroup from "../components/AppCheckboxGroup.vue";

const cityOptions = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

export default {
  name: "ui-page-checkbox",
  data() {
    return {
      checked: true,
      checked2: true,
      checked3: true,
      checkAll: true,
      checkList: ["Option B", "Option A"],
      cities: [...cityOptions],
      options: ["Option A", "Option B", "Option C", "Option D"],
      checkedCities: ["Shanghai", "Beijing"],
      isIndeterminate: true,
    };
  },
  components: {
    AppCheckbox,
    AppCheckboxGroup,
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? [...cityOptions] : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
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
  margin-top: 60px;
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
