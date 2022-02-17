<template>
  <div id="appInput">
    <input
      v-if="type != 'textarea'"
      ref="test"
      :type="isShowPassword ? 'password' : type"
      :placeholder="placeholder"
      :value="value"
      class="input-outline"
      :class="{
        'input-icon-right': suffixIcon || clearable || showPassword,
        'input-icon-left': prefixIcon,
        ...slotDirection,
      }"
      :autofocus="autofocus"
      :disabled="disabled"
      @input="(e) => changeValue(e)"
      @blur="clearable ? toggleClearButton(false) : ''"
      @focus="clearable ? toggleClearButton(true) : ''"
      @mouseover="canChange ? (isClearable = true) : ''"
      @mouseleave="canChange ? (isClearable = false) : ''"
    />
    <textarea
      v-if="type == 'textarea'"
      ref="appInputTextarea"
      :type="isShowPassword ? 'password' : type"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      class="input-outline"
      :autofocus="autofocus"
      :disabled="disabled"
      @input="((e) => changeValue(e), mixin_auto_resize)"
    />
    <div
      v-if="clearable || showPassword"
      class="right-icon"
      :class="{ clickable: clearable || showPassword }"
      @click="
        clearable ? clearInput() : showPassword ? changeShowPassword() : ''
      "
      @mouseover="canChange ? (isClearable = true) : ''"
      @mouseleave="canChange ? (isClearable = false) : ''"
    >
      <!-- clear 기능, showPassword 기능의 아이콘 -->
      <fa-icon
        v-show="isClearable"
        class="icon"
        icon="fa-regular fa-circle-xmark"
      ></fa-icon>
      <fa-icon
        v-show="showPassword"
        class="icon"
        icon="fa-regular fa-eye"
      ></fa-icon>
    </div>
    <div
      :class="{ 'left-icon': prefixIcon, 'right-icon': suffixIcon }"
      v-if="prefixIcon || suffixIcon"
    >
      <fa-icon class="icon" :icon="prefixIcon || suffixIcon"></fa-icon>
    </div>

    <!-- 슬롯으로 추가한 아이콘 -->
    <div v-if="slotDirection !== ''" class="left-icon">
      <i class="icon">
        <slot name="prefix"></slot>
      </i>
    </div>
    <div v-if="slotDirection !== ''" class="right-icon">
      <i class="icon">
        <slot class="icon" name="suffix"></slot>
      </i>
    </div>
  </div>
</template>
<script>
import mixinResize from "../mixins/autoResize.js";
export default {
  name: "appInput",
  mixins: [mixinResize],
  model: {
    props: "modelValue",
    method: "input",
  },
  props: {
    placeholder: {
      type: String,
    },
    type: {
      default: "text",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
    value: {
      default: "",
      type: String,
    },
    clearable: {
      default: false,
      type: Boolean,
    },
    showPassword: {
      default: false,
      type: Boolean,
    },
    prefixIcon: {
      type: String,
    },
    suffixIcon: {
      type: String,
    },
    rows: {
      type: Number,
    },
    autosize: {
      type: [Boolean, Object],
    },
  },
  data() {
    return {
      changedValue: this.value,
      test: null,
      isClearable: false,
      isShowPassword: this.showPassword,
      canChange: false,
      slotDirection: "",
    };
  },
  mounted() {
    this.canChange = this.clearable && this.changedValue.length > 0;
    console.log(this.$slots);
    const slotsName = Object.keys(this.$slots);

    //슬롯으로 아이콘을 받았을 경우
    if (slotsName.includes("prefix")) {
      this.slotDirection = { ...this.slotDirection, "input-icon-left": true };
    }
    if (slotsName.includes("suffix")) {
      this.slotDirection = { ...this.slotDirection, "input-icon-right": true };
    }
  },
  watch: {
    changedValue: function () {
      this.canChange = this.clearable && this.changedValue.length > 0;
    },
  },
  methods: {
    clearInput: function () {
      this.changedValue = "";
      this.$emit("input", this.changedValue);
    },
    changeValue: function (e) {
      const value = e.target.value;
      this.changedValue = value;
      this.$emit("input", this.changedValue);

      //clear icon
      if (this.clearable) {
        if (value.length > 0) this.isClearable = true;
        else this.isClearable = false;
      }
    },
    toggleClearButton(value) {
      console.log("toggled");
      console.log(value);
      console.log(this.changedValue);
      if (value == true && this.changedValue.length > 0) {
        this.isClearable = true;
      } else this.isClearable = false;
    },
    //패스워드 보기 기능
    changeShowPassword() {
      this.isShowPassword = !this.isShowPassword;
      this.$refs.test.focus();
    },
  },
};
</script>

<style lang="scss" scope>
//기본 인풋 스타일
#appInput {
  position: relative;
  width: auto;
  display: inline-block;
  input,
  textarea {
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 4px;
    height: rem-calc(40px);
    border: 1px solid #dbdbdb;
    padding-left: 16px;
    padding-right: 16px;
    background-color: white;
    color: black;
    &::placeholder {
      color: #aeaeae;
    }
    &:focus {
      outline: none;
      border: 1px solid $color-primary;
      color: black;
      &:hover {
        border: 1px solid $color-primary;
      }
    }
    &:hover {
      outline: none;
      border: 1px solid #9e9e9e;
      color: black;
    }
    &:disabled {
      background-color: #f5f5f5;
    }
    transition: all 0.3s ease-in-out;
  }
  textarea {
    //height: unset;
    min-height: 50px;
    padding: {
      top: 12px;
      bottom: 12px;
    }
    font: inherit;
    cursor: text;
  }

  //clear able
  .right-icon,
  .left-icon {
    display: inline-block;
    position: absolute;
    width: 40px;
    height: 100%;
    line-height: 100%;
    right: 0px;

    &.clickable {
      cursor: pointer;
      pointer-events: all;
    }
    .icon {
      position: relative;
      display: block;
      opacity: 1;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #aeaeae;
    }
  }

  .left-icon {
    right: unset;
    left: 0px;
  }
  //아이콘 존재에 따른 패딩
  & input.input-icon-right {
    padding-right: 40px;
  }
  & input.input-icon-left {
    padding-left: 40px;
  }
}
</style>
