<template>
  <div
    ref="appCheckbox"
    class="app-checkbox"
    :class="`${cssNameDisabled} ${cssNameBorder} ${cssNameSize}`"
    @click="checkboxClick"
  >
    <input
      ref="appCheckboxInput"
      type="checkbox"
      id="checkbox"
      :checked="custom"
      :value="`${label | value}`"
      @change="checkboxClick"
    />
    <span class="checkmark"></span>
    <label for="checkbox" class="no-drag">
      <span>{{ atLabel }}</span>
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "AppCheckbox",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: { type: String },
    modelValue: {
      default: "",
    },
    border: { type: Boolean, default: false },
    size: {
      validator: (value) => ["medium", "mini", "small"].indexOf(value) !== -1,
    },
    trueValue: { default: true },
    disabled: { default: false },
    label: { default: "" },
    trueLabel: { type: String },
    falseLabel: { type: String },
  },
  watch: {
    modelValue: {
      deep: true,
      handler(val) {
        this.custom = val;
        console.log("appcheckbox: test");
        this.classModifyBorder();
      },
    },
  },
  mounted() {
    this.classModifyBorder();
    if (!this.$parent.modelValue) {
      this.custom = this.modelValue;
    } else {
      setTimeout(() => (this.custom = this.$refs.appCheckboxInput.checked), 0);
    }
  },
  data() {
    return {
      custom: false,
    };
  },
  computed: {
    cssNameDisabled: function () {
      if (this.disabled === true) return "checkbox-disabled";
      else return "";
    },
    cssNameSize: function () {
      let propSize = this.size;
      return `button-size-${propSize}`;
    },
    cssNameBorder: function () {
      if (this.border === true) return "checkbox-border";
      else return "";
    },
    atLabel: function () {
      if (this.label) return this.label;
      if (this.trueLabel || this.falseLabel) {
        return this.modelValue ? this.trueLabel : this.falseLabel;
      } else return undefined;
    },
    isChecked() {
      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    classModifyBorder() {
      const checkbox = this.$refs.appCheckbox;
      if (checkbox.classList.contains("checkbox-border")) {
        if (this.isChecked === true) {
          checkbox.classList.add("checkbox-border-true");
        } else {
          checkbox.classList.remove("checkbox-border-true");
        }
      }
    },
    checkboxClick() {
      setTimeout(() => {
        this.custom = !this.custom;
        this.$emit("change", this.custom);
      }, 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-checkbox {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  padding-left: 38px;
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

  .checkmark {
    pointer-events: none;
    position: absolute;
    box-sizing: border-box;
    left: 12px;
    height: 21px;
    width: 21px;
    border-radius: 2px;
    background-color: #eee;
    border: 1px solid #ccc;
  }

  label {
    pointer-events: none;
    cursor: pointer;
    font-weight: 500;
    line-height: 21px;
    vertical-align: middle;
  }

  input:checked ~ label {
    color: $color-primary;
  }
  input:checked ~ span {
    background: $color-primary;
    border: 1px solid $color-primary;
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: block;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }

  /* Show the checkmark when checked */
  input:checked ~ span:after {
    opacity: 1;
  }
  /* Style the checkmark/indicator */
  span:after {
    left: 6px;
    top: 0px;
    width: 4px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  //checkbox Disabled
  &.checkbox-disabled {
    pointer-events: none;
    opacity: 0.6;
    filter: grayscale(100);
  }
  &.checkbox-border {
    padding: 12px;
    padding-left: 38px;
    border: solid 1px $color-info-tint;
    border-radius: 4px;
    &.checkbox-border-true {
      border: solid 1px $color-primary !important;
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