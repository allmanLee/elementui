<template>
  <div id="app-input">
    <input id="checkbox" type="checkbox" />
    <label for="checkbox"><slot></slot></label>
  </div>
</template>
<script>
export default {
  name: "AppCheckbox",
};
</script>
<style lang="scss" scoped>
#app-input {
  input:checked + label {
    color: $color-primary;
  }
}
</style>