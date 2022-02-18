<template>
  <div
    ref="appCheckboxButton"
    class="app-checkbox checkbox-button"
    :class="`${cssNameDisabled} ${cssNameIsTrue} ${cssNameSize}`"
    @click="updatedCheckbox"
  >
    <input
      ref="appCheckboxInput"
      type="checkbox"
      id="checkbox"
      :name="name"
      :checked="checked || isChecked"
      @change="updatedCheckbox"
    />
    <label for="checkbox" class="no-drag">
      <span>{{ atLabel }}</span>
      <slot v-if="!atLabel"></slot>
    </label>
  </div>
</template>

<script>
import EventBus from "@/EventBus.js";

export default {
  name: "AppCheckboxButton",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: { type: String },
    modelValue: [String, Array, Boolean],
    border: { type: Boolean, default: false },
    size: {
      validator: (value) => ["medium", "mini", "small"].indexOf(value) !== -1,
    },
    trueValue: { default: true },
    disabled: { default: false },
    label: { default: "" },
    trueLabel: { type: String },
    falseLabel: { type: String },
    indeterminate: { type: Boolean },
    name: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    modelValue: {
      deep: true,
      handler() {
        this.classModifyButton();
      },
    },
  },
  data() {
    return {
      custom: [], //type: string or Arr,
      groupProp: {},
      customDisabled: false,
      cssNameIsTrue: "",
      cssNameSize: "",
    };
  },
  computed: {
    cssNameDisabled: function () {
      if (
        this.disabled === true ||
        this.customDisabled === true ||
        this.groupProp.disabled
      )
        return "checkbox-disabled";
      else return "";
    },
    cssNameBorder: function () {
      if (this.border === true) return "checkbox-button";
      else return "";
    },
    atLabel: function () {
      if (this.label) return this.label;
      if (this.trueLabel || this.falseLabel) {
        return this.modelValue ? this.trueLabel : this.falseLabel;
      } else return undefined;
    },
    isChecked() {
      //그룹에 속한 체크인풋이라면 배열을 돌면서 세팅
      if (this.$parent.$options.componentId) {
        return this.custom.includes(this.label);
      } else {
        return this.modelValue === this.trueValue;
      }
    },
  },
  created() {
    EventBus.$on(this.$parent.$options.componentId, (val) => {
      this.custom = val;
      this.$emit("change", val);
      this.groupProp = this.$parent.$props;
    });
    EventBus.$on(`${this.$parent.$options.componentId}-style`, () => {
      //최솟값 최대값이 나온경우
      this.minMaxActivea();
      this.classModifyButton();
    });
  },
  mounted() {
    //border style 초기화
    EventBus.$on(`${this.$parent.$options.componentId}-style`, () => {
      //최솟값 최대값이 나온경우
    });
  },
  methods: {
    classModifyButton() {
      if (this.groupProp.size) {
        this.cssNameSize = `checkbox-size-${this.groupProp.size}`;
      }

      const checkbox = this.$refs.appCheckboxButton;
      if (this.isChecked === true) {
        this.cssNameIsTrue = "checkbox-button-true";
      } else {
        this.cssNameIsTrue = "";
      }
    },
    minMaxOption() {
      if (this.groupProp.max || this.groupProp.min) {
        EventBus.$emit(`${this.$parent.$options.componentId}-style`);
      }
    },
    minMaxActivea() {
      //max 값이 있을 경우
      if (this.custom.length == this.$parent.max) {
        if (!this.custom.includes(this.label)) {
          this.customDisabled = true;
        }
      }
      if (this.custom.length < this.$parent.max) {
        if (!this.custom.includes(this.label)) {
          this.customDisabled = false;
        }
      }

      //min 값이 있을 경우
      if (this.custom.length == this.$parent.min) {
        if (this.custom.includes(this.label)) {
          this.customDisabled = true;
        }
      }
      if (this.custom.length > this.$parent.min) {
        if (this.custom.includes(this.label)) {
          this.customDisabled = false;
        }
      }
    },
    updatedCheckbox() {
      let isChecked = this.modelValue === "" ? this.modelValue : this.isChecked;
      if (this.$parent.modelValue) {
        if (!isChecked) {
          this.custom.push(this.label);
        } else {
          this.custom.splice(this.custom.indexOf(this.label), 1);
        }
        this.minMaxOption();
      } else {
        isChecked = !isChecked;
        this.$emit("change", isChecked);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-checkbox {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    pointer-events: none;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0px;
    width: 0px;
  }

  label {
    pointer-events: none;
    cursor: pointer;
    font-weight: 500;
    line-height: 21px;
    vertical-align: middle;
  }
  input:checked ~ label {
    color: white;
  }

  //checkbox Disabled
  &.checkbox-disabled {
    pointer-events: none;
    opacity: 0.4;
    filter: grayscale(100);
  }

  &.checkbox-button {
    padding: 16px;
    padding-left: 20px;
    padding-right: 20px;
    border: solid 1px $color-info-tint;
    border-radius: 4px;

    &.checkbox-size-medium {
      @include input-size-style(
        $font-size-medium,
        $p-top-bottom-medium,
        $p-left-right-medium
      );
    }
    &.checkbox-size-small {
      @include input-size-style($font-size-small, 10px, $p-left-right-small);
    }
    &.checkbox-size-mini {
      @include input-size-style($font-size-mini, 8px, 10px);
    }
  }
  &.checkbox-button-true {
    border: solid 1px $color-primary-tint;
    background-color: $color-primary-tint;
  }
}

.no-drag {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
