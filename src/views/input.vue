<template>
  <div class="ui-container">
    <ul class="ui-list">
      <li class="ui-list-item">
        <h1>Input</h1>
        <h3>Basic usage</h3>
        <ul class="button-list">
          <li>
            <app-input placeholder="Please input"></app-input>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import AppInput from "../components/AppInput.vue";

const cityOptions = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

export default {
  components: { AppInput },
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
      buttonsOption: ["asdf", "zxcv", "fasd", "vewvsa"],
      checkedButtonsOption: ["asdf", "vewvsa"],
    };
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

.checkbox-button-group {
  margin-top: 14px;
}
</style>
