<template>
  <div id="appInput">
    <slot name="prefix"></slot>
    <input
      mode="ios"
      ref="test"
      :type="isShowPassword ? 'password' : type"
      :placeholder="placeholder"
      :value="value"
      class="input-outline"
      :class="{
        'input-icon-right': clearable || showPassword,
        'input-icon-left': false,
      }"
      :autofocus="autofocus"
      :disabled="disabled"
      @input="(e) => changeValue(e)"
      @blur="clearable ? toggleClearButton(false) : ''"
      @focus="clearable ? toggleClearButton(true) : ''"
    />
    <div
      v-if="clearable || showPassword"
      class="right-icon"
      :class="{ clickable: clearable || showPassword }"
      @click="
        clearable ? clearInput() : showPassword ? changeShowPassword() : ''
      "
    >
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
    <slot name="suffix"></slot>
  </div>
</template>
<script>
export default {
  name: "appInput",
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
  },
  data() {
    return {
      changedValue: this.value,
      test: null,
      isClearable: false,
      isShowPassword: this.showPassword,
    };
  },
  computed: {},
  methods: {
    clearInput: function (val) {
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
  input {
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
