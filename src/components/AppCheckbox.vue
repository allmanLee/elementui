<template>
  <div
    class="app-checkbox"
    :class="`${cssNameDisabled}`"
    @click.prevent="checkboxClick($event)"
  >
    <input type="checkbox" id="checkbox" :checked="isChecked" :value="label" />
    <span class="checkmark"></span>
    <label for="checkbox" class="no-drag">
      <span v-if="label !== ''">{{ label }}</span>
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
    value: { type: String, default: "false" },
    modelValue: { default: "" },
    trueValue: { default: true },
    falseValue: { default: false },
    disabled: { default: false },
    label: { type: String, default: "" },
  },
  data() {
    return {
      isChecked: this.modelValue,
    };
  },
  computed: {
    cssNameDisabled: function () {
      if (this.disabled == true) return "checkbox-disabled";
      else return "";
    },
  },
  methods: {
    checkboxClick() {
      if (this.modelValue !== "") {
        this.isChecked = this.modelValue;
      }
      this.isChecked = !this.isChecked;
      this.$emit("change", this.isChecked ? this.trueValue : this.falseValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-checkbox {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  padding-left: 26px;
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
    top: 0;
    left: 0;
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
}

.no-drag {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>