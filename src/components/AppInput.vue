<template>
  <div
    class="appInput"
    :class="{
      'input-group-container': showExtendPrepend || showExtendAppend,
      'extend-group--prepend': showExtendPrepend,
      'extend-group--append': showExtendAppend,
    }"
  >
    <div
      v-if="showExtendPrepend"
      class="extend-container extend-prepend inner-tag-no"
      :class="`extend-size-${size}`"
    >
      <slot name="prepend"></slot>
    </div>
    <input
      v-if="type != 'textarea'"
      ref="test"
      :max="max"
      :min="min"
      :step="step"
      :name="name"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :tabindex="tabindex"
      :form="form"
      :label="label"
      :type="isShowPassword ? 'password' : type"
      :placeholder="placeholder"
      :value="value"
      class="input-outline"
      :class="{
        'input-icon-right': suffixIcon || clearable || showPassword,
        'input-icon-left': prefixIcon,
        ...slotDirection,
        [cssNameSize]: size ? true : false,
        [`input-resize-${resize}`]: resize ? true : false,
      }"
      :autofocus="autofocus"
      :disabled="disabled"
      @input="changeValue($event)"
      @blur="handleBlur($event), clearable ? toggleClearButton(false) : ''"
      @focus="clearable ? toggleClearButton(true) : '', handleFocus($event)"
      @mouseover="canChange ? (isClearable = true) : ''"
      @mouseleave="canChange ? (isClearable = false) : ''"
    />
    <textarea
      v-if="type == 'textarea'"
      ref="appInputTextarea"
      :type="isShowPassword ? 'password' : type"
      :rows="rows"
      :name="name"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :form="form"
      :label="label"
      :placeholder="placeholder"
      :value="value"
      class="input-outline"
      :class="`input-resize-${resize}`"
      :autofocus="autofocus"
      :disabled="disabled"
      @input="(e) => changeTextareaValue(e)"
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

    <!-- SHOW WORD LITMIT VIEW -->
    <div
      v-if="showWordLimit"
      class="wordlimit-container"
      :class="
        type
          ? type === 'text' || type === 'textarea'
            ? `is-${type}`
            : ''
          : 'is-text'
      "
    ></div>
    <div
      v-if="showExtendAppend"
      class="extend-container extend-append inner-tag-no"
    >
      <slot name="append"></slot>
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
    maxlength: {
      type: Number,
    },
    minlength: {
      type: Number,
    },
    tabindex: {
      type: String,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    size: {
      validator: (value) => ["medium", "mini", "small"].indexOf(value) != -1,
    },
    resize: {
      validator: (value) =>
        ["vertical", "horizontal", "both", "none"].indexOf(value) != -1,
    },

    name: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
    max: { default: "" },
    min: { default: "" },
    step: { default: "" },
    form: { defalut: "" },
    label: { defalut: "" },
  },
  data() {
    return {
      changedValue: this.value,
      test: null,
      isClearable: false,
      isShowPassword: this.showPassword,
      canChange: false,
      slotDirection: "",
      showExtendAppend: "",
      showExtendPrepend: "",
      countValue: 0,
    };
  },
  computed: {
    cssNameSize: function () {
      let propSize = this.size;
      return `input-size-${propSize}`;
    },
  },
  mounted() {
    this.canChange = this.clearable && this.changedValue.length > 0;
    const slotsName = Object.keys(this.$slots);

    //슬롯으로 아이콘을 받았을 경우
    if (slotsName.includes("prefix")) {
      this.slotDirection = { ...this.slotDirection, "input-icon-left": true };
    }
    if (slotsName.includes("suffix")) {
      this.slotDirection = { ...this.slotDirection, "input-icon-right": true };
    }
    if (slotsName.includes("append")) {
      this.showExtendAppend = true;
    }
    if (slotsName.includes("prepend")) {
      this.showExtendPrepend = true;
    }
  },
  watch: {
    changedValue: function (val) {
      this.canChange = this.clearable && this.changedValue.length > 0;
      this.countValue = val.length;
      console.log(this.countValue);
    },
  },
  methods: {
    handleBlur: function (e) {
      this.$emit("blur", e);
      console.log("자식 blur");
    },
    handleFocus: function (e) {
      this.$emit("focus", e);
      console.log("자식 focus");
    },
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

    //textarea에서 인풋 이벤트발생 실행 함수
    changeTextareaValue(e) {
      this.changeValue(e);
      this.mixin_auto_resize(e);
    },

    //clear 버튼 보이게 & 안보이게
    toggleClearButton(value) {
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
.appInput {
  position: relative;
  width: auto;
  display: inline-block;
  height: rem-calc(40px);
  line-height: 100%;
  input,
  textarea {
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    box-sizing: border-box;
    border-radius: 4px;
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

    //size
    &.input-size-medium {
      @include input-size-style(14px, 12px, 12px);
      height: 38px;
    }
    &.input-size-small {
      @include input-size-style(12px, 8px, 8px);
      height: 36px;
    }
    &.input-size-mini {
      @include input-size-style(12px, 8px, 8px);
      height: 30px;
    }

    //resize
    &.input-resize-none {
      resize: none;
    }
    &.input-resize-both {
      resize: both;
    }

    &.input-resize-horizontal {
      resize: horizontal;
    }
    &.input-resize-vertical {
      resize: vertical;
    }
  }
  input {
    height: 40px;
  }
  textarea {
    font-size: rem-calc(16px) !important;
    min-height: 42px;
    resize: vertical;
    padding: {
      top: 12px;
      bottom: 12px;
    }
    font: inherit;
    cursor: text;
    transition: opacity 0.3s, background-color 0.3s, border 0.3s,
      color 0.3s ease-in-out;
  }
  .icon {
    font-size: 16px;
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

  //word limit 스타일
  .wordlimit-container {
    pointer-events: none;
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    font-size: 12px;
    color: #9e9e9e;
    right: 8px;
    top: 50%;
    &.is-text {
      display: inline-block;
      transform: translateY(-50%);
      vertical-align: center;
    }
    &.is-textarea {
      top: unset;
      bottom: 4px;

      display: inline-block;
      vertical-align: bottom;
    }
    & p {
      pointer-events: none;
    }
  }
  &.input-group-container {
    display: inline-table;
    &.extend-group--append {
      input {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }
    &.extend-group--prepend {
      input {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
    }
  }
  //확장슬롯
  .extend-container {
    position: relative;
    display: table-cell;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    background-color: white;
    color: #9e9e9e;
    margin-right: -1px;
    margin-left: -1px;
    width: 1px;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    vertical-align: middle;
    white-space: nowrap;
    button {
      display: inline-block;
      all: unset;
      padding-left: 16px;
      padding-right: 16px;
      height: 100%;
      margin: -16px -20px;
      &:hover {
        border: 0px;
        color: unset;
        background: unset;
      }
    }
    input {
      display: inline-block;
      box-sizing: border-box;
      height: 40px;
      color: unset;
      padding: 0px;
      padding-left: 0px;
      padding-right: 0px;
      background: unset;
      border: 0px;
      &:hover {
        border: 0px;
        color: black;
        background: unset;
      }
      &:focus {
        color: black;
      }
    }
    &.extend-prepend {
      border-right: 0px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    &.extend-append {
      border-left: 0px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  .inner-tag-no {
    background: #f2f2f2;
  }
}
</style>
