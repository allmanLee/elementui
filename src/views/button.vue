<template>
  <div class="ui-container">
    <ul class="ui-list">
      <li class="ui-list-item">
        <h1>button</h1>
        <h3>Sizes</h3>
        <ul class="button-list">
          <li v-for="item of size" :key="item">
            <app-button :size="item">{{ item }}</app-button>
          </li>
        </ul>
        <h3>Type</h3>
        <ul class="button-list">
          <li v-for="item of type" :key="item">
            <app-button :type="item">{{ item }}</app-button>
          </li>
        </ul>
        <h3>Plain</h3>
        <ul class="button-list">
          <li v-for="item of type" :key="item">
            <app-button :type="item" :plain="true">{{ item }}</app-button>
          </li>
        </ul>
        <h3>Round</h3>
        <ul class="button-list">
          <li v-for="item of type" :key="item">
            <app-button :type="item" :round="true">{{ item }}</app-button>
          </li>
        </ul>
        <h3>Circle</h3>
        <ul class="button-list">
          <li v-for="item of type" :key="item">
            <app-button
              :type="item"
              :circle="true"
              :icon="'cloud-upload-alt'"
            ></app-button>
          </li>
        </ul>
        <h3>Disabled</h3>
        <ul class="button-list">
          <li v-for="item of type" :key="item">
            <app-button :type="item" :Disabled="true">UI</app-button>
          </li>
        </ul>
        <h3>Text</h3>
        <ul class="button-list">
          <li>
            <app-button type="text">Text</app-button>
          </li>
          <li>
            <app-button type="text" :Disabled="true">Text</app-button>
          </li>
        </ul>
        <h3>Loading</h3>
        <ul class="button-list">
          <li>
            <app-button type="primary" :loading="true">Loading...</app-button>
          </li>
        </ul>
        <h3>AutoFucus</h3>
        <ul class="button-list">
          <li>
            <app-button type="primary" :autoFocue="true">Loading...</app-button>
          </li>
        </ul>
        <h3>ICON</h3>
        <ul class="button-list">
          <li>
            <app-button type="primary" icon="address-card"
              >AddressCard</app-button
            >
          </li>
          <li>
            <app-button type="primary" icon="add"></app-button>
          </li>
          <li>
            <app-button type="danger" icon="trash"></app-button>
          </li>
        </ul>
        <h3>Native type</h3>
        <ul class="button-list">
          <li>
            <app-button type="primary">button</app-button>
          </li>
          <li>
            <app-button type="primary" :nativeType="'submit'"
              >submit</app-button
            >
          </li>
          <li>
            <app-button type="primary" :nativeType="'reset'">reset</app-button>
          </li>
        </ul>
        <h3>Button group</h3>
        <ul class="button-list">
          <li>
            <app-button-group>
              <app-button :icon="'angle-left'">버튼1</app-button>
              <app-button>버튼2</app-button>
              <app-button
                >버튼3 <fa-icon :icon="'angle-right'"></fa-icon
              ></app-button>
            </app-button-group>
          </li>
          <li>
            <app-button-group>
              <app-button type="primary" icon="add">친구추가</app-button>
              <app-button type="primary" icon="address-card"
                >프로필 카드</app-button
              >
              <app-button type="danger">삭제</app-button>
            </app-button-group>
          </li>
        </ul>
      </li>
      <li class="ui-list-item">
        <h1>checkbox</h1>
        <app-checkbox></app-checkbox>
      </li>
      <li class="ui-list-item">
        <h1>input</h1>
        <app-input></app-input>
      </li>
      <li class="ui-list-item">
        <h1>select</h1>
      </li>
    </ul>
  </div>
</template>
<script>
import AppButton from "../components/AppButton.vue";
import AppButtonGroup from "../components/AppButtonGroup.vue";
import AppCheckbox from "../components/AppCheckbox.vue";
import AppInput from "../components/AppInput.vue";
export default {
  name: "ui-page-checkbox",
  data() {
    return {
      size: ["large", "default", "small"],
      type: ["primary", "success", "warning", "danger", "info", "default"],
    };
  },
  components: {
    AppButton,
    AppCheckbox,
    AppInput,
    AppButtonGroup,
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
