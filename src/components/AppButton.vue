<template>
  <button
    :type="nativeType"
    :disabled="Disabled"
    :class="`app-button ${cssNameSize} ${cssNameType} ${cssNamePlain} ${cssNameRound} ${cssNameCircle}`"
  >
    <span :class="`${cssIsIcon}`">
      <fa-icon v-if="icon" :icon="icon"></fa-icon>
    </span>
    <div v-if="loading" class="loader">Loading...</div>
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "AppButton",
  props: {
    size: {
      validator: (value) => ["medium", "small", "mini"].indexOf(value) !== -1,
    },
    type: {
      validator: (value) =>
        [
          "primary",
          "success",
          "warning",
          "danger",
          "info",
          "text",
          "default",
        ].indexOf(value) !== -1,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    Disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    nativeType: {
      validator: (value) => ["button", "submit", "reset"].indexOf(value) !== -1,
      default: "button",
    },
  },
  computed: {
    cssNameSize: function () {
      let propSize = this.size;
      return `button-size-${propSize}`;
    },
    cssNameType: function () {
      let propType = this.type;
      return `button-type-${propType}`;
    },
    cssNamePlain: function () {
      let propPlain = this.plain;
      if (propPlain == true) {
        return "button-plain";
      } else {
        return ``;
      }
    },
    cssNameRound: function () {
      let propRound = this.round;
      if (propRound == true) {
        return "button-round";
      } else {
        return ``;
      }
    },
    cssNameCircle: function () {
      let propCircle = this.circle;
      if (propCircle == true) {
        return "button-circle";
      } else {
        return ``;
      }
    },
    cssIsIcon: function () {
      if (this.icon == undefined || this.icon == false) {
        return ``;
      } else {
        return "is-icon";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  box-sizing: border-box;
  color: white;
  opacity: 1;
  background: rgb(45, 129, 255);
  border: none;
  font-size: rem-calc(16px);
  font-weight: 600;
  border-radius: 6px;
  padding: {
    top: rem-calc(14px);
    bottom: rem-calc(14px);
    left: rem-calc(18px);
    right: rem-calc(18px);
  }
  span,
  div {
    pointer-events: none;
  }
  &:disabled {
    opacity: 0.6;
  }
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 1;
    filter: grayscale(0.2);
    transition: all 0.02s ease-in-out;
  }
  &.button-size-medium {
    font-size: rem-calc(16px);
    padding: {
      top: rem-calc(12px);
      bottom: rem-calc(12px);
      left: rem-calc(18px);
      right: rem-calc(18px);
    }
  }
  &.button-size-small {
    font-size: rem-calc(14px);
    padding: {
      top: rem-calc(8px);
      bottom: rem-calc(8px);
      left: rem-calc(16px);
      right: rem-calc(16px);
    }
  }
  &.button-size-mini {
    font-size: rem-calc(14px);
    padding: {
      top: rem-calc(6px);
      bottom: rem-calc(6px);
      left: rem-calc(16px);
      right: rem-calc(16px);
    }
  }
  &.button-type-primary {
    background: $color-primary;
    border: 1px solid $color-primary;
    &.button-plain {
      background: $color-primary-background;
      color: $color-primary;
      &:hover {
        opacity: 1;
        background-color: $color-primary;
        color: white;
      }
      &:active {
        opacity: 1;
        filter: grayscale(0.2);
        transition: all 0.02s ease-in-out;
      }
    }
  }
  &.button-type-success {
    background: $color-success;
    border: 1px solid $color-success;
    &.button-plain {
      background: $color-success-background;
      color: $color-success;
      &:hover {
        opacity: 1;
        background-color: $color-success;
        color: white;
      }
      &:active {
        opacity: 1;
        filter: grayscale(0.2);
        transition: all 0.03s ease-in-out;
      }
    }
  }
  &.button-type-warning {
    background: $color-warning;
    border: 1px solid $color-warning;
    &.button-plain {
      background: $color-warning-background;
      color: $color-warning;
      &:hover {
        opacity: 1;
        background-color: $color-warning;
        color: white;
      }
      &:active {
        opacity: 1;
        filter: grayscale(0.2);
        transition: all 0.08s ease-in-out;
      }
    }
  }
  &.button-type-danger {
    background: $color-danger;
    border: 1px solid $color-danger;
    &.button-plain {
      background: $color-danger-background;
      color: $color-danger;
      &:hover {
        opacity: 1;
        background-color: $color-danger;
        color: white;
      }
      &:active {
        opacity: 1;
        filter: grayscale(0.2);
        transition: all 0.08s ease-in-out;
      }
    }
  }
  &.button-type-info {
    background: #909399;
    border: 1px solid $color-info;
    &.button-plain {
      background: $color-info-background;
      color: $color-info;
      &:hover {
        opacity: 1;
        background-color: $color-info;
        color: white;
      }
      &:active {
        opacity: 1;
        filter: grayscale(0.2);
        transition: all 0.08s ease-in-out;
      }
    }
  }
  &.button-type-text {
    &:disabled {
      filter: grayscale(100%);
    }
    background: none;
    border: none;
    color: $color-primary;
    &.button-plain {
      background: $color-info-background;
      color: $color-primary;
      &:hover {
        opacity: 1;
        background-color: $color-info;
        color: white;
      }
      &:active {
        opacity: 1;
        filter: grayscale(0.2);
        transition: all 0.08s ease-in-out;
      }
    }
  }
  &.button-type-default {
    background: none;
    color: #909399;
    border: 1px solid #909399;
    &:hover {
      opacity: 1;
      background-color: $color-primary-background;
      border: 1px solid $color-primary-tint;
      color: $color-primary;
    }
    &:active {
      opacity: 1;
      background: $color-primary-background;
      border: 1px solid $color-primary-dark;
      color: $color-primary-dark;
      transition: all 0.02s ease-in-out;
    }
    &:disabled {
      pointer-events: none;
    }
    &.button-plain {
      background: $color-info-background;
      color: $color-info;
      &:hover {
        opacity: 1;
        background-color: white;
        border: 1px solid $color-primary;
        color: $color-primary;
      }
      &:active {
        opacity: 1;
        background: white;
        color: $color-primary-dark;
        transition: all 0.08s ease-in-out;
      }
    }
  }
  &.button-round {
    border-radius: 1000px;
  }
  &.button-circle {
    width: 40px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    padding: 0px;
    border-radius: 1000px;
  }
}

.is-icon {
  padding-left: 4px;
  padding-right: 4px;
}

//스피터 동작
.loader {
  display: inline-block;
  font-size: 2px;
  width: 3px;
  height: 3px;
  line-height: 6px;
  margin-right: 12px;
  margin-left: 4px;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #ffffff,
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.5),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7),
      1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff,
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff,
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.5),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff,
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff,
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.5),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff,
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #ffffff,
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.5),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7),
      1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff,
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff,
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.5),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff,
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff,
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.5),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff,
      -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
      1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
      2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
      1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
      0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
      -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5),
      -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;
  }
}
</style>
