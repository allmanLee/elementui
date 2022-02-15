<template>
  <div
    ref="appCheckboxButton"
    class="app-checkbox"
    :class="`${cssNameDisabled} checkbox-button ${cssNameSize} ${cssNameIndeterminate}`"
    @click="updatedCheckbox"
  >
    <input
      ref="appCheckboxInput"
      type="checkbox"
      id="checkbox"
      :checked="isChecked"
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
  },
  watch: {
    modelValue: {
      deep: true,
      handler() {
        this.classModifyBorder();
      },
    },
  },
  created() {
    EventBus.$on(this.$parent.$options.componentId, (val) => {
      this.custom = val;
      this.$emit("change", val);
      this.groupProp = this.$parent.$props;
      this.classModifyBorder();
    });
    EventBus.$on(`${this.$parent.$options.componentId}-style`, () => {
      //최솟값 최대값이 나온경우
      this.minMaxActivea();
    });
  },
  mounted() {
    //border style 초기화
    this.classModifyBorder();
  },
  data() {
    return {
      custom: [], //type: string or Arr,
      groupProp: {},
      customDisabled: false,
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
    cssNameIndeterminate: function () {
      if (this.indeterminate === true) {
        return `checkbox-indeterminate`;
      } else return "";
    },
    cssNameSize: function () {
      let propSize = this.size;
      return `checkbox-size-${propSize}`;
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
  methods: {
    classModifyBorder() {
      const checkbox = this.$refs.appCheckboxButton;
      if (checkbox.classList.contains("checkbox-button")) {
        if (this.isChecked === true) {
          checkbox.classList.add("checkbox-button-true");
        } else {
          checkbox.classList.remove("checkbox-button-true");
        }
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
    padding: 12px;
    padding-left: 18px;
    padding-right: 18px;
    border: solid 1px $color-info-tint;
    border-radius: 4px;
    &.checkbox-button-true {
      border: solid 1px $color-primary-tint !important;
      background-color: $color-primary-tint !important;
    }
  }

  &.checkbox-indeterminate {
    input ~ label {
      color: $color-primary;
    }
    input ~ span {
      background: $color-primary;
      border: 1px solid $color-primary;
    }
    .checkmark:after {
      content: "";
      position: absolute;
      display: block;
      opacity: 1;
      transition: all 0.2s ease-in-out;
    }
    span:after {
      left: 5px;
      top: 0px;
      width: 6px;
      height: 12px;
      border: solid white;
      border-width: 0 2px 0px 0;
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
}

.no-drag {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
