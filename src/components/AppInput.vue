<template>
  <input
    mode="ios"
    ref="test"
    :type="type"
    :placeholder="placeholder"
    class="input-outline"
    :value="valueText"
    :autofocus="autofocus"
  />
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
    },
    propType: {
      default: "text",
      type: String,
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
    value: {
      defalt: "",
      type: String,
    },
  },
  data() {
    return {
      test: null,
    };
  },
  computed: {
    valueText: function () {
      return this.propValue;
    },
    type: function () {
      return this.propType;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scope>
//기본 인풋 스타일
input {
  box-sizing: border-box;
  border-radius: 4px !important;
  height: rem-calc(40px);
  border: 1px solid #dbdbdb;
  padding-left: 16px;
  padding-right: 16px;
  background-color: white !important;
  color: black;

  &:focus {
    outline: none;
    border: 1px solid $color-primary !important;
    color: black;
  }
}

input::placeholder {
  color: #9e9e9e;
}
</style>
